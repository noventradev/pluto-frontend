'use client';

import { DashboardTable } from '@/app/dashboard/dashboard-table';
import { incomeColumns } from '@/components/income/income-column';
import {
  defaultIncomeFilters,
  IncomeFilters,
} from '@/app/lib/types/filter.types';
import { computeDateRange } from '@/app/lib/utitls/expense.utils';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Loader } from '@/components/ui/loader';
import { useIncomes } from '@/hooks/income/useIncomes';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FilterBar } from '../filter-bar';

export default function IncomePage() {
  const router = useRouter();

  const [filters, setFilters] = useState<IncomeFilters>(defaultIncomeFilters);

  const handleFilterChange = useCallback((updated: Partial<IncomeFilters>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  }, []);

  const { from, to } = computeDateRange(
    filters.dateFilter,
    filters.fromDate,
    filters.toDate
  );

  const { data, isLoading, isFetching } = useIncomes({
    page: filters.page,
    pageSize: filters.pageSize,
    sortBy: filters.sortBy,
    order: filters.order,
    search: filters.search,
    from,
    to,
  });

  return (
    <Container>
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Incomes</h1>
          <p className="text-muted-foreground text-sm">
            Track and manage all your incomes
          </p>
        </div>
        <Button onClick={() => router.push('/dashboard/income/add')}>Add Income</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      ) : (
        <div className="relative flex flex-col gap-4">
          {isFetching && (
            <div className="text-muted-foreground absolute top-2 right-2 text-xs">
              Updating...
            </div>
          )}

          <FilterBar filters={filters} onChange={handleFilterChange} />

          {data?.data?.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-10 text-center">
              <p className="text-muted-foreground text-sm">No incomes found</p>
            </div>
          ) : (
            <DashboardTable
              data={data?.data || []}
              columns={incomeColumns}
              page={filters.page}
              pageSize={filters.pageSize}
              totalPages={data?.totalPages ?? 0}
              onPageChange={(val) => handleFilterChange({ page: val })}
              onPageSizeChange={(val) =>
                handleFilterChange({ pageSize: val, page: 1 })
              }
              pageSizeOptions={[5, 10, 20, 25]}
            />
          )}
        </div>
      )}
    </Container>
  );
}
