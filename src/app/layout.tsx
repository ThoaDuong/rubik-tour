import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Rubik Hub — Công thức & Kỹ thuật',
  description: 'Website học Rubik: Ghi chú công thức OLL/PLL, ký hiệu chiều quay, thư viện đầy đủ 57 OLL + 21 PLL với ảnh minh hoạ 3D.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="bg-bg-primary text-text-primary antialiased selection:bg-accent-blue/30 selection:text-white">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 min-h-screen md:ml-60 bg-bg-primary">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
