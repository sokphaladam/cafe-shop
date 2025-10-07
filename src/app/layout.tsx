/* eslint-disable @next/next/no-css-tags */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProvider } from '@/service/AppProvider';
import { LoadFont } from '@/components/LoadFont';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mood',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" />
        <LoadFont />
      </head>
      <body className={`${inter.className} bg-slate-200`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
