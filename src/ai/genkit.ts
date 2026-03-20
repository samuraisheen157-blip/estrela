
import { config } from 'dotenv';
config();

import { genkit, modelRef } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { openAICompatible } from '@genkit-ai/compat-oai';

// Ler variáveis de ambiente
const motorGenerativo = process.env.MOTOR_GENARATIVO?.trim().toLowerCase();
const googleModelName = process.env.GOOGLE_MODEL_NAME?.trim();
const groqModelName = process.env.GROQ_MODEL_NAME?.trim();
const groqApiBaseUrl = process.env.GROQ_API_BASE_URL?.trim();
const deprecatedGroqModelMap: Record<string, string> = {
  'llama3-8b-8192': 'llama-3.1-8b-instant',
};

let defaultModel: any | undefined;
const genkitPlugins = [];

console.log(`--- Genkit Configuration ---`);
console.log(`MOTOR_GENARATIVO: ${motorGenerativo}`);
console.log(`GOOGLE_MODEL_NAME: ${googleModelName}`);
console.log(`GROQ_MODEL_NAME: ${groqModelName}`);
console.log(`GROQ_API_BASE_URL: ${groqApiBaseUrl}`);

if (motorGenerativo === 'googleai') {
  if (!process.env.GOOGLE_API_KEY) {
    console.error("ERRO: GOOGLE_API_KEY não definida no .env para o motor 'googleai'.");
  } else {
    genkitPlugins.push(googleAI({apiKey: process.env.GOOGLE_API_KEY}));
    defaultModel = googleModelName ? `googleai/${googleModelName}` : 'googleai/gemini-2.0-flash';
    console.log(`Motor Genkit configurado para usar Google AI.`);
    console.log(`Modelo Google AI: ${defaultModel}`);
  }
} else if (motorGenerativo === 'groq') {
  if (!process.env.GROQ_API_KEY) { 
    console.error("ERRO: GROQ_API_KEY não definida no .env para o motor 'groq'.");
  } else if (!groqApiBaseUrl) {
    console.error("ERRO: GROQ_API_BASE_URL não definida no .env para o motor 'groq'.");
  } else {
    genkitPlugins.push(
      openAICompatible({
        name: 'groq',
        apiKey: process.env.GROQ_API_KEY,
        baseURL: groqApiBaseUrl,
      }),
    );

    const resolvedGroqModel = deprecatedGroqModelMap[groqModelName ?? ''] ?? groqModelName ?? 'llama-3.1-8b-instant';
    if (groqModelName && deprecatedGroqModelMap[groqModelName]) {
      console.warn(
        `Aviso: modelo GROQ_MODEL_NAME "${groqModelName}" foi descontinuado. ` +
        `Usando "${resolvedGroqModel}" automaticamente.`
      );
    }

    // O modelRef precisa usar o namespace do plugin (ex: `groq/<modelId>`).
    // Isso evita o erro de "Model not found" do Genkit.
    defaultModel = modelRef({
      name: `groq/${resolvedGroqModel}`,
    });

    console.log(`Motor Genkit configurado para usar Groq (openAICompatible).`);
    console.log(`Modelo Groq: ${resolvedGroqModel}`);
  }
} else {
  console.log(
    `MOTOR_GENARATIVO ("${motorGenerativo}") não especificado ou desconhecido. Configurando Google AI como padrão.`
  );
  if (!process.env.GOOGLE_API_KEY) {
    console.error("ERRO: GOOGLE_API_KEY não definida no .env para o fallback para Google AI.");
  } else {
    genkitPlugins.push(googleAI({apiKey: process.env.GOOGLE_API_KEY}));
    defaultModel = googleModelName ? `googleai/${googleModelName}` : 'googleai/gemini-2.0-flash';
    console.log(`Fallback para Google AI com o modelo: ${defaultModel}`);
  }
}

// Garante que sempre haja ao menos um plugin (GoogleAI como fallback se tudo falhar e tiver API key)
if (genkitPlugins.length === 0) {
  console.warn("AVISO: Nenhum motor de IA pôde ser configurado devido à falta de chaves de API ou configuração inválida.");
  console.warn("O aplicativo pode não funcionar corretamente sem um motor de IA configurado.");
  // Tenta um último fallback para Google AI se a chave existir, caso contrário, defaultModel será undefined.
  if (process.env.GOOGLE_API_KEY) {
     console.log("Tentando fallback final para Google AI se a chave existir...");
     genkitPlugins.push(googleAI({apiKey: process.env.GOOGLE_API_KEY}));
     defaultModel = googleModelName ? `googleai/${googleModelName}` : 'googleai/gemini-2.0-flash';
     console.log(`Fallback final para Google AI com o modelo: ${defaultModel}`);
  } else {
    console.error("ERRO CRÍTICO: Nenhuma chave de API válida encontrada para Google AI como fallback final. A IA não funcionará.");
  }
}
console.log(`--------------------------`);

export const ai = genkit({
  plugins: genkitPlugins,
  // O modelo padrão será definido com base na lógica acima.
  // Se 'defaultModel' for undefined aqui (nenhum plugin configurado com sucesso), 
  // Genkit usará seu próprio fallback interno ou poderá não selecionar um modelo padrão.
  // É importante que 'defaultModel' tenha um valor se um plugin for carregado.
  ...(defaultModel ? { model: defaultModel } : {}),
});
