'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="page-x flex min-h-[80svh] flex-col justify-end pb-24 pt-40" role="alert">
      <p className="meta text-stone">(Error) Something gave way</p>
      <h1 className="display-lg mt-6 max-w-[14ch]">This page did not load.</h1>
      <p className="mt-6 max-w-[40ch] text-stone">Please try again. If it keeps happening, the problem is on our side.</p>
      <button type="button" onClick={reset} className="mt-10 w-fit bg-graphite px-6 py-3 text-paper hover:bg-oxide">
        Try again
      </button>
    </section>
  );
}
