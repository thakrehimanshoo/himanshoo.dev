'use client';

import { useState } from 'react';

interface Decision {
  id: string;
  title: string;
  context: string;
  choice: string;
  reason: string;
  timestamp: string;
}

const decisionsData: Decision[] = [
  {
    id: 'dec-1',
    title: 'Monorepo vs Polyrepo',
    context: 'Managing multiple related services with shared dependencies',
    choice: 'Adopted monorepo with Turborepo',
    reason: 'Shared code updates propagate instantly. Single CI pipeline reduces complexity. Easier refactoring across service boundaries. Trade-off: larger repository size is acceptable given improved developer experience.',
    timestamp: '2024-Q3'
  },
  {
    id: 'dec-2',
    title: 'Database Choice for Analytics',
    context: 'Time-series data growing at 1M+ events/day, complex aggregation queries needed',
    choice: 'TimescaleDB over ClickHouse',
    reason: 'PostgreSQL compatibility reduces learning curve. Excellent time-series optimizations without sacrificing relational features. ClickHouse offers better raw performance but requires specialized expertise. Our team\'s PostgreSQL knowledge made TimescaleDB more maintainable.',
    timestamp: '2024-Q2'
  },
  {
    id: 'dec-3',
    title: 'API Design Pattern',
    context: 'Building new REST APIs with potential for real-time features',
    choice: 'REST with optional WebSocket endpoints',
    reason: 'Most clients need simple request-response. GraphQL adds complexity without clear benefit for our use cases. WebSocket endpoints added selectively for features requiring push updates. Keeps mental model simple while enabling real-time where needed.',
    timestamp: '2024-Q2'
  },
  {
    id: 'dec-4',
    title: 'Error Handling Strategy',
    context: 'Inconsistent error responses across microservices causing client issues',
    choice: 'RFC 7807 Problem Details standard',
    reason: 'Industry standard for API error responses. Machine-readable with human-friendly messages. Easy to implement across all services. Provides consistent structure: type, title, status, detail, instance. Better than custom error schemas.',
    timestamp: '2024-Q1'
  },
  {
    id: 'dec-5',
    title: 'Testing Strategy',
    context: 'Balancing test coverage with development velocity',
    choice: 'Testing pyramid: heavy integration tests, selective unit tests',
    reason: 'Integration tests catch real issues in service interactions. Unit tests for complex business logic only. E2E tests for critical user journeys. Avoided 100% coverage goal - diminishing returns. Focus on high-value tests that prevent real bugs.',
    timestamp: '2024-Q1'
  },
  {
    id: 'dec-6',
    title: 'State Management (Frontend)',
    context: 'React applications growing in complexity, prop drilling becoming problematic',
    choice: 'Zustand over Redux',
    reason: 'Significantly less boilerplate than Redux. Hooks-first API matches React patterns. No provider setup needed. Performance is excellent with atomic selectors. Team picked it up in hours, not days. Redux power not needed for our use cases.',
    timestamp: '2023-Q4'
  }
];

export default function EngineeringDecisions() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-24 px-6 bg-[var(--background)]">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
            <span className="opacity-60">/</span>
            <span>Engineering Decisions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-[var(--foreground)]">
            Technical Decision Log
          </h2>
          <p className="text-[var(--muted)] mt-4 max-w-2xl">
            Architecture decisions with context and reasoning. What was chosen and why.
          </p>
        </div>

        {/* Decisions list */}
        <div className="space-y-4">
          {decisionsData.map((decision) => (
            <DecisionCard
              key={decision.id}
              decision={decision}
              isExpanded={expandedId === decision.id}
              onToggle={() => toggleExpand(decision.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DecisionCard({
  decision,
  isExpanded,
  onToggle
}: {
  decision: Decision;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="bg-[var(--card-bg)] border border-[var(--border)] rounded-sm
                 transition-all duration-200 hover:border-[var(--border-hover)]
                 hover:shadow-[0_2px_8px_var(--shadow-md)]"
    >
      <button
        onClick={onToggle}
        className="w-full p-5 text-left hover:bg-[var(--accent-light)] transition-colors duration-200"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-medium text-[var(--foreground)]">
                {decision.title}
              </h3>
              <span className="text-xs text-[var(--muted)] opacity-60">
                {decision.timestamp}
              </span>
            </div>
            <p className="text-sm text-[var(--muted)]">
              {decision.context}
            </p>
          </div>
          <div className="text-[var(--muted)] transition-transform duration-300"
               style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ↓
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isExpanded ? '500px' : '0',
          opacity: isExpanded ? 1 : 0
        }}
      >
        <div className="px-5 pb-5 space-y-4 border-t border-[var(--border)] pt-4">
          {/* Choice */}
          <div>
            <div className="text-xs font-medium text-[var(--accent)] uppercase tracking-wide mb-2">
              Decision
            </div>
            <p className="text-[var(--foreground)] font-medium">
              {decision.choice}
            </p>
          </div>

          {/* Reason */}
          <div>
            <div className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-2">
              Reasoning
            </div>
            <p className="text-[var(--foreground)] leading-relaxed">
              {decision.reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
