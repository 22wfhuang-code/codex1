'use client';

import { useRouter } from 'next/navigation';
import { runAnalyze } from '@/lib/client-api';
import { useI18n } from '@/lib/i18n';
import { saveReport } from '@/lib/storage';
import { useState } from 'react';

type Props = {
  className?: string;
};

export function SampleButton({ className }: Props) {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      const csv = await fetch('/sample.csv').then((res) => res.text());
      const report = await runAnalyze(csv, lang);
      saveReport(report);
      router.push('/report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      disabled={loading}
      onClick={onClick}
      className={
        className ??
        'rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50'
      }
    >
      {loading ? t.common.loading : t.common.useSample}
    </button>
  );
}
