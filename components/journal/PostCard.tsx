import { PostCover } from './PostCover';
import Link from 'next/link';
import { formatDate } from '@/content/journal';
import type { JournalPost } from '@/content/types';

export function PostCard({ post }: { post: JournalPost }) {
  return (
    <Link href={`/journal/${post.slug}`} className="group flex h-full flex-col" data-testid="post-card">
      <div className="relative aspect-[3/2] overflow-hidden bg-hairline">
        <PostCover post={post} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="grayscale-[35%] transition duration-700 group-hover:grayscale-0" />
      </div>
      <p className="meta mt-4 flex justify-between text-stone">
        <span>{post.category}</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      <h3 className="mt-2 text-[1.375rem] font-medium leading-tight tracking-tight">
        <span className="link-underline">{post.title}</span>
      </h3>
      <p className="mt-2 line-clamp-2 text-stone">{post.excerpt}</p>
    </Link>
  );
}
