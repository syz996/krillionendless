import type { Metadata } from 'next';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'Page Not Found — KrillionEndless',
  description: 'That page does not exist. Head back to the practice dive or browse the dive archive.',
  // robots 不在此声明：框架对 /_not-found 自带 noindex，避免重复 meta。
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <nav className="crumbs"><a href="/">Home</a> › Page not found</nav>

        <h1>Page not found</h1>
        <p className="meta">404</p>

        <p>The page you are looking for does not exist — the dive number may be wrong, or the page has moved.</p>
        <p>Try one of these instead:</p>
        <ul className="archive">
          <li><a href="/">Play the unlimited practice dive</a></li>
          <li><a href="/archive/">Browse the dive archive</a></li>
          <li><a href="/prompts/">Browse the practice prompt library</a></li>
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}