import type { Metadata } from 'next';
import { Silkscreen } from 'next/font/google';
import './globals.css';

const pixel = Silkscreen({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-pixel' });

export const metadata: Metadata = {
  metadataBase: new URL("https://krillionendless.org"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={pixel.variable}>
      <body>
        {children}
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6859136145612852" crossOrigin="anonymous" />
        {/* End Google AdSense */}
        {/* Cloudflare Web Analytics */}
        <script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "bb5a447a5758476ab83956b285593c89"}' />
        {/* End Cloudflare Web Analytics */}
      </body>
    </html>
  );
}
