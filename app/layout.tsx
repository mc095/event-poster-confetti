import './globals.css';
import { Open_Sans, Press_Start_2P } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' });
const pressStart = Press_Start_2P({ subsets: ['latin'], weight: '400', variable: '--font-press-start' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${pressStart.variable}`}>
      <body>{children}</body>
    </html>
  );
}