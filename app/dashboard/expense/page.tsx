'use client';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Loader } from '@/components/ui/loader';
import { Modal } from '@/components/ui/modal';
import { useState } from 'react';

import { DashboardTable } from '@/app/dashboard/dashboard-table';
import { expenseColumns } from '@/app/lib/constants/expense.column';
import { computeDateRange } from '@/app/lib/utitls/expense.utils';
import { ExpenseForm } from '@/components/expense/expense-form';
import { useExpenseMutation } from '@/hooks/expense/useExpenseMutation';
import { useExpenses } from '@/hooks/expense/useExpenses';
// import { useCategories } from '@/hooks/useCategories';
import { FilterBar } from '../filter-bar';

export default function ExpensePage() {
  const [isOpen, setIsOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [dateFilter, setDateFilter] = useState('latest');
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const { from, to } = computeDateRange(dateFilter, fromDate, toDate);

  const { data, isLoading, isFetching } = useExpenses({
    page,
    pageSize,
    sortBy,
    order,
    search,
    from,
    to,
  });

  const mutation = useExpenseMutation(() => {
    setIsOpen(false);
  });

  return (
    <Container>
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Expenses</h1>
          <p className="text-muted-foreground text-sm">
            Track and manage all your expenses
          </p>
        </div>

        <Button onClick={() => setIsOpen(true)}>+ Add Expense</Button>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Expense"
      >
        <ExpenseForm
          onSubmit={mutation.mutate}
          isSubmitting={mutation.isPending}
        />
      </Modal>

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

          {/* FILTER BAR */}
          <FilterBar
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            search={search}
            setSearch={setSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
            order={order}
            setOrder={setOrder}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            setPage={setPage}
          />

          {/* EMPTY STATE */}
          {data?.data?.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-10 text-center">
              <p className="text-muted-foreground text-sm">No expenses found</p>
              <Button className="mt-3" onClick={() => setIsOpen(true)}>
                Add your first expense
              </Button>
            </div>
          ) : (
            <DashboardTable
              data={data?.data ?? []}
              columns={expenseColumns}
              page={page}
              pageSize={pageSize}
              totalPages={data?.totalPages ?? 0}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              pageSizeOptions={[5, 10, 20, 25]}
            />
          )}
        </div>
      )}
    </Container>
  );
}
