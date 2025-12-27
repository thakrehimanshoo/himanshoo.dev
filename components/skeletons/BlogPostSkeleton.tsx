export default function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Back Button skeleton */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="h-4 bg-foreground/10 rounded w-32"></div>
        </div>
      </div>

      {/* Article Header skeleton */}
      <article className="pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            {/* Title skeleton */}
            <div className="mb-4 space-y-3">
              <div className="h-12 bg-foreground/10 rounded w-3/4"></div>
              <div className="h-12 bg-foreground/10 rounded w-1/2"></div>
            </div>

            {/* Meta skeleton */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="h-4 bg-foreground/10 rounded w-24"></div>
              <div className="h-4 w-4 bg-foreground/10 rounded-full"></div>
              <div className="h-4 bg-foreground/10 rounded w-32"></div>
              <div className="h-4 w-4 bg-foreground/10 rounded-full"></div>
              <div className="h-4 bg-foreground/10 rounded w-20"></div>
            </div>

            {/* Tags skeleton */}
            <div className="flex flex-wrap gap-2">
              <div className="h-8 bg-foreground/10 rounded-md w-20"></div>
              <div className="h-8 bg-foreground/10 rounded-md w-24"></div>
              <div className="h-8 bg-foreground/10 rounded-md w-28"></div>
            </div>
          </header>

          {/* Divider */}
          <div className="border-t border-foreground/10 mb-8" />

          {/* Content skeleton */}
          <div className="space-y-4">
            {/* Paragraph skeletons */}
            <div className="space-y-2">
              <div className="h-4 bg-foreground/10 rounded w-full"></div>
              <div className="h-4 bg-foreground/10 rounded w-full"></div>
              <div className="h-4 bg-foreground/10 rounded w-5/6"></div>
            </div>

            <div className="space-y-2">
              <div className="h-4 bg-foreground/10 rounded w-full"></div>
              <div className="h-4 bg-foreground/10 rounded w-full"></div>
              <div className="h-4 bg-foreground/10 rounded w-4/5"></div>
            </div>

            {/* Heading skeleton */}
            <div className="h-8 bg-foreground/10 rounded w-2/3 mt-8"></div>

            <div className="space-y-2">
              <div className="h-4 bg-foreground/10 rounded w-full"></div>
              <div className="h-4 bg-foreground/10 rounded w-full"></div>
              <div className="h-4 bg-foreground/10 rounded w-3/4"></div>
            </div>

            {/* Code block skeleton */}
            <div className="h-32 bg-foreground/5 border border-foreground/10 rounded-lg mt-6"></div>

            <div className="space-y-2">
              <div className="h-4 bg-foreground/10 rounded w-full"></div>
              <div className="h-4 bg-foreground/10 rounded w-5/6"></div>
            </div>
          </div>

          {/* Footer skeleton */}
          <div className="border-t border-foreground/10 mt-12 pt-8">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-foreground/10 rounded w-32"></div>
              <div className="flex items-center gap-4">
                <div className="h-5 w-5 bg-foreground/10 rounded"></div>
                <div className="h-5 w-5 bg-foreground/10 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
