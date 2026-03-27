'use client';

import { ExpenseFilters } from '@/app/lib/types/filter.types';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

const inputClass =
  'border-border bg-background rounded-md border px-3 py-2 text-sm focus:outline-none w-full';

type FilterBarProps = {
  filters: ExpenseFilters;
  onChange: (updated: Partial<ExpenseFilters>) => void;
};

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    onChange({ search: debouncedSearch, page: 1 });
  }, [debouncedSearch]);

  return (
    <div className="flex flex-wrap items-center gap-3 p-2">
      {/* Date Filter */}
      <select
        value={filters.dateFilter}
        onChange={(e) =>
          onChange({
            dateFilter: e.target.value as ExpenseFilters['dateFilter'],
            page: 1,
          })
        }
        className={inputClass}
        style={{ maxWidth: 160 }}
      >
        <option value="latest">Latest</option>
        <option value="currentMonth">Current Month</option>
        <option value="last90">Last 90 Days</option>
        <option value="custom">Custom Range</option>
      </select>

      {/* Custom Date Range */}
      {filters.dateFilter === 'custom' && (
        <>
          <input
            type="date"
            value={filters.fromDate ?? ''}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => onChange({ fromDate: e.target.value, page: 1 })}
            className={inputClass}
            style={{ maxWidth: 150 }}
          />
          <span className="text-muted-foreground text-sm">to</span>
          <input
            type="date"
            value={filters.toDate ?? ''}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => onChange({ toDate: e.target.value, page: 1 })}
            className={inputClass}
            style={{ maxWidth: 150 }}
          />
        </>
      )}

      {/* Sort */}
      <select
        value={`${filters.sortBy}-${filters.order}`}
        onChange={(e) => {
          const [field, ord] = e.target.value.split('-');
          onChange({ sortBy: field, order: ord as 'asc' | 'desc', page: 1 });
        }}
        className={inputClass}
        style={{ maxWidth: 180 }}
      >
        <option value="createdAt-desc">Newest</option>
        <option value="createdAt-asc">Oldest</option>
        <option value="amount-desc">Amount High → Low</option>
        <option value="amount-asc">Amount Low → High</option>
        <option value="category-asc">Category A → Z</option>
      </select>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className={inputClass}
        style={{ maxWidth: 200 }}
      />
    </div>
  );
}
