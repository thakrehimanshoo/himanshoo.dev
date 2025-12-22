'use client';

import { useState } from 'react';

interface Project {
  id: string;
  name: string;
  purpose: string;
  tags: string[];
  problem: string;
  architecture: string;
  dataFlow: string;
  tradeoffs: string[];
  outcome: string;
}

const projectsData: Project[] = [
  {
    id: 'project-1',
    name: 'Distributed Task Queue System',
    purpose: 'High-throughput job processing for microservices',
    tags: ['Node.js', 'Redis', 'PostgreSQL', 'Docker'],
    problem: 'Multiple services needed async task processing with guaranteed delivery and retry logic. Existing solutions introduced vendor lock-in.',
    architecture: 'Event-driven architecture with Redis pub/sub for job distribution, PostgreSQL for state management, and worker pools for execution.',
    dataFlow: 'API Gateway → Job Publisher → Redis Queue → Worker Pool → State Store → Result Consumer',
    tradeoffs: [
      'Chose Redis over RabbitMQ for lower latency at scale',
      'Implemented custom retry logic instead of using Sidekiq to maintain Node.js stack',
      'Traded immediate consistency for eventual consistency to improve throughput'
    ],
    outcome: 'Processing 50K+ jobs/hour with 99.9% reliability. Reduced infrastructure costs by 40%.'
  },
  {
    id: 'project-2',
    name: 'Real-time Analytics Dashboard',
    purpose: 'Live metrics visualization for production monitoring',
    tags: ['React', 'WebSocket', 'TimescaleDB', 'Go'],
    problem: 'Engineering team needed real-time visibility into system health metrics without overwhelming the database.',
    architecture: 'Go backend with WebSocket server, TimescaleDB for time-series data, React frontend with efficient re-rendering strategy.',
    dataFlow: 'Metrics Collector → TimescaleDB → Aggregation Service → WebSocket → Frontend Dashboard',
    tradeoffs: [
      'Used WebSocket instead of SSE for bidirectional communication needs',
      'Implemented data sampling at high frequencies to reduce bandwidth',
      'Chose TimescaleDB over Prometheus for complex querying requirements'
    ],
    outcome: 'Real-time monitoring with <100ms latency. Helped reduce MTTR by 60%.'
  },
  {
    id: 'project-3',
    name: 'API Rate Limiter Middleware',
    purpose: 'Protect services from abuse and ensure fair resource allocation',
    tags: ['Express', 'Redis', 'TypeScript'],
    problem: 'APIs experienced traffic spikes causing cascading failures. Needed distributed rate limiting across multiple instances.',
    architecture: 'Token bucket algorithm with Redis-backed counter, sliding window for burst handling, configurable per-endpoint limits.',
    dataFlow: 'Request → Rate Limit Check → Redis Counter → Allow/Deny → Endpoint Handler',
    tradeoffs: [
      'Implemented token bucket over leaky bucket for better burst handling',
      'Chose Redis over in-memory cache for consistency across instances',
      'Added complexity with sliding windows but gained more accurate limiting'
    ],
    outcome: 'Eliminated API abuse incidents. Improved system stability under load by 85%.'
  }
];

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="min-h-screen py-24 px-6 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
            <span className="opacity-60">/</span>
            <span>Projects</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-[var(--foreground)]">
            Selected Work
          </h2>
          <p className="text-[var(--muted)] mt-4 max-w-2xl">
            Production systems built with focus on reliability, performance, and maintainability.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid gap-6">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              onToggle={() => toggleExpand(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  isExpanded,
  onToggle
}: {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="bg-[var(--card-bg)] border border-[var(--border)] rounded-sm
                 transition-all duration-300 hover:border-[var(--border-hover)]
                 hover:shadow-[0_4px_12px_var(--shadow-md)]"
    >
      {/* Card header - always visible */}
      <button
        onClick={onToggle}
        className="w-full p-6 text-left hover:bg-[var(--accent-light)] transition-colors duration-200"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-medium text-[var(--foreground)]">
              {project.name}
            </h3>
            <p className="text-[var(--muted)] text-sm">
              {project.purpose}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[var(--background)] text-xs
                           text-[var(--foreground)] border border-[var(--border)] rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="text-[var(--muted)] text-xl transition-transform duration-300"
               style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ↓
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isExpanded ? '2000px' : '0',
          opacity: isExpanded ? 1 : 0
        }}
      >
        <div className="px-6 pb-6 space-y-6 border-t border-[var(--border)]">
          {/* Problem */}
          <div className="pt-6">
            <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-2">
              Problem
            </h4>
            <p className="text-[var(--foreground)]">
              {project.problem}
            </p>
          </div>

          {/* Architecture */}
          <div>
            <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-2">
              System Architecture
            </h4>
            <p className="text-[var(--foreground)]">
              {project.architecture}
            </p>
          </div>

          {/* Data flow */}
          <div>
            <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-2">
              Data Flow
            </h4>
            <div className="bg-[var(--background)] p-4 rounded-sm border border-[var(--border)] font-mono text-sm">
              {project.dataFlow}
            </div>
          </div>

          {/* Trade-offs */}
          <div>
            <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-2">
              Key Trade-offs
            </h4>
            <ul className="space-y-2">
              {project.tradeoffs.map((tradeoff, idx) => (
                <li key={idx} className="flex gap-3 text-[var(--foreground)]">
                  <span className="text-[var(--accent)] mt-1">→</span>
                  <span>{tradeoff}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcome */}
          <div>
            <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-2">
              Outcome / Impact
            </h4>
            <p className="text-[var(--foreground)] font-medium">
              {project.outcome}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
