import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ProjectIndex, ProjectIndexFromUrl } from '@/components/projects/ProjectIndex';
import { PageIntro } from '@/components/ui/bits';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Houses, interiors, hotels, cultural buildings and workplaces by Ostrel Atelier (fictional studio, VIZAM concept).',
};

export default function ProjectsPage() {
  return (
    <div className="pb-32">
      <PageIntro index="01" label="Projects" title="Work, filed by discipline." lead={`${projects.length} fictional projects across five disciplines. Filter the index or explore studies of light, material and time.`} />
      <Suspense fallback={<ProjectIndex projects={projects} />}>
        <ProjectIndexFromUrl projects={projects} />
      </Suspense>
    </div>
  );
}
