import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Amazon Store Data Analyzer',
  description: 'Analyze Amazon store CSV data with diagnosis and 7-day action plan.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}
