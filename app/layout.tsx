import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL("https://krillionendless.org"), 
  title: 'Krillion Unlimited Game — Independent Practice Dive',
  description: 'Play an independent rare-answer trivia practice game with seven prompts, a 25-second timer, and an original starter question bank.',
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Cloudflare Web Analytics */}
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "bb5a447a5758476ab83956b285593c89"}'
        />
        {/* End Cloudflare Web Analytics */}
      </body>
    </html>
  );
}
