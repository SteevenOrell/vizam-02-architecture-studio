export default function Loading() {
  return (
    <div className="page-x flex min-h-[70svh] items-end pb-24 pt-40" role="status" aria-live="polite">
      <div className="w-full">
        <p className="meta text-stone">Loading</p>
        <div className="mt-6 h-px w-full overflow-hidden bg-hairline">
          <div className="h-full w-1/3 animate-pulse bg-graphite" />
        </div>
      </div>
    </div>
  );
}
