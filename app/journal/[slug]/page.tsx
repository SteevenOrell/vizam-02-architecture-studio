import type { Metadata } from 'next';
import { Fragment } from 'react';
import { DRAWINGS } from '@/components/drawings/by-name';
import { PostCover } from '@/components/journal/PostCover';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { PostCard } from '@/components/journal/PostCard';
import { formatDate, getPost, posts } from '@/content/journal';

function PostFigure({ figure }: { figure: NonNullable<(typeof posts)[number]['figure']> }) {
  const Drawing = DRAWINGS[figure.name];
  return (
    <figure className="!my-10 lg:-mr-24">
      <div className="aspect-[16/10] overflow-hidden border border-hairline bg-paper">
        <Drawing className="size-full" title={figure.title} />
      </div>
      <figcaption className="meta mt-3 text-stone">{figure.caption}</figcaption>
    </figure>
  );
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/journal/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Entry not found' };
  return { title: post.title, description: post.excerpt, openGraph: { type: 'article', images: [{ url: post.cover.src.src, alt: post.cover.alt }] } };
}

export default async function PostPage({ params }: PageProps<'/journal/[slug]'>) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="pb-24">
      <header className="page-x pt-36 md:pt-44">
        <Link href="/journal" className="meta inline-flex items-center gap-2 text-stone hover:text-graphite">
          <ArrowLeft aria-hidden className="size-3.5" /> Journal
        </Link>
        <p className="meta mt-10 text-stone">
          {post.category} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} min read
        </p>
        <h1 className="display-lg mt-4 max-w-[16ch]">{post.title}</h1>
        <p className="statement mt-8 max-w-[34ch] !text-[clamp(1.4rem,2.4vw,2.2rem)] text-graphite/85">{post.excerpt}</p>
      </header>

      <div className="page-x mt-16">
        <div className="relative mx-auto max-w-[1040px] aspect-[16/9] overflow-hidden bg-hairline">
          <PostCover post={post} priority sizes="(min-width: 1100px) 1040px, 100vw" />
        </div>
      </div>

      <div className="page-x mt-16 grid lg:grid-cols-12">
        <div className="body-copy space-y-6 lg:col-span-7 lg:col-start-4">
          {post.body.map((b, i) => (
            <Fragment key={i}>
              {b.type === 'h2' ? (
                <h2 className="pt-6 text-[1.75rem] font-medium tracking-tight">{b.text}</h2>
              ) : b.type === 'quote' ? (
                <blockquote className="statement border-l-2 border-oxide pl-6 !text-[clamp(1.5rem,2.6vw,2.4rem)]">{b.text}</blockquote>
              ) : (
                <p className="text-graphite/90">{b.text}</p>
              )}
              {post.figure && post.figure.after === i ? <PostFigure figure={post.figure} /> : null}
            </Fragment>
          ))}
          <p className="meta border-t border-hairline pt-6 text-stone">Fictional journal entry — VIZAM concept project</p>
        </div>
      </div>

      <section aria-labelledby="more-title" className="page-x mt-24 border-t border-hairline pt-12">
        <h2 id="more-title" className="meta text-stone">More from the journal</h2>
        <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (<li key={p.slug}><PostCard post={p} /></li>))}
        </ul>
      </section>
    </article>
  );
}
