import Link from 'next/link';
import { Suspense } from 'react';
import Navigation from '@/components/Navigation';
import { prisma } from '@/lib/prisma';
import BlogPostCardSkeleton from '@/components/skeletons/BlogPostCardSkeleton';
import { formatDateTime } from '@/lib/dateUtils';

export const dynamic = 'force-dynamic';

async function BlogPostsList() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  if (posts.length === 0) {
    return (
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-foreground/50 text-lg">
            No posts published yet. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <article className="border border-foreground/10 rounded-lg p-6 hover:border-accent/50 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-3 text-sm text-foreground/60">
                    <time dateTime={post.createdAt.toString()}>
                      {formatDateTime(post.createdAt)}
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
                {post.tags.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
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
                  className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-all duration-300 ease-in-out"
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
  );
}

function BlogPostsListSkeleton() {
  return (
    <section className="pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {[1, 2, 3].map((i) => (
          <BlogPostCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

async function TagsFilter() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { tags: true },
  });

  const allTags = new Set<string>();
  posts.forEach(post => {
    const postTags = post.tags.split(',').map(t => t.trim()).filter(Boolean);
    postTags.forEach(tag => allTags.add(tag));
  });
  const tags = Array.from(allTags).sort();

  return (
    <section className="pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1 text-sm rounded-md bg-accent/20 text-accent hover:bg-accent/30 transition-all duration-300 ease-in-out transform hover:scale-105">
            All Posts
          </button>
          {tags.map(tag => (
            <button
              key={tag}
              className="px-3 py-1 text-sm rounded-md bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function TagsFilterSkeleton() {
  return (
    <section className="pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-2 animate-pulse">
          <div className="h-8 bg-foreground/10 rounded-md w-20"></div>
          <div className="h-8 bg-foreground/10 rounded-md w-24"></div>
          <div className="h-8 bg-foreground/10 rounded-md w-28"></div>
          <div className="h-8 bg-foreground/10 rounded-md w-32"></div>
        </div>
      </div>
    </section>
  );
}

export default function BlogPage() {
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

        {/* Tags Filter with Suspense */}
        <Suspense fallback={<TagsFilterSkeleton />}>
          <TagsFilter />
        </Suspense>

        {/* Blog Posts Grid with Suspense */}
        <Suspense fallback={<BlogPostsListSkeleton />}>
          <BlogPostsList />
        </Suspense>
      </main>
    </>
  );
}
