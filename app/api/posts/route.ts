import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for creating/updating posts
const postSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string()),
  readingTime: z.string(),
  published: z.boolean().default(false),
  coverImage: z.string().optional(),
});

// GET /api/posts - List all posts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const published = searchParams.get('published');
  const tag = searchParams.get('tag');

  const where: any = {};

  if (published === 'true') {
    where.published = true;
  }

  if (tag) {
    where.tags = { has: tag };
  }

  const posts = await prisma.post.findMany({
    where,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(posts);
}

// POST /api/posts - Create new post (requires auth)
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const validated = postSchema.parse(body);

    const post = await prisma.post.create({
      data: {
        ...validated,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
