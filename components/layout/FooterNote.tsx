import { BinderClip } from '@/components/ui/BinderClip';
import { site } from '@/content/studio';

/** Static contact details: no fields, submission, storage or pretend interaction. */
export function FooterNote({ year }: { year: number }) {
  return (
    <section aria-labelledby="footer-contact-title" className="paper relative mx-auto max-w-md rotate-[-1.5deg] px-7 pt-12 pb-6 text-graphite md:mx-0 md:ml-auto">
      <BinderClip className="absolute -top-7 left-8 h-14 w-12 text-graphite" />
      <div className="meta flex items-baseline justify-between text-stone">
        <p>A conversation starts here</p><p>No. 02</p>
      </div>
      <h2 id="footer-contact-title" className="display-md mt-6">Contact us</h2>
      <p className="mt-5 font-serif text-[1.4rem] italic leading-snug">
        A site, a room, an idea. Every project begins with a few words.
      </p>
      <div className="mt-7 border-y border-hairline py-5">
        <p className="meta text-stone">Email</p>
        <p className="mt-2 break-all text-lg">{site.email}</p>
        <p className="meta mt-5 text-stone">Find the studio</p>
        <p className="mt-2">Lisbon · Copenhagen</p>
        <p className="mt-2 text-sm text-stone">Monday–Friday, 09:00–18:00<br />Visits by appointment</p>
      </div>
      <p className="mt-5 font-serif text-sm italic leading-relaxed text-stone">
        Ostrel Atelier is a fictional studio — a VIZAM concept project. Contact details are illustrative;
        this card does not send or collect messages. Imagery includes stock and AI-generated concepts.
      </p>
      <div className="meta mt-5 flex justify-between border-t border-hairline pt-3 text-stone">
        <span>OA / VZM</span><span>Let’s talk</span><span>{year}</span>
      </div>
    </section>
  );
}
