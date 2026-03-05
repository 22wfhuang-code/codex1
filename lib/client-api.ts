'use client';

import { Lang } from './i18n';
import { AnalyzeResponse } from './types';

export async function runAnalyze(csv: string, lang: Lang): Promise<AnalyzeResponse> {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ csv, lang })
  });

  if (!res.ok) {
    throw new Error('Analyze request failed');
  }

  return (await res.json()) as AnalyzeResponse;
}
