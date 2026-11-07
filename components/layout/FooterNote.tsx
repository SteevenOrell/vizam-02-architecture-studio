'use client';

import { useId, useState } from 'react';
import { Eraser } from 'lucide-react';
import { BinderClip } from '@/components/ui/BinderClip';

const MAX_NOTE = 600;

/**
 * Writable paper note for the footer. Purely local: it has no action, no network call and no storage,
 * so whatever is typed stays in the browser tab and disappears on reload.
 */
export function FooterNote({ year }: { year: number }) {
  const id = useId();
  const [note, setNote] = useState('');
  const [signed, setSigned] = useState('');
  const hasText = note.length > 0 || signed.length > 0;

  return (
    <div className="paper relative mx-auto max-w-md rotate-[-1.5deg] px-7 pt-12 pb-6 text-graphite md:mx-0 md:ml-auto">
      <BinderClip className="absolute -top-7 left-8 h-14 w-12 text-graphite" />
      <div className="flex items-baseline justify-between">
        <p className="meta">A note from the studio</p>
        <p className="meta text-stone">No. 02</p>
      </div>

      <form
        className="mt-4"
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}
        onReset={() => {
          setNote('');
          setSigned('');
        }}
        aria-describedby={`${id}-hint`}
      >
        <label htmlFor={`${id}-note`} className="visually-hidden">
          Write a note on the paper (nothing is sent)
        </label>
        <textarea
          id={`${id}-note`}
          rows={5}
          maxLength={MAX_NOTE}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a few lines here…"
          spellCheck={false}
          className="ruled block w-full min-w-0 resize-none border-0 bg-transparent p-0 font-serif text-[1.15rem] italic text-graphite placeholder:text-stone focus-visible:outline-[var(--color-oxide)]"
        />

        <div className="mt-3 flex items-baseline gap-3 border-b border-hairline pb-1">
          <label htmlFor={`${id}-signed`} className="meta shrink-0 text-stone">
            Signed
          </label>
          <input
            id={`${id}-signed`}
            type="text"
            maxLength={40}
            value={signed}
            onChange={(e) => setSigned(e.target.value)}
            placeholder="your initials"
            className="min-w-0 flex-1 border-0 bg-transparent p-0 font-serif text-[1.05rem] italic text-graphite placeholder:text-stone focus-visible:outline-[var(--color-oxide)]"
          />
        </div>

        <div className="meta mt-3 flex items-center justify-between gap-3 text-stone">
          <p id={`${id}-hint`}>Paper only — nothing is sent or saved.</p>
          <button
            type="reset"
            disabled={!hasText}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-hairline px-3 py-1 text-graphite transition-colors enabled:hover:bg-graphite enabled:hover:text-paper disabled:opacity-40 focus-visible:outline-[var(--color-oxide)]"
          >
            <Eraser aria-hidden className="size-3.5" />
            Clear
          </button>
        </div>
      </form>

      <p className="mt-4 font-serif text-[0.95rem] italic leading-snug text-stone">
        Ostrel Atelier is a fictional studio — a VIZAM concept project. Projects, people and words are invented;
        photographs are stock images credited in the repository.
      </p>
      <div className="meta mt-4 flex justify-between border-t border-hairline pt-3 text-stone">
        <span>OA / VZM</span>
        <span aria-live="polite">{note.length > 0 ? `${note.length}/${MAX_NOTE}` : 'Thank you'}</span>
        <span>{year}</span>
      </div>
    </div>
  );
}
