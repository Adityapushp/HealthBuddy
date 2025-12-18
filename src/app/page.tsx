import DashboardClient from '@/components/dashboard-client';
import { PageHeader } from '@/components/page-header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <DashboardClient />
      </main>
      <footer className="py-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          MediTrack &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
