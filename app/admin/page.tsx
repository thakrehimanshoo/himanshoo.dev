'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminPostListSkeleton from '@/components/skeletons/AdminPostListSkeleton';

interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string; // Comma-separated tags
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) return;

    setDeleting(id);
    setError(null);
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPosts(posts.filter(post => post.id !== id));
      } else {
        const data = await res.json().catch(() => ({ error: 'Unknown error' }));
        setError(data.error || 'Failed to delete post. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setDeleting(null);
    }
  };

  const togglePublish = async (post: Post) => {
    setError(null);
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !post.published }),
      });

      if (res.ok) {
        const updated = await res.json();
        setPosts(posts.map(p => p.id === post.id ? updated : p));
      } else {
        const data = await res.json().catch(() => ({ error: 'Unknown error' }));
        setError(data.error || 'Failed to update post status. Please try again.');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Network error. Please check your connection and try again.');
    }
  };

  if (status === 'loading' || loading) {
    return <AdminPostListSkeleton />;
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
                className="text-sm text-foreground/60 hover:text-accent transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                View Site
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-sm text-foreground/60 hover:text-red-500 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-600 dark:text-red-400 px-4 py-3 rounded-md mb-6">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            All Posts ({posts.length})
          </h2>
          <Link
            href="/admin/posts/new"
            className="bg-accent hover:bg-accent/90 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
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
              className="inline-block bg-accent hover:bg-accent/90 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-card-bg border border-foreground/10 rounded-lg p-6 hover:border-accent/50 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
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
                      <span>{post.tags}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => togglePublish(post)}
                      className="px-3 py-1.5 text-sm border border-foreground/10 rounded hover:bg-foreground/5 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      {post.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="px-3 py-1.5 text-sm bg-accent/10 text-accent rounded hover:bg-accent/20 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={deleting === post.id}
                      className="px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
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
