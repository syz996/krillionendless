import type { Metadata } from 'next';
import './globals.css';

// 根布局只留 metadataBase：title/description/robots 由各页面自带，
// 避免 404 页同时渲染框架自带 meta 与布局 meta 造成的重复。
export const metadata: Metadata = {
  metadataBase: new URL("https://krillionendless.org"),
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
