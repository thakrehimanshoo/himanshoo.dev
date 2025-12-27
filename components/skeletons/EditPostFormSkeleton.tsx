export default function EditPostFormSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card-bg border-b border-foreground/10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="h-8 bg-foreground/10 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-foreground/10 rounded w-40 animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* Form Skeleton */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-6 animate-pulse">
          {/* Title Field */}
          <div>
            <div className="h-4 bg-foreground/10 rounded w-16 mb-2"></div>
            <div className="h-10 bg-foreground/10 rounded w-full"></div>
          </div>

          {/* Slug Field */}
          <div>
            <div className="h-4 bg-foreground/10 rounded w-16 mb-2"></div>
            <div className="h-10 bg-foreground/10 rounded w-full mb-1"></div>
            <div className="h-3 bg-foreground/10 rounded w-48"></div>
          </div>

          {/* Description Field */}
          <div>
            <div className="h-4 bg-foreground/10 rounded w-24 mb-2"></div>
            <div className="h-24 bg-foreground/10 rounded w-full"></div>
          </div>

          {/* Tags & Reading Time Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="h-4 bg-foreground/10 rounded w-16 mb-2"></div>
              <div className="h-10 bg-foreground/10 rounded w-full mb-1"></div>
              <div className="h-3 bg-foreground/10 rounded w-32"></div>
            </div>
            <div>
              <div className="h-4 bg-foreground/10 rounded w-24 mb-2"></div>
              <div className="h-10 bg-foreground/10 rounded w-full"></div>
            </div>
          </div>

          {/* Content Editor Skeleton */}
          <div>
            <div className="h-4 bg-foreground/10 rounded w-20 mb-2"></div>
            <div className="border border-foreground/10 rounded-md">
              {/* Toolbar skeleton */}
              <div className="border-b border-foreground/10 p-2 flex gap-2 bg-card-bg">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="h-8 w-8 bg-foreground/10 rounded"></div>
                ))}
              </div>
              {/* Content area skeleton */}
              <div className="p-4 bg-card-bg h-64 space-y-3">
                <div className="h-4 bg-foreground/10 rounded w-full"></div>
                <div className="h-4 bg-foreground/10 rounded w-5/6"></div>
                <div className="h-4 bg-foreground/10 rounded w-4/5"></div>
                <div className="h-4 bg-foreground/10 rounded w-full"></div>
                <div className="h-4 bg-foreground/10 rounded w-3/4"></div>
              </div>
            </div>
          </div>

          {/* Published Toggle Skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 bg-foreground/10 rounded"></div>
            <div className="h-4 bg-foreground/10 rounded w-40"></div>
          </div>

          {/* Actions Skeleton */}
          <div className="flex items-center gap-4 pt-4 border-t border-foreground/10">
            <div className="h-10 bg-foreground/10 rounded w-32"></div>
            <div className="h-4 bg-foreground/10 rounded w-16"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
