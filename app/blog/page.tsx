import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  // Extract all unique tags
  const allTags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => allTags.add(tag)));
  const tags = Array.from(allTags).sort();

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Technical Writing
          </h1>
          <p className="text-lg text-foreground/70">
            Thoughts on software engineering, system design, and building production systems.
          </p>
        </div>
      </section>

      {/* Tags Filter */}
      <section className="pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 text-sm rounded-md bg-accent/20 text-accent hover:bg-accent/30 transition-colors">
              All Posts
            </button>
            {tags.map(tag => (
              <button
                key={tag}
                className="px-3 py-1 text-sm rounded-md bg-foreground/5 hover:bg-foreground/10 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <article className="border border-foreground/10 rounded-lg p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-foreground/60">
                      <time dateTime={post.createdAt.toString()}>
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-foreground/70 mb-4 line-clamp-2">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded bg-foreground/5 text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Indicator */}
                <div className="mt-4 flex items-center text-accent text-sm font-medium">
                  Read article
                  <svg
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Empty State (if no posts) */}
      {posts.length === 0 && (
        <section className="pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-foreground/50 text-lg">
              No posts published yet. Check back soon!
            </p>
          </div>
        </section>
      )}
      </main>
    </>
  );
}
