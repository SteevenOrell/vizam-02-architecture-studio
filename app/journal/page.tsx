import type { Metadata } from 'next';
import { PostCard } from '@/components/journal/PostCard';
import { PageIntro } from '@/components/ui/bits';
import { posts } from '@/content/journal';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Essays and notes on stairs, lime, daylight and renovation from the fictional Ostrel Atelier.',
};

export default function JournalPage() {
  return (
    <div className="pb-32">
      <PageIntro index="05" label="Journal" title="Notes from the bench." lead="Short essays on materials, process and the small decisions that shape a room." />
      <ul className="page-x grid gap-x-6 gap-y-14 border-t border-hairline pt-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}><PostCard post={post} /></li>
        ))}
      </ul>
    </div>
  );
}
