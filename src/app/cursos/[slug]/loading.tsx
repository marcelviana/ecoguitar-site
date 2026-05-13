export default function CursoLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-eco-night py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-5">
              <div className="h-6 w-24 bg-eco-white/10 rounded-full" />
              <div className="h-12 w-3/4 bg-eco-white/10 rounded-lg" />
              <div className="h-6 w-2/3 bg-eco-white/10 rounded" />
              <div className="h-12 w-48 bg-eco-turquoise/40 rounded" />
            </div>
            <div className="aspect-video bg-eco-white/10 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Conteúdo skeleton */}
      <div className="bg-eco-sand-light py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-6">
          <div className="h-8 w-1/3 bg-eco-border rounded" />
          <div className="h-4 w-full bg-eco-border rounded" />
          <div className="h-4 w-5/6 bg-eco-border rounded" />
          <div className="h-4 w-4/6 bg-eco-border rounded" />
        </div>
      </div>

      {/* Modelos skeleton */}
      <div className="bg-eco-sand-warm py-section border-t border-eco-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-8 w-1/2 bg-eco-border rounded mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-eco-border rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
