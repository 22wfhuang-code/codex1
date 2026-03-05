import { AnalyzeResponse, DayPlan, Metrics } from './types';

export type Lang = 'zh' | 'en';

type Row = Record<string, string>;

type RuleKey = 'loss' | 'lowRoi' | 'lowCv' | 'funnel';

const FIELD_ALIASES: Record<Exclude<keyof Metrics, 'roi' | 'conversionRate' | 'profitMargin'>, string[]> = {
  orders: ['orders', 'order_count'],
  gmv: ['gmv', 'sales', 'revenue'],
  adSpend: ['ad_spend', 'adspend', 'ad cost', 'ads'],
  sessions: ['sessions', 'traffic'],
  profit: ['profit', 'net_profit'],
  cogs: ['cogs', 'cost', 'product_cost']
};

const text = {
  zh: {
    summary: {
      bad: '当前经营存在明显风险，需要优先修复利润与转化链路。',
      normal: '当前整体经营稳健，建议在保持利润的前提下扩大增长。'
    },
    bullets: {
      loss: '利润率为负，处于亏损状态，优先检查 COGS、售价与广告结构。',
      lowRoi: 'ROI 低于 2，广告效率偏低，建议立即清理低效投放与关键词。',
      lowCv: '转化率低于 2%，流量承接不足，需优化 Listing、主图、价格与评价。',
      funnel: '流量较高但订单偏低，存在漏斗问题，重点排查详情页与价格竞争力。',
      healthy: '利润率、ROI 与转化率均在健康区间，可执行稳健增长策略。'
    },
    plan: {
      day: [
        {
          title: '损益盘点与止损',
          actions: ['分 ASIN 计算毛利与净利。', '暂停 ROI 过低的广告组。', '锁定高 ACOS 关键词并设为否定词。']
        },
        {
          title: 'COGS 与定价修正',
          actions: ['核对采购、物流、平台费的真实成本。', '为主力 SKU 设定保本价与目标利润价。', '对低利润 SKU 调整价格或优惠结构。']
        },
        {
          title: '广告结构重建',
          actions: ['按品牌词/类目词/竞品词拆分广告组。', '把预算集中到高转化词。', '降低无转化词竞价并观察 24 小时。']
        },
        {
          title: 'Listing 转化优化',
          actions: ['重写标题与前 5 点卖点，强调差异化价值。', '替换主图与 A+ 重点模块。', '补充高频问答，减少下单疑虑。']
        },
        {
          title: '评价与信任提升',
          actions: ['排查差评关键词并更新文案回应。', '优化售后卡片与自动跟进邮件。', '提升发货时效和缺货预警。']
        },
        {
          title: '转化漏斗复盘',
          actions: ['对比 Sessions、ATC、Orders 的阶段转化。', '找出掉队页面并优化价格锚点。', '在高流量时段做小幅促销测试。']
        },
        {
          title: '结果复盘与扩量',
          actions: ['回顾 7 天利润率、ROI、转化率变化。', '保留胜出策略并标准化执行。', '将预算扩展到表现最好的广告组。']
        }
      ],
      healthy: [
        {
          title: '维持高效投放',
          actions: ['保留高 ROI 广告组并微调出价。', '新增长尾词以稳步扩量。', '按日监控 ACOS 波动。']
        },
        {
          title: '放大优势 SKU',
          actions: ['为高利润 SKU 增加曝光预算。', '强化主图与卖点的竞争壁垒。', '扩展相关捆绑销售。']
        },
        {
          title: '提升页面体验',
          actions: ['优化详情页首屏信息密度。', '补充使用场景图与对比图。', '提升移动端阅读效率。']
        },
        {
          title: '稳步提高转化',
          actions: ['测试 2 组价格与优惠组合。', '优化 coupon 展示位置。', '强化评价精选展示。']
        },
        {
          title: '库存与现金流管理',
          actions: ['校准周转天数与补货节奏。', '避免断货导致排名损失。', '压缩低动销 SKU 备货。']
        },
        {
          title: '关键词护城河',
          actions: ['监控核心词排名稳定性。', '抢占高相关自然词。', '更新否定词清单。']
        },
        {
          title: '周度复盘与下一轮增长',
          actions: ['沉淀本周有效动作清单。', '制定下周预算与目标。', '进入下一轮增长测试。']
        }
      ]
    }
  },
  en: {
    summary: {
      bad: 'The store has clear operational risks. Fix margin and conversion bottlenecks first.',
      normal: 'Overall performance is healthy. Scale growth while protecting profitability.'
    },
    bullets: {
      loss: 'Profit margin is negative. Review COGS, pricing, and ad structure immediately.',
      lowRoi: 'ROI is below 2. Cut inefficient campaigns and optimize keyword structure.',
      lowCv: 'Conversion rate is below 2%. Improve listing, hero images, price, and reviews.',
      funnel: 'Sessions are high but orders are low. Investigate product page and pricing funnel.',
      healthy: 'Profit margin, ROI, and conversion rate are in healthy ranges. Execute steady growth.'
    },
    plan: {
      day: [
        {
          title: 'P&L audit and loss control',
          actions: ['Calculate gross and net profit by ASIN.', 'Pause ad groups with very low ROI.', 'Add high-spend low-return terms to negative list.']
        },
        {
          title: 'COGS and pricing correction',
          actions: ['Validate landed cost: product, shipping, and fees.', 'Set break-even and target margin prices.', 'Adjust price/promo structure for weak SKUs.']
        },
        {
          title: 'Ad structure rebuild',
          actions: ['Split campaigns by branded/category/competitor terms.', 'Concentrate budget on converting keywords.', 'Lower bids for non-converting terms and monitor.']
        },
        {
          title: 'Listing conversion optimization',
          actions: ['Rewrite title and top bullets with strong value props.', 'Upgrade hero image and key A+ modules.', 'Add FAQ content to reduce buyer hesitation.']
        },
        {
          title: 'Review and trust improvement',
          actions: ['Identify recurring negative review topics.', 'Improve follow-up and service messaging.', 'Tighten fulfillment speed and stock alerts.']
        },
        {
          title: 'Funnel diagnostics',
          actions: ['Compare Sessions, ATC, and Orders stage by stage.', 'Fix weak detail pages and price anchors.', 'Run limited promo tests during peak traffic windows.']
        },
        {
          title: 'Weekly review and scale-up',
          actions: ['Review 7-day changes in margin, ROI, and CVR.', 'Standardize winning actions.', 'Scale budget to best-performing campaigns.']
        }
      ],
      healthy: [
        {
          title: 'Keep ads efficient',
          actions: ['Maintain high-ROI campaigns with small bid tweaks.', 'Add long-tail terms for controlled scale.', 'Track ACOS variance daily.']
        },
        {
          title: 'Scale winning SKUs',
          actions: ['Increase budget for high-margin SKUs.', 'Strengthen differentiators in images and copy.', 'Expand bundle and cross-sell offers.']
        },
        {
          title: 'Improve page experience',
          actions: ['Increase first-screen clarity on key benefits.', 'Add use-case and comparison visuals.', 'Improve mobile readability and scanning.']
        },
        {
          title: 'Lift conversion steadily',
          actions: ['Test two pricing and promotion combinations.', 'Optimize coupon visibility.', 'Highlight best review snippets.']
        },
        {
          title: 'Inventory and cash discipline',
          actions: ['Align replenishment with sell-through speed.', 'Avoid stock-outs that hurt ranking.', 'Reduce overstock on slow SKUs.']
        },
        {
          title: 'Keyword moat',
          actions: ['Track rank stability for core keywords.', 'Expand high-intent organic terms.', 'Refresh negative keyword list weekly.']
        },
        {
          title: 'Review and next growth sprint',
          actions: ['Document effective actions from this week.', 'Set next-week targets and budget.', 'Launch the next iteration of growth tests.']
        }
      ]
    }
  }
} as const;

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function parseCsv(csv: string): Row[] {
  const rows: string[][] = [];
  let current = '';
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    const next = csv[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(current.trim());
      current = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') {
        i += 1;
      }
      row.push(current.trim());
      current = '';
      if (row.some((cell) => cell.length > 0)) {
        rows.push(row);
      }
      row = [];
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current.trim());
    if (row.some((cell) => cell.length > 0)) {
      rows.push(row);
    }
  }

  if (rows.length === 0) {
    return [];
  }

  const [header, ...data] = rows;
  const normalizedHeader = header.map(normalize);

  return data.map((cells) => {
    const mapped: Row = {};
    normalizedHeader.forEach((key, idx) => {
      mapped[key] = (cells[idx] ?? '').trim();
    });
    return mapped;
  });
}

