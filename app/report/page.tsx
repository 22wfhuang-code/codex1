'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MetricCard } from '@/components/MetricCard';
import { SampleButton } from '@/components/SampleButton';
import { useI18n } from '@/lib/i18n';
import { loadReport } from '@/lib/storage';
import { AnalyzeResponse } from '@/lib/types';

export default function ReportPage() {
  const { t, renderText } = useI18n();
  const [report, setReport] = useState<AnalyzeResponse | null>(null);

  useEffect(() => {
    setReport(loadReport());
  }, []);

  if (!report) {
    return (
      <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-slate-700">{t.common.noData}</p>
        <div className="mt-5 flex gap-3">
          <Link href="/upload" className="rounded-lg bg-brand px-4 py-2 text-white hover:bg-blue-700">
            {t.common.startUpload}
          </Link>
          <SampleButton />
        </div>
      </section>
    );
  }

  const { metrics, diagnosis, plan7d } = report;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-ink">{t.report.title}</h1>

      <div>
        <h2 className="mb-3 text-xl font-semibold text-ink">{t.report.metrics}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard label={t.metricNames.orders} value={metrics.orders} decimals={0} />
          <MetricCard label={t.metricNames.gmv} value={metrics.gmv} />
          <MetricCard label={t.metricNames.adSpend} value={metrics.adSpend} />
          <MetricCard label={t.metricNames.sessions} value={metrics.sessions} decimals={0} />
          <MetricCard label={t.metricNames.profit} value={metrics.profit} />
          <MetricCard label={t.metricNames.cogs} value={metrics.cogs} />
          <MetricCard label={t.metricNames.roi} value={metrics.roi} />
          <MetricCard label={t.metricNames.conversionRate} value={metrics.conversionRate} isPercent />
          <MetricCard label={t.metricNames.profitMargin} value={metrics.profitMargin} isPercent />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold text-ink">{t.report.diagnosis}</h2>
        <p className="mt-3 text-slate-700">{diagnosis.summary}</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          {diagnosis.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold text-ink">{t.report.plan}</h2>
        <div className="mt-4 space-y-4">
          {plan7d.map((d) => (
            <div key={d.day} className="rounded-xl border border-slate-200 p-4">
              <h3 className="font-semibold text-ink">{renderText(t.report.day, { day: d.day })}: {d.title}</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                {d.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Link href="/upload" className="rounded-lg bg-brand px-4 py-2 text-white hover:bg-blue-700">
          {t.common.backUpload}
        </Link>
        <SampleButton />
      </div>
    </section>
  );
}
