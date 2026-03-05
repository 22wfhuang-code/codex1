'use client';

import Link from 'next/link';
import { SampleButton } from '@/components/SampleButton';
import { useI18n } from '@/lib/i18n';

export default function HomePage() {
  const { t } = useI18n();

  return (
    <section className="space-y-8">
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-3xl font-bold text-ink">{t.home.title}</h1>
        <p className="mt-4 max-w-3xl text-slate-600">{t.home.subtitle}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/upload"
            className="rounded-lg bg-brand px-5 py-2.5 font-medium text-white hover:bg-blue-700"
          >
            {t.common.startUpload}
          </Link>
          <SampleButton />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-2xl font-semibold text-ink">{t.home.whyTitle}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
          {t.home.whyBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
