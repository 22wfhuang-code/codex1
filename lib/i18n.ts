'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'zh' | 'en';

const dict = {
  zh: {
    nav: {
      logo: 'Amazon 店铺数据分析器'
    },
    common: {
      startUpload: '开始上传',
      useSample: '使用示例数据',
      backUpload: '重新上传',
      loading: '分析中...',
      noData: '暂无报告数据，请先上传或使用示例数据。'
    },
    home: {
      title: '7天看懂店铺是亏钱还是赚钱',
      subtitle:
        '通过订单、GMV、广告花费、流量、利润、COGS 等核心指标，结合规则自动诊断经营问题并输出行动计划。',
      whyTitle: '为什么能判断亏钱/赚钱？',
      whyBullets: [
        '利润率（ProfitMargin）直接衡量每 1 元销售额带来的净利润。',
        'ROI 反映广告投放回收效率，判断广告是否在“花冤枉钱”。',
        '转化率（ConversionRate）揭示流量是否有效，定位漏斗问题。',
        '高流量低订单可识别 Listing、价格、评价等前端转化障碍。'
      ]
    },
    upload: {
      title: '上传 CSV 并生成诊断报告',
      desc: '仅需上传一个 CSV 文件，系统会自动映射字段并输出指标、诊断和 7 天优化计划。',
      choose: '选择 CSV 文件',
      analyzing: '正在分析文件...'
    },
    report: {
      title: '经营诊断报告',
      metrics: '核心指标',
      diagnosis: '诊断结论',
      plan: '7天优化方案',
      day: '第 {{day}} 天'
    },
    metricNames: {
      orders: '订单数',
      gmv: 'GMV',
      adSpend: '广告花费',
      sessions: 'Sessions',
      profit: '利润',
      cogs: 'COGS',
      roi: 'ROI',
      conversionRate: '转化率',
      profitMargin: '利润率'
    }
  },
  en: {
    nav: {
      logo: 'Amazon Store Data Analyzer'
    },
    common: {
      startUpload: 'Start Upload',
      useSample: 'Use Sample Data',
      backUpload: 'Upload Again',
      loading: 'Analyzing...',
      noData: 'No report data found. Upload a CSV or use sample data first.'
    },
    home: {
      title: 'Know in 7 days if your store is losing or making money',
      subtitle:
        'Analyze orders, GMV, ad spend, traffic, profit, and COGS with rule-based diagnostics and an actionable improvement plan.',
      whyTitle: 'Why this can identify profit vs. loss',
      whyBullets: [
        'Profit margin shows net earnings per unit of revenue.',
        'ROI measures ad efficiency to detect wasteful spending.',
        'Conversion rate checks whether traffic is turning into orders.',
        'High sessions with low orders flags funnel issues in listing, pricing, or reviews.'
      ]
    },
    upload: {
      title: 'Upload CSV to generate a diagnosis report',
      desc: 'Upload one CSV file and the app auto-maps fields to return metrics, diagnosis, and a 7-day action plan.',
      choose: 'Choose CSV file',
      analyzing: 'Analyzing file...'
    },
    report: {
      title: 'Store Diagnosis Report',
      metrics: 'Core Metrics',
      diagnosis: 'Diagnosis',
      plan: '7-Day Plan',
      day: 'Day {{day}}'
    },
    metricNames: {
      orders: 'Orders',
      gmv: 'GMV',
      adSpend: 'Ad Spend',
      sessions: 'Sessions',
      profit: 'Profit',
      cogs: 'COGS',
      roi: 'ROI',
      conversionRate: 'Conversion Rate',
      profitMargin: 'Profit Margin'
    }
  }
};

type Dict = typeof dict.zh;

type I18nState = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
  renderText: (template: string, vars: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nState | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh');

  useEffect(() => {
    const cached = window.localStorage.getItem('lang');
    if (cached === 'zh' || cached === 'en') {
      setLang(cached);
    }
  }, []);

  const updateLang = (nextLang: Lang) => {
    setLang(nextLang);
    window.localStorage.setItem('lang', nextLang);
  };

  const value = useMemo<I18nState>(
    () => ({
      lang,
      setLang: updateLang,
      t: dict[lang],
      renderText: (template: string, vars: Record<string, string | number>) =>
        Object.entries(vars).reduce(
          (text, [key, val]) => text.replace(`{{${key}}}`, String(val)),
          template
        )
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used inside I18nProvider');
  }
  return ctx;
}
