'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Info, LoaderCircle } from 'lucide-react';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { useForm, type FieldError } from 'react-hook-form';
import { submitInquiry } from '@/app/contact/actions';
import { PaperClip } from '@/components/ui/BinderClip';
import {
  BUDGETS, inquirySchema, LABELS, PROJECT_TYPES, SERVICES, SIZES, TIMELINES,
  type InquiryData, type InquiryInput, type InquiryResult,
} from '@/lib/inquiry-schema';

const inputCls =
  'w-full border-0 border-b border-graphite/35 bg-transparent px-0 py-2 text-[1.0625rem] placeholder:text-stone/70 focus:border-graphite focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-oxide';

function Field({ n, label, hint, error, children, htmlFor, optional }: { n: string; label: string; hint?: string; error?: FieldError; children: ReactNode; htmlFor?: string; optional?: boolean }) {
  return (
    <div className="grid grid-cols-[2.5rem_1fr] gap-x-3 sm:grid-cols-[3.5rem_1fr]">
      <span aria-hidden className="meta pt-1 text-stone">{n})</span>
      <div>
        {htmlFor ? (
          <label htmlFor={htmlFor} className="text-[0.9375rem]">{label}{optional && <span className="text-stone"> (optional)</span>}</label>
        ) : (
          <span className="text-[0.9375rem]">{label}</span>
        )}
        {hint && <p id={htmlFor ? `${htmlFor}-hint` : undefined} className="mt-0.5 text-[0.8125rem] text-stone">{hint}</p>}
        <div className="mt-1">{children}</div>
        {error?.message && (
          <p id={htmlFor ? `${htmlFor}-error` : undefined} className="mt-2 text-[0.875rem] text-oxide" role="alert">{error.message}</p>
        )}
      </div>
    </div>
  );
}

/** Radio / checkbox group: a real fieldset whose legend is the visible question. */
function ChoiceGroup({ n, legend, hint, error, errorId, children }: { n: string; legend: string; hint?: string; error?: string; errorId: string; children: ReactNode }) {
  return (
    <fieldset aria-describedby={error ? errorId : undefined} className="grid grid-cols-[2.5rem_1fr] gap-x-3 sm:grid-cols-[3.5rem_1fr]">
      <legend className="contents">
        <span aria-hidden className="meta pt-1 text-stone">{n})</span>
        <span className="text-[0.9375rem]">{legend}</span>
      </legend>
      <div className="col-start-2">
        {hint && <p className="mt-0.5 text-[0.8125rem] text-stone">{hint}</p>}
        <div className="mt-1">{children}</div>
        {error && <p id={errorId} className="mt-2 text-[0.875rem] text-oxide" role="alert">{error}</p>}
      </div>
    </fieldset>
  );
}

