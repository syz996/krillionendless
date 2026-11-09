'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="content-section">
      <h2>Something went wrong</h2>
      <p>This part of the page failed to load. Please try again.</p>
      <p><button type="button" className="btn ghost" onClick={() => reset()}>Try again</button></p>
    </section>
  );
}
