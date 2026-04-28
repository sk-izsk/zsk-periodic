import Nav from '@/components/Nav';
import PeriodicTable from '@/components/table/PeriodicTable';

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Nav />
      <main className="flex-1 overflow-auto">
        <PeriodicTable />
      </main>
    </div>
  );
}
