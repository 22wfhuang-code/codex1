'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export function Navbar() {
  const { lang, setLang, t } = useI18n();

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-ink">
          {t.nav.logo}
        </Link>
        <button
          type="button"
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          {lang === 'zh' ? 'EN' : 'ZH'}
        </button>
      </div>
    </header>
  );
}
