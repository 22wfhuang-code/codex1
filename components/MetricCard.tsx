'use client';

type Props = {
  label: string;
  value: number | null;
  isPercent?: boolean;
  decimals?: number;
};

export function MetricCard({ label, value, isPercent = false, decimals = 2 }: Props) {
  const display = (() => {
    if (value === null) return '-';
    const n = isPercent ? value * 100 : value;
    return n.toLocaleString(undefined, {
      maximumFractionDigits: decimals,
      minimumFractionDigits: 0
    }) + (isPercent ? '%' : '');
  })();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-ink">{display}</p>
    </div>
  );
}
