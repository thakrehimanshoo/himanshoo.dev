export default function AdminPostListSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card-bg border-b border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 bg-foreground/10 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-4 bg-foreground/10 rounded w-48 animate-pulse"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-4 bg-foreground/10 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-foreground/10 rounded w-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="h-7 bg-foreground/10 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-foreground/10 rounded w-28 animate-pulse"></div>
        </div>

        {/* Posts List Skeleton */}
        <div className="grid gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-card-bg border border-foreground/10 rounded-lg p-6 animate-pulse"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-6 bg-foreground/10 rounded w-64"></div>
                    <div className="h-6 bg-foreground/10 rounded w-20"></div>
                  </div>
                  <div className="mb-3 space-y-2">
                    <div className="h-4 bg-foreground/10 rounded w-full"></div>
                    <div className="h-4 bg-foreground/10 rounded w-3/4"></div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="h-3 bg-foreground/10 rounded w-24"></div>
                    <div className="h-3 w-3 bg-foreground/10 rounded-full"></div>
                    <div className="h-3 bg-foreground/10 rounded w-28"></div>
                    <div className="h-3 w-3 bg-foreground/10 rounded-full"></div>
                    <div className="h-3 bg-foreground/10 rounded w-32"></div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <div className="h-8 bg-foreground/10 rounded w-20"></div>
                  <div className="h-8 bg-foreground/10 rounded w-16"></div>
                  <div className="h-8 bg-foreground/10 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
