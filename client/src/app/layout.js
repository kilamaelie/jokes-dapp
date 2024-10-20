import localFont from 'next/font/local';
import Providers from './providers';
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'Joke Dapp',
  description: 'A fun joke game powered by blockchain',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {children}
        </body>
      </Providers>
    </html>
  );
}
