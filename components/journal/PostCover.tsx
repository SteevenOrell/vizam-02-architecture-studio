import Image from '@/components/ui/ResponsiveImage';
import { DRAWINGS } from '@/components/drawings/by-name';
import type { JournalPost } from '@/content/types';

/** Fills its (relatively positioned, fixed-ratio) parent with the post's photo, or its drawing when it has one. */
export function PostCover({ post, sizes, priority = false, className = '' }: { post: JournalPost; sizes: string; priority?: boolean; className?: string }) {
  if (post.coverDrawing) {
    const Drawing = DRAWINGS[post.coverDrawing.name];
    return (
      <div className="absolute inset-0 grid place-items-center bg-paper" data-cover-drawing>
        <Drawing className="size-full" title={post.coverDrawing.alt} />
      </div>
    );
  }
  return <Image src={post.cover.src} alt={post.cover.alt} fill priority={priority} sizes={sizes} placeholder="blur" className={`object-cover ${className}`} />;
}