export function InquiryForm() {
  const id = useId();
  const [result, setResult] = useState<InquiryResult | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const {
    register, handleSubmit, setError, setValue, reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput, unknown, InquiryData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: '', email: '', phone: '', organisation: '', services: [], location: '', message: '', consent: false, website: '' },
    mode: 'onTouched',
  });

  useEffect(() => setValue('startedAt', Date.now()), [setValue]);
  useEffect(() => { if (result) statusRef.current?.focus(); }, [result]);

  const onSubmit = async (data: InquiryData) => {
    setResult(null);
    const res = await submitInquiry(data);
    if (!res.ok && res.fieldErrors) {
      for (const [k, msg] of Object.entries(res.fieldErrors)) setError(k as keyof InquiryInput, { message: msg });
    }
    setResult(res);
    if (res.ok) reset();
  };

  const f = (name: string) => `${id}-${name}`;
  const describe = (name: keyof InquiryInput, hint = false) =>
    [hint ? `${f(name)}-hint` : '', errors[name] ? `${f(name)}-error` : ''].filter(Boolean).join(' ') || undefined;

  return (
    <div className="paper relative px-5 pt-14 pb-8 sm:px-10 md:px-14">
      <PaperClip className="absolute -top-6 left-8 h-20 w-7 text-stone" />
      <div className="flex items-start justify-between gap-6 border-b border-graphite/20 pb-6">
        <div>
          <p className="meta text-stone">01 / Brief intake</p>
          <h2 className="mt-2 font-mono text-[1.375rem] uppercase leading-tight tracking-[0.04em]">Start a project</h2>
        </div>
        <p className="meta text-right text-stone">Ostrel<br />Atelier</p>
      </div>

      <p className="mt-6 flex gap-3 border border-oxide/40 bg-oxide/5 p-4 text-[0.9375rem]" data-testid="demo-notice">
        <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-oxide" />
        <span><strong className="font-medium">Demo form.</strong> Your answers are checked on the server, then discarded. Nothing is sent, stored or logged, and nobody will reply — this is a VIZAM concept site for a fictional studio.</span>
      </p>

      {result && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="status"
          data-testid="form-status"
          className={`mt-6 p-4 outline-none ${result.ok ? 'bg-graphite text-paper' : 'border border-oxide text-oxide'}`}
        >
          <p className="font-medium">{result.ok ? 'Demo submission received (not delivered)' : 'Not sent'}</p>
          <p className="mt-1">{result.message}</p>
          {result.ok && <p className="meta mt-2 opacity-80">Reference {result.reference}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-10" aria-describedby={`${id}-req`}>
        <p id={`${id}-req`} className="meta text-stone">All fields are required unless marked optional.</p>

        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={f('website')}>Website</label>
          <input id={f('website')} type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </div>

        <fieldset className="space-y-7">
          <legend className="meta mb-6 text-graphite">A — About you</legend>
          <Field n="01" label="Name" htmlFor={f('name')} error={errors.name}>
            <input id={f('name')} className={inputCls} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={describe('name')} {...register('name')} />
          </Field>
          <Field n="02" label="Email" htmlFor={f('email')} error={errors.email}>
            <input id={f('email')} type="email" inputMode="email" className={inputCls} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={describe('email')} {...register('email')} />
          </Field>
          <div className="grid gap-7 md:grid-cols-2">
            <Field n="03" label="Phone" optional htmlFor={f('phone')} error={errors.phone}>
              <input id={f('phone')} type="tel" className={inputCls} autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={describe('phone')} {...register('phone')} />
            </Field>
            <Field n="04" label="Organisation" optional htmlFor={f('organisation')} error={errors.organisation}>
              <input id={f('organisation')} className={inputCls} autoComplete="organization" aria-invalid={!!errors.organisation} aria-describedby={describe('organisation')} {...register('organisation')} />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-7">
          <legend className="meta mb-6 text-graphite">B — The project</legend>
          <ChoiceGroup n="05" legend="Project type" error={errors.projectType?.message} errorId={f('projectType-error')}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
              {PROJECT_TYPES.map((t) => (
                <label key={t} className="flex min-h-11 cursor-pointer items-center gap-3">
                  <input type="radio" value={t} className="size-4 accent-graphite" {...register('projectType')} />
                  {LABELS.projectType[t]}
                </label>
              ))}
            </div>
          </ChoiceGroup>
          <ChoiceGroup n="06" legend="Services you need" hint="Choose one or more." error={errors.services?.message} errorId={f('services-error')}>
            <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
              {SERVICES.map((sv) => (
                <label key={sv} className="flex min-h-11 cursor-pointer items-center gap-3">
                  <input type="checkbox" value={sv} className="size-4 accent-graphite" {...register('services')} />
                  {LABELS.services[sv]}
                </label>
              ))}
            </div>
          </ChoiceGroup>
          <Field n="07" label="Site location" hint="City or region is enough." htmlFor={f('location')} error={errors.location}>
            <input id={f('location')} className={inputCls} autoComplete="address-level2" aria-invalid={!!errors.location} aria-describedby={describe('location', true)} {...register('location')} />
          </Field>
          <div className="grid gap-7 md:grid-cols-3">
            <Field n="08" label="Approximate size" htmlFor={f('size')} error={errors.size}>
              <select id={f('size')} className={`${inputCls} cursor-pointer`} defaultValue="" aria-invalid={!!errors.size} aria-describedby={describe('size')} {...register('size')}>
                <option value="" disabled>Choose…</option>
                {SIZES.map((v) => <option key={v} value={v}>{LABELS.size[v]}</option>)}
              </select>
            </Field>
            <Field n="09" label="Budget" htmlFor={f('budget')} error={errors.budget}>
              <select id={f('budget')} className={`${inputCls} cursor-pointer`} defaultValue="" aria-invalid={!!errors.budget} aria-describedby={describe('budget')} {...register('budget')}>
                <option value="" disabled>Choose…</option>
                {BUDGETS.map((v) => <option key={v} value={v}>{LABELS.budget[v]}</option>)}
              </select>
            </Field>
            <Field n="10" label="Timeline" htmlFor={f('timeline')} error={errors.timeline}>
              <select id={f('timeline')} className={`${inputCls} cursor-pointer`} defaultValue="" aria-invalid={!!errors.timeline} aria-describedby={describe('timeline')} {...register('timeline')}>
                <option value="" disabled>Choose…</option>
                {TIMELINES.map((v) => <option key={v} value={v}>{LABELS.timeline[v]}</option>)}
              </select>
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-7">
          <legend className="meta mb-6 text-graphite">C — The brief</legend>
          <Field n="11" label="Tell us about the site, the people and what should change" hint="At least 20 characters. Please do not include sensitive personal information." htmlFor={f('message')} error={errors.message}>
            <textarea id={f('message')} rows={6} className={`${inputCls} ruled resize-y border-b-0 py-0`} aria-invalid={!!errors.message} aria-describedby={describe('message', true)} {...register('message')} />
          </Field>
          <Field n="12" label="Confirmation" error={errors.consent}>
            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" className="mt-1 size-4 accent-graphite" aria-invalid={!!errors.consent} {...register('consent')} />
              <span>I understand this is a demo: my answers are validated and discarded, and nobody will contact me.</span>
            </label>
          </Field>
        </fieldset>

        <div className="flex flex-col gap-4 border-t border-graphite/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center justify-center gap-3 bg-graphite px-6 py-3.5 text-paper transition-colors hover:bg-oxide disabled:opacity-60"
          >
            {isSubmitting ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : null}
            {isSubmitting ? 'Checking…' : 'Send brief (demo)'}
            {!isSubmitting && <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />}
          </button>
          <p className="meta text-stone">Demo · not delivered</p>
        </div>
      </form>

      <div className="meta mt-10 flex justify-between border-t border-graphite/20 pt-3 text-stone">
        <span>OA / BRF</span>
        <span>Thank you</span>
        <span>ostrel.example</span>
      </div>
    </div>
  );
}
