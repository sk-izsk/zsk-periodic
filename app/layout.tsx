import AppProviders from '@/components/providers/AppProviders';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zperiod – Interactive Periodic Table',
  description: '118 elements, 3D atom models, chemistry tools, and worksheet generator for Grade 9–12.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
