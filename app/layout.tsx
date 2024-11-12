import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Turkish Airlines - Book Your Flights',
  description: 'Find and book flights to destinations worldwide with Turkish Airlines',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex min-h-screen pt-16">
            <Sidebar />
            <main className="flex-1 ml-64">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}