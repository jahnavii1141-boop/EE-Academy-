'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Business Management is one of the most popular — and most accessible — subjects for the IB Extended Essay. The analytical frameworks are well-defined, the research is publicly available, and the marking tends to reward systematic analysis done well. A 32/34 EE on ZARA\'s business strategy was written using the approach outlined in this guide.' },
  { type: 'heading', text: 'Why Business Management Works Well for the EE' },
  { type: 'icon-card', icon: 'Target', title: 'Accessible Research', text: 'Companies publish annual reports, financial statements, press releases, and industry analyses publicly. You can build a well-evidenced essay without needing institutional database access.' },
  { type: 'icon-card', icon: 'BookOpen', title: 'Clear Analytical Frameworks', text: 'IB Business gives you established tools — Porter\'s Five Forces, BCG Matrix, SWOT, financial ratios, the 4 P\'s. Using these correctly and thoroughly demonstrates Criterion A knowledge immediately.' },
  { type: 'icon-card', icon: 'Brain', title: 'Quantitative + Qualitative Mix', text: 'Business EEs can combine original financial ratio calculations (from real annual reports) with qualitative strategic analysis. This mix is exactly what high-scoring essays do.' },
  { type: 'heading', text: 'Choosing Your Business EE Research Question' },
  { type: 'paragraph', text: 'The most common mistake in Business EEs is picking a company and then writing a general report about it. Your RQ must be analytical — it must demand evaluation and lead to a specific, defensible conclusion.' },
  { type: 'comparison-table', headers: ['Weak RQ (Descriptive)', 'Strong RQ (Analytical)'], rows: [
    ['"What is ZARA\'s business strategy?"', '"To what extent does ZARA\'s product portfolio and marketing strategy contribute to its dominance in the fast fashion market?"'],
    ['"How does Apple market its products?"', '"To what extent does Apple\'s premium pricing strategy enhance rather than limit its market share in the global smartphone market?"'],
    ['"What makes Tesla successful?"', '"To what extent has Tesla\'s direct-to-consumer distribution model contributed to its competitive advantage relative to legacy automakers?"'],
  ]},
  { type: 'tip-box', text: 'Use "to what extent" — it forces you to weigh factors, compare, and reach a nuanced conclusion. This is exactly what examiners want from Criterion C (Synthesis and Evaluation).' },
  { type: 'heading', text: 'The Business EE Framework Stack' },
  { type: 'paragraph', text: 'For a Business Management EE, plan to use 2-3 analytical frameworks. Don\'t promise more than you can deliver in 4,000 words — every framework you introduce in your methodology must be applied in your analysis.' },
  { type: 'step-process', steps: [
    { title: 'Porter\'s Five Forces', text: 'Best for analysing industry competitiveness and why a company succeeds or struggles within its sector. Works well as a literature review framework.' },
    { title: 'Financial Ratio Analysis', text: 'The highest-impact tool available. Pull data from actual annual reports and calculate ratios yourself (inventory turnover, profit margin, ROE). Compare against competitors using the same methodology. This is original quantitative analysis — exactly what pushes essays from B to A.' },
    { title: 'Value Chain Analysis', text: 'Strong for analysing how internal activities contribute to competitive advantage. Best applied to companies with distinctive operational models.' },
    { title: 'BCG Matrix', text: 'Useful for analysing product portfolio diversification. If you introduce this in your methodology, map the company\'s actual product lines onto the matrix — don\'t just mention it.' },
  ]},
  { type: 'heading', text: 'The Original Finding Principle' },
  { type: 'paragraph', text: 'The most impressive Business EEs don\'t just apply frameworks — they find something unexpected. When researching ZARA for a 32/34 essay, calculating ZARA\'s actual inventory turnover ratio (5.12) from Inditex\'s annual report revealed it was below the fast fashion industry standard of 8-12. That single finding — that ZARA\'s "speed" narrative doesn\'t fully hold up under the numbers — made the entire essay stand out.' },
  { type: 'tip-box', text: 'The best finding you can have in a Business EE is one that challenges the conventional narrative about your company. If your analysis just confirms what everyone already believes, it\'s not adding value. Look for the counterintuitive result.' },
  { type: 'heading', text: 'Data Sources for Business EEs' },
  { type: 'numbered-steps', items: [
    'Company annual reports (always the most credible primary source for financial data)',
    'Statista and IBISWorld (industry statistics and market analysis)',
    'Harvard Business Review and business academic journals via Google Scholar',
    'Company press releases and investor relations pages',
    'Industry analyst reports from firms like McKinsey, Deloitte, PwC',
  ]},
  { type: 'heading', text: 'Common Mistakes in Business EEs' },
  { type: 'warning-box', text: 'Avoid these: writing a company report instead of answering your RQ; introducing frameworks in the methodology but not applying them fully; analysing only one company without comparison data; using only Google sources with no academic citations; concluding that "Company X succeeds because it\'s good at business" without specific, evidence-backed reasons.' },
  { type: 'cta-box', label: 'Free tool', text: 'Track your sources as you research and generate your MLA bibliography automatically with the EE Dump.', href: '/dashboard/dump', buttonText: 'Try EE Dump free' },
  { type: 'key-takeaway', items: [
    'Use "to what extent" RQs — they demand evaluation, not description',
    'Combine financial ratio analysis (quantitative) with framework application (qualitative)',
    'Pull real data from annual reports and calculate ratios yourself — this is original analysis',
    'Only introduce analytical frameworks you will fully apply in your essay',
    'Look for the counterintuitive finding — that\'s what separates A from B',
  ]},
]

const RELATED = [
  { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'Business Management RQ examples alongside 7 other subjects.' },
  { href: '/guides/ee-dump-method', title: 'The EE Dump Research Method', description: 'How to research your company and build your source base.' },
]

const FAQ = [
  { question: 'Does my Business EE need to be about a specific company?', answer: 'Most successful Business EEs focus on a specific company or compare two companies. This gives you a concrete case to analyse using business frameworks. Abstract industry analyses are harder to make analytical and focused.' },
  { question: 'Can I do my Business EE on a local or small company?', answer: 'Yes, and this can actually work well — you may be able to gather primary data through interviews or surveys, which is a strength. The limitation is that your secondary data sources will be thinner, so you\'ll need to compensate with primary research.' },
  { question: 'Is Business Management a "soft" EE subject in terms of grading?', answer: 'Business is considered more accessible than some science subjects because the analytical frameworks are clearly defined and the research is publicly available. This doesn\'t mean it\'s easy — it means a student who applies the frameworks rigorously and finds original insights can score very well.' },
]

export default function EEBusinessManagement() {
  return (
    <GuidePage
      title="IB Extended Essay Business Management Guide"
      description="Business Management is one of the most accessible EE subjects when done right. Learn the framework stack, RQ structure, data sources, and the original finding principle behind a 32/34 Business EE."
      canonical="/guides/ee-business-management"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
