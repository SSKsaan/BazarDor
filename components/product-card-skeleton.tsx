export default function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-black/20 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="skeleton h-16 w-16 shrink-0 rounded-2xl" />
        <div className="flex-1">
          <div className="skeleton h-6 w-3/4" />
          <div className="skeleton mt-1 h-4 w-1/2" />
        </div>
      </div>
      <div className="skeleton mt-4 h-4 w-20" />
      <div className="mt-1 flex items-center justify-between gap-2">
        <div className="skeleton h-8 w-24" />
        <div className="skeleton h-7 w-20 rounded-full" />
      </div>
    </div>
  );
}
