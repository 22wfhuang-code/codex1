export type Metrics = {
  orders: number;
  gmv: number;
  adSpend: number;
  sessions: number;
  profit: number;
  cogs: number;
  roi: number | null;
  conversionRate: number | null;
  profitMargin: number | null;
};

export type Diagnosis = {
  summary: string;
  bullets: string[];
};

export type DayPlan = {
  day: number;
  title: string;
  actions: string[];
};

export type AnalyzeResponse = {
  ok: true;
  metrics: Metrics;
  diagnosis: Diagnosis;
  plan7d: DayPlan[];
};
