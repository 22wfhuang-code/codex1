'use client';

import { AnalyzeResponse } from './types';

const REPORT_KEY = 'analyze-report';

export function saveReport(report: AnalyzeResponse) {
  window.localStorage.setItem(REPORT_KEY, JSON.stringify(report));
}

export function loadReport(): AnalyzeResponse | null {
  const raw = window.localStorage.getItem(REPORT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AnalyzeResponse;
  } catch {
    return null;
  }
}
