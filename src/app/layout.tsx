import './globals.css';
import { Holtwood_One_SC } from 'next/font/google';
import { Hammersmith_One } from 'next/font/google';
import { Providers } from './providers';
import Head from 'next/head';

const holtwood = Holtwood_One_SC({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap'
});

const hammersmith = Hammersmith_One({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap'
});

export const metadata = {
  title: 'DERMACURE.AI',
  description: 'Made by team SIX-BYTE'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      </Head>
      <body className={hammersmith.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
