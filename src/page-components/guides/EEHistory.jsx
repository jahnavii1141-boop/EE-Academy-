'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'History is one of the classic Extended Essay subjects — and it rewards a very specific type of thinking. History EEs are not book reports and they are not just summaries of what happened. They are historical arguments: you take a historical question, evaluate the evidence, and reach a defensible conclusion.' },
  { type: 'heading', text: 'What Makes a Strong History EE Research Question' },
  { type: 'paragraph', text: 'The best History RQs are genuinely debated questions — ones where historians actually disagree, where the evidence is complex, and where there is room for original analysis of causes, consequences, or significance.' },
  { type: 'comparison-table', headers: ['Weak RQ', 'Strong RQ'], rows: [
    ['"What caused World War I?"', '"To what extent was Germany primarily responsible for the outbreak of World War I?"'],
    ['"What happened during the Cold War?"', '"To what extent was the Marshall Plan motivated by economic self-interest rather than humanitarian concern?"'],
    ['"How did colonialism affect Africa?"', '"To what extent did British colonial land policies contribute to the economic underdevelopment of Kenya between 1895 and 1963?"'],
  ]},
  { type: 'tip-box', text: '"To what extent" is your most important phrase in a History EE. It demands that you weigh multiple factors, consider different historical interpretations, and reach a nuanced conclusion — rather than just explaining what happened.' },
  { type: 'heading', text: 'The Historiography Element' },
  { type: 'paragraph', text: 'What separates a History EE from a History essay is historiography — engaging with how different historians have interpreted the same events. An A-grade History EE doesn\'t just cite primary sources; it also discusses how historical interpretations have changed over time and why.' },
  { type: 'step-process', steps: [
    { title: 'Identify Competing Interpretations', text: 'Find at least 2-3 historians who offer different explanations for your question. These become the backbone of your analysis.' },
    { title: 'Evaluate Their Arguments', text: 'What evidence does each historian use? What are their methodological approaches? What biases or limitations might affect their interpretation?' },
    { title: 'Position Your Own Argument', text: 'Based on the evidence and the historiographical debate, where do YOU come down? Your conclusion should reflect your own assessment of the evidence, not just a summary of what others said.' },
  ]},
  { type: 'heading', text: 'Primary vs Secondary Sources' },
  { type: 'comparison-table', headers: ['Primary Sources', 'Secondary Sources'], rows: [
    ['Documents from the period (speeches, letters, treaties)', 'Academic histories and biographies'],
    ['Government records and official reports', 'Historical analyses and journal articles'],
    ['Newspapers and contemporary accounts', 'Historiographical essays'],
    ['Statistics and census data from the period', 'Documentary films and educational texts'],
  ]},
  { type: 'paragraph', text: 'A strong History EE uses both. Primary sources give you evidence from the period. Secondary sources give you the academic debate. Don\'t rely entirely on one or the other.' },
  { type: 'heading', text: 'Where to Find History Sources' },
  { type: 'numbered-steps', items: [
    'Google Scholar — search for academic history journal articles on your topic',
    'JSTOR (jstor.org) — major repository of historical academic papers (many are free)',
    'Project GUTENBERG and national archives for primary source documents',
    'BBC History, History.com, and Britannica for context (never as cited sources)',
    'Your school or local library for academic history books',
  ]},
  { type: 'heading', text: 'Structure for a History EE' },
  { type: 'step-process', steps: [
    { title: 'Introduction', text: 'Establish context, present the historical debate, introduce your RQ, and outline your argument.' },
    { title: 'Historical Context', text: 'Provide necessary background without becoming a narrative summary. Only include context that directly sets up your analysis.' },
    { title: 'Factor Analysis', text: 'Evaluate each key factor or argument systematically. Use historian views, primary evidence, and your own analysis for each.' },
    { title: 'Counterargument', text: 'Engage with the strongest alternative interpretation. Acknowledging and refuting counterarguments strengthens your own conclusion.' },
    { title: 'Conclusion', text: 'Answer your RQ directly with a nuanced, evidence-based conclusion. Avoid: "therefore, it is clear that..." Replace with: "The weight of evidence suggests that..." or "While X was significant, Y was the more decisive factor because..."' },
  ]},
  { type: 'warning-box', text: 'The most common History EE failure: spending 2,500 words explaining what happened and only 500 words actually answering your RQ. Your reader already knows the historical background. They want to see your analysis of it.' },
  { type: 'key-takeaway', items: [
    '"To what extent" RQs demand evaluation — which is exactly what History examiners want',
    'Historiography is essential: engage with how historians disagree, not just what they say',
    'Combine primary sources (evidence) with secondary sources (debate)',
    'Structure your analysis around factors or arguments, not chronologically',
    'Spend more words analysing than narrating — the background is context, not the essay',
  ]},
]

const RELATED = [
  { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'History RQ examples alongside 7 other subjects.' },
  { href: '/guides/how-to-use-google-scholar-ee', title: 'How to Use Google Scholar', description: 'Find academic history sources and evaluate them.' },
]

const FAQ = [
  { question: 'Can I write my History EE on recent events (last 10 years)?', answer: 'IB generally recommends topics where sufficient historical perspective exists. Events from the last decade may lack the academic literature and historical distance needed for a strong EE. Check with your supervisor — some recent events (Arab Spring, 2008 financial crisis) have enough scholarly treatment to work.' },
  { question: 'Do I need to visit archives for a History EE?', answer: 'No. You can write an excellent History EE using digitally available primary sources (national archive websites, digitised newspaper archives, Google Books) and academic journal articles through Scholar. Physical archive visits are impressive but not required.' },
  { question: 'Is it okay to choose a history topic I already know well from class?', answer: 'Yes — and this is often a good idea. Topics you\'ve already studied give you a head start on context and sources. The key is to find a specific angle within that topic that goes deeper than what you covered in class.' },
]

export default function EEHistory() {
  return (
    <GuidePage
      title="IB Extended Essay History Guide"
      description="History EEs are historical arguments, not summaries. Learn how to frame your RQ, engage with historiography, combine primary and secondary sources, and build a conclusion that directly answers your question."
      canonical="/guides/ee-history"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
