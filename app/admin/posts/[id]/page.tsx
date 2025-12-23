'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TipTapEditor from '@/components/TipTapEditor';
import Link from 'next/link';

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      if (p.id !== 'new') {
        fetchPost(p.id);
      } else {
        setLoading(false);
      }
    });
  }, []);

  const fetchPost = async (postId: string) => {
    try {
      const res = await fetch(`/api/posts/${postId}`);
      if (res.ok) {
        const post = await res.json();
        setTitle(post.title);
        setSlug(post.slug);
        setDescription(post.description);
        setContent(post.content);
        setTags(post.tags.join(', '));
        setReadingTime(post.readingTime);
        setPublished(post.published);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const postData = {
      title,
      slug,
      description,
      content,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      readingTime,
      published,
    };

    try {
      const url = id === 'new' ? '/api/posts' : `/api/posts/${id}`;
      const method = id === 'new' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        alert('Failed to save post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    } finally {
      setSaving(false);
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (id === 'new') {
      setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  if (loading) {
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
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">
              {id === 'new' ? 'New Post' : 'Edit Post'}
            </h1>
            <Link
              href="/admin"
              className="text-sm text-foreground/60 hover:text-accent transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 bg-card-bg border border-foreground/10 rounded-md
                       text-foreground placeholder-foreground/40
                       focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Enter post title"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-foreground mb-2">
              Slug *
            </label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2 bg-card-bg border border-foreground/10 rounded-md
                       text-foreground placeholder-foreground/40
                       focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="post-url-slug"
              required
            />
            <p className="text-xs text-foreground/50 mt-1">
              URL: /blog/{slug || 'your-slug'}
            </p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
              Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-card-bg border border-foreground/10 rounded-md
                       text-foreground placeholder-foreground/40
                       focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Brief description for the post card"
              required
            />
          </div>

          {/* Tags & Reading Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-2">
                Tags *
              </label>
              <input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-4 py-2 bg-card-bg border border-foreground/10 rounded-md
                         text-foreground placeholder-foreground/40
                         focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="react, typescript, nextjs"
                required
              />
              <p className="text-xs text-foreground/50 mt-1">
                Comma-separated
              </p>
            </div>

            <div>
              <label htmlFor="readingTime" className="block text-sm font-medium text-foreground mb-2">
                Reading Time *
              </label>
              <input
                id="readingTime"
                type="text"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                className="w-full px-4 py-2 bg-card-bg border border-foreground/10 rounded-md
                         text-foreground placeholder-foreground/40
                         focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="5 min read"
                required
              />
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Content *
            </label>
            <TipTapEditor content={content} onChange={setContent} />
          </div>

          {/* Published Toggle */}
          <div className="flex items-center gap-3">
            <input
              id="published"
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 text-accent bg-card-bg border-foreground/10 rounded
                       focus:ring-2 focus:ring-accent"
            />
            <label htmlFor="published" className="text-sm font-medium text-foreground">
              Publish immediately
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-foreground/10">
            <button
              type="submit"
              disabled={saving}
              className="bg-accent hover:bg-accent/90 text-white font-medium py-2 px-6 rounded-md
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : id === 'new' ? 'Create Post' : 'Save Changes'}
            </button>
            <Link
              href="/admin"
              className="text-foreground/60 hover:text-accent transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
