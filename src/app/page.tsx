
import GuideCanvas from '@/components/GuideCanvas';
import AppSidebar from '@/components/AppSidebar'; 

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen md:h-screen bg-background text-foreground">
      <AppSidebar />
      
      <main className="flex-1 md:p-0 overflow-y-auto flex flex-col" aria-label="Main Content">
        <GuideCanvas className="flex-1" />
      </main>
    </div>
  );
}