function parseNumber(value: string | undefined): number {
  if (!value) return 0;
  const cleaned = value.replace(/[$,%\s]/g, '').replace(/,/g, '');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function getFieldValue(row: Row, aliases: string[]): number {
  for (const alias of aliases) {
    const key = normalize(alias);
    if (key in row) {
      return parseNumber(row[key]);
    }
  }
  return 0;
}

function sumMetrics(rows: Row[]): Metrics {
  const base = {
    orders: 0,
    gmv: 0,
    adSpend: 0,
    sessions: 0,
    profit: 0,
    cogs: 0
  };

  for (const row of rows) {
    base.orders += getFieldValue(row, FIELD_ALIASES.orders);
    base.gmv += getFieldValue(row, FIELD_ALIASES.gmv);
    base.adSpend += getFieldValue(row, FIELD_ALIASES.adSpend);
    base.sessions += getFieldValue(row, FIELD_ALIASES.sessions);
    base.profit += getFieldValue(row, FIELD_ALIASES.profit);
    base.cogs += getFieldValue(row, FIELD_ALIASES.cogs);
  }

  const roi = base.adSpend === 0 ? null : base.gmv / base.adSpend;
  const conversionRate = base.sessions === 0 ? null : base.orders / base.sessions;
  const profitMargin = base.gmv === 0 ? null : base.profit / base.gmv;

  return {
    ...base,
    roi,
    conversionRate,
    profitMargin
  };
}

function buildDiagnosis(metrics: Metrics, lang: Lang): { summary: string; bullets: string[]; ruleKeys: RuleKey[] } {
  const hitRules: RuleKey[] = [];

  if ((metrics.profitMargin ?? 0) < 0) hitRules.push('loss');
  if ((metrics.roi ?? 0) < 2) hitRules.push('lowRoi');
  if ((metrics.conversionRate ?? 0) < 0.02) hitRules.push('lowCv');

  const sessionsHigh = metrics.sessions >= 3000;
  const ordersLowVsTraffic = metrics.sessions > 0 && metrics.orders / metrics.sessions < 0.015;
  if (sessionsHigh && ordersLowVsTraffic) hitRules.push('funnel');

  const uniqueRules = [...new Set(hitRules)];
  if (uniqueRules.length === 0) {
    return {
      summary: text[lang].summary.normal,
      bullets: [text[lang].bullets.healthy],
      ruleKeys: []
    };
  }

  return {
    summary: text[lang].summary.bad,
    bullets: uniqueRules.map((rule) => text[lang].bullets[rule]),
    ruleKeys: uniqueRules
  };
}

function buildPlan7d(lang: Lang, hasRisk: boolean): DayPlan[] {
  const source = hasRisk ? text[lang].plan.day : text[lang].plan.healthy;
  return source.map((item, idx) => ({
    day: idx + 1,
    title: item.title,
    actions: item.actions
  }));
}

export function analyzeCsv(csv: string, lang: Lang = 'zh'): AnalyzeResponse {
  const rows = parseCsv(csv);
  const metrics = sumMetrics(rows);
  const diagnosis = buildDiagnosis(metrics, lang);
  const plan7d = buildPlan7d(lang, diagnosis.ruleKeys.length > 0);

  return {
    ok: true,
    metrics,
    diagnosis: {
      summary: diagnosis.summary,
      bullets: diagnosis.bullets
    },
    plan7d
  };
}
