'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPosts(posts.filter(post => post.id !== id));
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    } finally {
      setDeleting(null);
    }
  };

  const togglePublish = async (post: Post) => {
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !post.published }),
      });

      if (res.ok) {
        const updated = await res.json();
        setPosts(posts.map(p => p.id === post.id ? updated : p));
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card-bg border-b border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Blog Admin
              </h1>
              <p className="text-sm text-foreground/60 mt-1">
                Welcome, {session?.user?.email}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-foreground/60 hover:text-accent transition-colors"
              >
                View Site
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-sm text-foreground/60 hover:text-red-500 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            All Posts ({posts.length})
          </h2>
          <Link
            href="/admin/posts/new"
            className="bg-accent hover:bg-accent/90 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            + New Post
          </Link>
        </div>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/50 mb-4">No posts yet</p>
            <Link
              href="/admin/posts/new"
              className="inline-block bg-accent hover:bg-accent/90 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-card-bg border border-foreground/10 rounded-lg p-6 hover:border-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {post.title}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          post.published
                            ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                            : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/70 mb-3 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/50">
                      <span>Slug: {post.slug}</span>
                      <span>•</span>
                      <span>
                        Updated: {new Date(post.updatedAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>{post.tags.join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => togglePublish(post)}
                      className="px-3 py-1.5 text-sm border border-foreground/10 rounded hover:bg-foreground/5 transition-colors"
                    >
                      {post.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="px-3 py-1.5 text-sm bg-accent/10 text-accent rounded hover:bg-accent/20 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={deleting === post.id}
                      className="px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                    >
                      {deleting === post.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
