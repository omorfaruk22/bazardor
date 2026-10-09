export function CardSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-xl border border-gray-100 p-4">
      <div className="h-8 w-8 bg-gray-200 rounded" />
      <div className="mt-3 h-4 bg-gray-200 rounded w-3/4" />
      <div className="mt-2 h-3 bg-gray-200 rounded w-1/2" />
      <div className="mt-4 h-4 bg-gray-200 rounded w-2/3" />
    </div>
  );
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="animate-pulse max-w-6xl mx-auto px-4 py-8 space-y-4">
      <div className="h-10 w-2/3 bg-gray-200 rounded" />
      <div className="h-4 w-1/2 bg-gray-200 rounded" />
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="h-20 bg-gray-200 rounded" />
        <div className="h-20 bg-gray-200 rounded" />
        <div className="h-20 bg-gray-200 rounded" />
      </div>
      <div className="h-40 bg-gray-200 rounded mt-6" />
    </div>
  );
}