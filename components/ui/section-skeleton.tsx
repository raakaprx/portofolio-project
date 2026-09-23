export function SectionSkeleton({
  lines = 3,
}: {
  lines?: number;
}) {
  return (
    <div className="py-20 max-w-7xl mx-auto px-6 animate-pulse select-none">
      <div className="flex flex-col items-center mb-12">
        <div className="h-5 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-3" />
        <div className="h-9 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl mb-3" />
        <div className="h-4 w-80 max-w-full bg-zinc-100 dark:bg-zinc-850 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: lines }).map((_, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-950/40 space-y-4"
          >
            <div className="h-36 w-full bg-zinc-200/80 dark:bg-zinc-800/60 rounded-xl" />
            <div className="h-5 w-3/4 bg-zinc-200 dark:bg-zinc-800/80 rounded" />
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded" />
              <div className="h-3.5 w-5/6 bg-zinc-100 dark:bg-zinc-900 rounded" />
            </div>
            <div className="flex gap-2 pt-2">
              <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-850 rounded-md" />
              <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-850 rounded-md" />
              <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-850 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
