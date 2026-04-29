import IonsPage from '@/app/ions/page';
import HomePage from '@/app/page';
import SettingsPage from '@/app/settings/page';
import ToolsPage from '@/app/tools/page';
import WorksheetPage from '@/app/worksheet/page';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ions" element={<IonsPage />} />
      <Route path="/tools" element={<ToolsPage />} />
      <Route path="/worksheet" element={<WorksheetPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
