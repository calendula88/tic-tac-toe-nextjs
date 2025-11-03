import type { Metadata } from 'next';
import './globals.css';  // ← эта строка должна быть!

export const metadata: Metadata = {
  title: 'Крестики-Нолики',
  description: 'Игра в крестики-нолики на Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}