import { NextResponse } from 'next/server';
import { analyzeCsv } from '@/lib/analyzer';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { csv?: string; lang?: 'zh' | 'en' };
    const csv = body.csv ?? '';
    const lang = body.lang === 'en' ? 'en' : 'zh';

    const report = analyzeCsv(csv, lang);
    return NextResponse.json(report);
  } catch {
    return NextResponse.json(
      {
        ok: true,
        metrics: {
          orders: 0,
          gmv: 0,
          adSpend: 0,
          sessions: 0,
          profit: 0,
          cogs: 0,
          roi: 0,
          conversionRate: 0,
          profitMargin: 0
        },
        diagnosis: {
          summary: 'Invalid input, fallback report generated.',
          bullets: ['Please provide valid CSV content.']
        },
        plan7d: Array.from({ length: 7 }, (_, i) => ({
          day: i + 1,
          title: 'Stabilize data quality',
          actions: ['Validate CSV headers.', 'Check numeric columns.', 'Re-run analysis.']
        }))
      },
      { status: 200 }
    );
  }
}
