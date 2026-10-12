const skeletonCards = [0, 1, 2, 3, 4, 5, 6, 7];

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <div className="rounded-2xl border border-black/20 bg-white p-6">
        <div className="skeleton h-10 w-48" />
        <div className="skeleton mt-2 h-4 w-64" />
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="skeleton h-5 w-40" />
        <div className="skeleton h-10 w-48" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skeletonCards.map((card) => (
          <div key={card} className="skeleton h-48" />
        ))}
      </div>
    </main>
  );
}
