import { ArrowLink } from '@/components/ui/bits';

export default function NotFound() {
  return (
    <section className="page-x flex min-h-[80svh] flex-col justify-end pb-24 pt-40">
      <p className="meta text-stone">(404) Not on the drawings</p>
      <h1 className="display-xl mt-6 max-w-[12ch]">This room was never built.</h1>
      <p className="mt-8 max-w-[40ch] text-stone">The page you are looking for does not exist or has moved.</p>
      <div className="mt-10 flex flex-wrap gap-8">
        <ArrowLink href="/">Back to the index</ArrowLink>
        <ArrowLink href="/projects">Browse projects</ArrowLink>
      </div>
    </section>
  );
}
