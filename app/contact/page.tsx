import type { Metadata } from 'next';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { MetaRows, SectionLabel } from '@/components/ui/bits';
import { site } from '@/content/studio';

export const metadata: Metadata = {
  title: 'Start a project',
  description: 'Send a structured project brief to the fictional Ostrel Atelier. Demo form: validated on the server, never delivered or stored.',
};

export default function ContactPage() {
  return (
    <div className="page-x grid gap-16 pt-36 pb-32 md:pt-44 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <SectionLabel index="06" className="text-stone">Contact</SectionLabel>
        <h1 className="display-lg mt-6 !text-[clamp(2.5rem,4.2vw,4rem)]">Start a conversation.</h1>
        <p className="statement mt-8 !text-[clamp(1.25rem,2vw,1.75rem)] text-graphite/90">
          Whether it is a house, a single room or a building for many, a short brief helps us prepare the first visit.
        </p>
        <MetaRows
          className="mt-12"
          rows={[
            { label: 'Email', value: <a className="link-underline" href={`mailto:${site.email}`}>{site.email}</a> },
            { label: 'Studios', value: site.cities.join(' · ') },
            { label: 'Reply time', value: 'None — demo site' },
          ]}
        />
        <p className="meta mt-6 text-stone">{site.disclaimer}</p>
      </div>
      <div className="lg:col-span-8 lg:col-start-5 lg:pt-6">
        <InquiryForm />
      </div>
    </div>
  );
}
