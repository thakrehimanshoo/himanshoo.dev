export default function BlogPostCardSkeleton() {
  return (
    <article className="border border-foreground/10 rounded-lg p-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          {/* Title skeleton */}
          <div className="h-8 bg-foreground/10 rounded w-3/4 mb-2"></div>
          {/* Date and reading time skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-4 bg-foreground/10 rounded w-32"></div>
            <div className="h-4 w-4 bg-foreground/10 rounded-full"></div>
            <div className="h-4 bg-foreground/10 rounded w-20"></div>
          </div>
        </div>
      </div>

      {/* Description skeleton */}
      <div className="mb-4 space-y-2">
        <div className="h-4 bg-foreground/10 rounded w-full"></div>
        <div className="h-4 bg-foreground/10 rounded w-5/6"></div>
      </div>

      {/* Tags skeleton */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-6 bg-foreground/10 rounded w-16"></div>
        <div className="h-6 bg-foreground/10 rounded w-20"></div>
        <div className="h-6 bg-foreground/10 rounded w-24"></div>
      </div>

      {/* Read more skeleton */}
      <div className="mt-4 flex items-center">
        <div className="h-4 bg-foreground/10 rounded w-24"></div>
      </div>
    </article>
  );
}
