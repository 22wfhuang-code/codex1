'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { runAnalyze } from '@/lib/client-api';
import { useI18n } from '@/lib/i18n';
import { saveReport } from '@/lib/storage';
import { SampleButton } from '@/components/SampleButton';

export default function UploadPage() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const csv = await file.text();
      const report = await runAnalyze(csv, lang);
      saveReport(report);
      router.push('/report');
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <h1 className="text-2xl font-bold text-ink">{t.upload.title}</h1>
      <p className="mt-3 max-w-3xl text-slate-600">{t.upload.desc}</p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="inline-flex cursor-pointer items-center rounded-lg bg-brand px-4 py-2.5 text-white hover:bg-blue-700">
          {loading ? t.upload.analyzing : t.upload.choose}
          <input
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={onFile}
            disabled={loading}
          />
        </label>
        <SampleButton className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-50" />
      </div>
    </section>
  );
}
