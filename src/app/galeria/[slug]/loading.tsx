export default function InstrumentoLoading() {
  return (
    <div className="animate-pulse">
      <div className="bg-eco-sand-warm border-b border-eco-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3">
          <div className="h-3 w-40 bg-eco-border rounded" />
        </div>
      </div>
      <div className="bg-eco-sand-light py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12">
            {/* Fotos */}
            <div className="flex flex-col gap-3">
              <div className="aspect-[4/3] bg-eco-border rounded-xl" />
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-16 h-16 bg-eco-border rounded-lg" />
                ))}
              </div>
            </div>
            {/* Info */}
            <div className="flex flex-col gap-4">
              <div className="h-3 w-32 bg-eco-border rounded" />
              <div className="h-10 w-3/4 bg-eco-border rounded" />
              <div className="h-4 w-full bg-eco-border rounded" />
              <div className="h-4 w-5/6 bg-eco-border rounded" />
              <div className="mt-4 flex flex-col gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-10 bg-eco-border rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
