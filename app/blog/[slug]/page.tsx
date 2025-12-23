import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/mockBlogData';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-accent hover:underline text-sm"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all posts
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-foreground/60 mb-4">
              <span>{post.author}</span>
              <span>•</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-md bg-foreground/5 text-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Divider */}
          <div className="border-t border-foreground/10 mb-8" />

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-foreground
              prose-p:text-foreground/80
              prose-strong:text-foreground
              prose-code:text-accent
              prose-code:bg-foreground/5
              prose-code:px-1.5
              prose-code:py-0.5
              prose-code:rounded
              prose-code:before:content-['']
              prose-code:after:content-['']
              prose-pre:bg-foreground/5
              prose-pre:border
              prose-pre:border-foreground/10
              prose-a:text-accent
              prose-a:no-underline
              hover:prose-a:underline
              prose-ul:text-foreground/80
              prose-ol:text-foreground/80
              prose-li:text-foreground/80
              prose-blockquote:text-foreground/70
              prose-blockquote:border-accent
              dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer Divider */}
          <div className="border-t border-foreground/10 mt-12 pt-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Link
                href="/blog"
                className="text-accent hover:underline text-sm"
              >
                ← Back to all posts
              </Link>

              <div className="flex items-center gap-4">
                <span className="text-sm text-foreground/60">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://himanshoo.dev/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-accent transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://himanshoo.dev/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-accent transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
