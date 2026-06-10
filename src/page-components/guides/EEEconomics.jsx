'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Economics Extended Essays reward students who can apply economic theory rigorously to real-world data. The subject has a clear analytical tradition — models, empirical evidence, evaluation of limitations — which makes it easier to structure a high-scoring essay once you understand what examiners are looking for.' },
  { type: 'heading', text: 'What Makes a Strong Economics EE Research Question' },
  { type: 'paragraph', text: 'The best Economics RQs connect a specific economic policy or phenomenon to measurable real-world outcomes, bounded by a specific time period and geography.' },
  { type: 'comparison-table', headers: ['Weak RQ', 'Strong RQ'], rows: [
    ['"Does inflation affect economic growth?"', '"To what extent did interest rate hikes reduce inflation in India between 2020 and 2023?"'],
    ['"Is free trade beneficial?"', '"To what extent did NAFTA\'s tariff reductions contribute to income inequality in Mexico between 1994 and 2010?"'],
    ['"How does monetary policy work?"', '"To what extent was Japan\'s quantitative easing programme effective in combating deflation between 2013 and 2022?"'],
  ]},
  { type: 'tip-box', text: 'Notice the pattern: all strong RQs have a specific policy/mechanism (interest rate hikes, QE), a specific country, and a specific time range. This scope is exactly right for 4,000 words.' },
  { type: 'heading', text: 'The Sub-RQ Method for Economics Research' },
  { type: 'paragraph', text: 'Before you start researching, divide your main RQ into 4-5 sub-questions. These become the pillars of your analysis. For example, for "To what extent did interest rate hikes reduce inflation in India (2020–2023)?":' },
  { type: 'numbered-steps', items: [
    'What does economic theory predict should happen when interest rates rise?',
    'What actually happened empirically to inflation in India during this period?',
    'What external factors interfered with the expected outcomes?',
    'What are the limitations of the available data?',
    'What does the evidence suggest about the effectiveness of this policy?',
  ]},
  { type: 'paragraph', text: 'Every source you find must answer at least one of these sub-questions. If a source doesn\'t directly address any of them, you don\'t need it.' },
  { type: 'heading', text: 'Key Analytical Frameworks for Economics EEs' },
  { type: 'icon-card', icon: 'BookOpen', title: 'Supply and Demand Models', text: 'The foundation of microeconomics analysis. Essential for any EE on markets, pricing, or resource allocation.' },
  { type: 'icon-card', icon: 'Target', title: 'IS-LM Model', text: 'For monetary and fiscal policy analysis. Connects money supply, interest rates, and output.' },
  { type: 'icon-card', icon: 'Brain', title: 'Phillips Curve', text: 'For inflation and unemployment trade-off analysis. Strong for EEs on monetary policy effectiveness.' },
  { type: 'icon-card', icon: 'Search', title: 'Comparative Advantage', text: 'For international trade EEs. Allows you to evaluate the theoretical basis for trade policy.' },
  { type: 'heading', text: 'Data Sources for Economics EEs' },
  { type: 'numbered-steps', items: [
    'World Bank Open Data (worldbank.org/data) — GDP, inflation, trade, unemployment data for every country',
    'IMF Data and reports — monetary policy analysis, country economic outlooks',
    'OECD Data — excellent for developed economies and policy comparison',
    'Central bank publications (Reserve Bank of India, Federal Reserve, ECB) — primary sources for monetary policy',
    'Google Scholar — for academic papers evaluating specific policies and outcomes',
  ]},
  { type: 'heading', text: 'How to Structure Your Analysis' },
  { type: 'step-process', steps: [
    { title: 'Theory First', text: 'What does economic theory predict should happen in this scenario? Introduce the relevant model and explain its predictions.' },
    { title: 'Empirical Evidence', text: 'What does the actual data show? Use real statistics from credible sources. Present this as tables or graphs where possible — visual data presentation is rewarded.' },
    { title: 'Gap Analysis', text: 'Where does the theory\'s prediction match the evidence? Where doesn\'t it? Why might there be a gap?' },
    { title: 'External Factors', text: 'What else was happening that might explain the outcome? Economic events rarely happen in isolation.' },
    { title: 'Conclusion with Limitations', text: 'Answer your RQ directly. Then acknowledge the limitations of your analysis and what further research could address.' },
  ]},
  { type: 'warning-box', text: 'The most common error in Economics EEs is description without evaluation. "India\'s inflation rate fell from X% to Y% during this period" is description. "This decline is consistent with the Phillips Curve prediction but may partially reflect supply-side recovery rather than purely monetary transmission" is analysis.' },
  { type: 'cta-box', label: 'Free tool', text: 'Track your sources as you research and generate your MLA bibliography automatically with the EE Dump.', href: '/dashboard/dump', buttonText: 'Try EE Dump free' },
  { type: 'key-takeaway', items: [
    'Specific policy + specific country + specific time range = a workable RQ',
    'Divide into 4-5 sub-RQs and find sources that answer each one',
    'Use World Bank, IMF, and central bank data — always cite the primary source',
    'Present data visually (tables, graphs) and reference them in your text',
    'Theory → Evidence → Gap analysis → External factors → Conclusion with limitations',
  ]},
]

const RELATED = [
  { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'Economics RQ examples alongside 7 other subjects.' },
  { href: '/guides/ee-literature-review', title: 'How to Write an EE Literature Review', description: 'How to engage with economic theory in your lit review.' },
]

const FAQ = [
  { question: 'Can I write an Economics EE on a topic from the news?', answer: 'Yes — and this is often a great approach. Current economic events (inflation crises, trade policy changes, central bank decisions) have abundant recent data and are often covered in academic papers. The key is bounding it with a specific time range and geography.' },
  { question: 'Do I need to include diagrams in an Economics EE?', answer: 'Diagrams are not required but are strongly recommended. A well-labelled supply and demand curve or Phillips Curve diagram shows you understand the theoretical framework visually. Make sure to reference every diagram in your text.' },
  { question: 'Should I choose a microeconomics or macroeconomics topic?', answer: 'Both are valid. Macroeconomics topics (monetary policy, trade, growth) tend to have more accessible data. Microeconomics topics (market structure, pricing, firm behaviour) can be more focused and original. Choose based on what genuinely interests you and where you can find the best data.' },
]

export default function EEEconomics() {
  return (
    <GuidePage
      title="IB Extended Essay Economics Guide"
      description="Economics EEs reward rigorous theory + real data. Learn the sub-RQ method, key analytical frameworks, best data sources, and how to structure analysis that scores in the A band."
      canonical="/guides/ee-economics"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
