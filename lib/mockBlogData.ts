// Mock blog data - will be replaced with database later
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string; // HTML content
  author: string;
  date: string;
  readingTime: string;
  tags: string[];
  published: boolean;
  coverImage?: string;
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'building-custom-thread-library',
    title: 'Building a Custom Thread Library in C',
    description: 'Deep dive into implementing user-level threading for Linux, exploring context switching, scheduling algorithms, and memory management.',
    content: `
      <p>Threading is one of the most fundamental concepts in modern operating systems. In this article, I'll walk through the process of building a user-level thread library from scratch in C.</p>

      <h2>The Challenge</h2>
      <p>Creating a thread library involves solving several complex problems:</p>
      <ul>
        <li>Context switching between threads</li>
        <li>Implementing scheduling algorithms</li>
        <li>Managing thread-local storage</li>
        <li>Handling synchronization primitives</li>
      </ul>

      <h2>Architecture Overview</h2>
      <p>The library uses <code>setcontext()</code> and <code>getcontext()</code> for context management. Here's the core structure:</p>

      <pre><code>typedef struct thread {
    ucontext_t context;
    int thread_id;
    void *stack;
    int state;
} thread_t;</code></pre>

      <h2>Context Switching</h2>
      <p>The most critical part is implementing efficient context switches. We use a round-robin scheduler with a 100ms time quantum.</p>

      <h2>Performance Results</h2>
      <p>Benchmarks showed the library could handle 10,000+ concurrent threads with minimal overhead compared to pthreads for I/O-bound tasks.</p>

      <h2>Key Takeaways</h2>
      <ul>
        <li>User-level threads offer fine-grained control</li>
        <li>Cooperative scheduling reduces context switch overhead</li>
        <li>Memory management is critical for scalability</li>
      </ul>
    `,
    author: 'Himanshoo Thakre',
    date: '2024-11-20',
    readingTime: '8 min read',
    tags: ['systems', 'C', 'operating-systems', 'concurrency'],
    published: true,
  },
  {
    id: '2',
    slug: 'web-scraping-architecture-headsup',
    title: 'Architecting a Real-Time Web Scraping System',
    description: 'How I built HeadsUp: lessons learned building a production web scraper with Python, Redis, and real-time notifications.',
    content: `
      <p>HeadsUp started as a simple project to help students track campus placement opportunities. It evolved into a production system serving 500+ active users.</p>

      <h2>The Problem</h2>
      <p>Students were missing placement notifications because they were scattered across multiple college portals. Manual checking was inefficient and error-prone.</p>

      <h2>Technical Architecture</h2>
      <p>The system consists of three main components:</p>
      <ul>
        <li><strong>Scraper Service</strong>: Python-based scrapers using BeautifulSoup and Selenium</li>
        <li><strong>Queue System</strong>: Redis for job management and rate limiting</li>
        <li><strong>Notification Engine</strong>: Real-time push notifications via Firebase</li>
      </ul>

      <h2>Challenges and Solutions</h2>

      <h3>1. Anti-Scraping Mechanisms</h3>
      <p>Many portals had anti-bot measures. Solution: Rotating user agents, request throttling, and session management.</p>

      <h3>2. Duplicate Detection</h3>
      <p>Implemented content hashing with Redis to avoid sending duplicate notifications:</p>
      <pre><code>def is_duplicate(content):
    content_hash = hashlib.md5(content.encode()).hexdigest()
    return redis_client.exists(f"seen:{content_hash}")</code></pre>

      <h3>3. Scalability</h3>
      <p>Initially ran on a single server. Migrated to distributed scraping with worker pools to handle increasing load.</p>

      <h2>Results</h2>
      <ul>
        <li>500+ active users</li>
        <li>99.2% uptime over 6 months</li>
        <li>Average notification delivery within 2 minutes of portal update</li>
      </ul>

      <h2>What I'd Do Differently</h2>
      <p>If I were to rebuild this today, I'd use a managed scraping service like ScrapingBee for better reliability and focus more on the user experience.</p>
    `,
    author: 'Himanshoo Thakre',
    date: '2024-12-10',
    readingTime: '10 min read',
    tags: ['python', 'web-scraping', 'architecture', 'redis'],
    published: true,
  },
  {
    id: '3',
    slug: 'choosing-postgresql-over-mongodb',
    title: 'Why I Chose PostgreSQL Over MongoDB',
    description: 'A data-driven comparison of PostgreSQL and MongoDB for a production application, including performance benchmarks and lessons learned.',
    content: `
      <p>The database choice is one of the most critical architectural decisions. Here's how I evaluated PostgreSQL vs MongoDB for a recent project.</p>

      <h2>The Use Case</h2>
      <p>Building a job tracking system with:</p>
      <ul>
        <li>Relational data (users, jobs, applications)</li>
        <li>Complex queries with joins</li>
        <li>ACID compliance requirements</li>
        <li>Need for data consistency</li>
      </ul>

      <h2>Evaluation Criteria</h2>

      <h3>1. Data Model Fit</h3>
      <p>While MongoDB's flexibility is appealing, our data had clear relationships. PostgreSQL's relational model was more natural:</p>
      <pre><code>-- Clean foreign key relationships
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    job_id INT REFERENCES jobs(id),
    status VARCHAR(50)
);</code></pre>

      <h3>2. Query Performance</h3>
      <p>Benchmark results for 1M records:</p>
      <ul>
        <li>Simple reads: MongoDB 20% faster</li>
        <li>Complex joins: PostgreSQL 3x faster</li>
        <li>Aggregations: PostgreSQL 2x faster</li>
      </ul>

      <h3>3. ACID Compliance</h3>
      <p>PostgreSQL's native ACID support was crucial for financial data integrity. MongoDB's transaction support (added in 4.0) had limitations with sharded clusters.</p>

      <h2>PostgreSQL Advantages</h2>
      <ul>
        <li>Strong type system prevents data inconsistencies</li>
        <li>Powerful query optimizer</li>
        <li>Excellent JSON support (best of both worlds)</li>
        <li>Mature ecosystem and tooling</li>
      </ul>

      <h2>When MongoDB Makes Sense</h2>
      <p>MongoDB is great for:</p>
      <ul>
        <li>Rapidly evolving schemas</li>
        <li>Document-centric applications</li>
        <li>Horizontal scaling requirements</li>
        <li>Simple key-value lookups at massive scale</li>
      </ul>

      <h2>Conclusion</h2>
      <p>For most web applications with relational data, PostgreSQL is the pragmatic choice. Don't let the NoSQL hype influence you—choose based on your actual requirements.</p>
    `,
    author: 'Himanshoo Thakre',
    date: '2024-12-15',
    readingTime: '7 min read',
    tags: ['databases', 'postgresql', 'mongodb', 'architecture'],
    published: true,
  },
  {
    id: '4',
    slug: 'draft-nextjs-performance-tips',
    title: 'Next.js Performance Optimization: A Comprehensive Guide',
    description: 'Draft: Practical techniques to optimize Next.js applications for production, covering SSR, ISR, and bundle optimization.',
    content: `
      <p>This is a draft post about Next.js performance optimization...</p>
      <p>Content coming soon!</p>
    `,
    author: 'Himanshoo Thakre',
    date: '2024-12-20',
    readingTime: '12 min read',
    tags: ['nextjs', 'performance', 'react'],
    published: false, // Draft post
  },
];

// Helper functions for mock data
export function getAllPosts(): BlogPost[] {
  return mockBlogPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return mockBlogPosts.find(post => post.slug === slug && post.published);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  mockBlogPosts
    .filter(post => post.published)
    .forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}
