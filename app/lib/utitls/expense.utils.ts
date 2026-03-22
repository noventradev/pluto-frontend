type DateRange = {
  from: string | null;
  to: string | null;
};

export function computeDateRange(
  dateFilter: string,
  fromDate: string | null,
  toDate: string | null
): DateRange {
  const now = new Date();

  if (dateFilter === 'currentMonth') {
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    return { from: first.toISOString(), to: now.toISOString() };
  }

  if (dateFilter === 'last90') {
    const past = new Date();
    past.setDate(now.getDate() - 90);
    return { from: past.toISOString(), to: now.toISOString() };
  }

  if (dateFilter === 'custom' && fromDate && toDate) {
    return { from: fromDate, to: toDate };
  }

  return { from: null, to: null };
}
