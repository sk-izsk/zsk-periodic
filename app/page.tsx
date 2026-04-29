import Nav from '@/components/Nav';
import ElementModal from '@/components/modal/ElementModal';
import PeriodicTable from '@/components/table/PeriodicTable';

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Nav />
      <main className="flex-1 overflow-auto">
        <PeriodicTable />
      </main>
      <ElementModal />
    </div>
  );
}
