'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Psychology is one of the most popular EE subjects — and one where the quality gap between good and great essays is immediately visible. Most Psychology EEs describe studies. The best ones evaluate them, connect them, and use them to build an original argument.' },
  { type: 'heading', text: 'What Works for a Psychology EE Research Question' },
  { type: 'paragraph', text: 'Strong Psychology RQs focus on a specific psychological phenomenon, behaviour, or intervention — measured in a specific context. They allow for analysis of research evidence, methodology, and limitations.' },
  { type: 'comparison-table', headers: ['Weak RQ', 'Strong RQ'], rows: [
    ['"Does social media affect mental health?"', '"To what extent does passive social media use predict symptoms of depression in adolescents aged 13–18?"'],
    ['"How does stress affect memory?"', '"To what extent does cortisol elevation during acute stress impair long-term memory consolidation according to current neuroscientific evidence?"'],
    ['"Do stereotypes affect performance?"', '"To what extent does stereotype threat account for the gender gap in mathematics performance in competitive academic environments?"'],
  ]},
  { type: 'heading', text: 'The Psychology EE Approach' },
  { type: 'paragraph', text: 'You cannot conduct primary research for a Psychology EE — IB ethical guidelines prevent running experiments on participants. Instead, your essay analyses existing research: you evaluate what studies have found, how they found it, and what their limitations are.' },
  { type: 'icon-card', icon: 'Brain', title: 'Biological Level of Analysis', text: 'Neuroscience, brain structure, hormones (cortisol, dopamine, oxytocin), genetic influences on behaviour. Strong for EEs on memory, stress, attachment.' },
  { type: 'icon-card', icon: 'Target', title: 'Cognitive Level of Analysis', text: 'Mental processes, schema theory, cognitive biases, information processing. Strong for EEs on decision-making, memory, perception.' },
  { type: 'icon-card', icon: 'BookOpen', title: 'Sociocultural Level of Analysis', text: 'Social influence, group behaviour, cultural psychology, conformity, social norms. Strong for EEs on social media, group dynamics, cultural differences.' },
  { type: 'heading', text: 'How to Evaluate Studies (This Is Where Marks Are Won)' },
  { type: 'paragraph', text: 'The most important skill in a Psychology EE is evaluating research, not just reporting it. For every study you cite, address:' },
  { type: 'step-process', steps: [
    { title: 'Findings', text: 'What did the study find? State it precisely — include effect sizes, sample sizes, and methodology briefly.' },
    { title: 'Strengths', text: 'Why is this study credible? Controlled conditions? Large sample? Replicated findings? Peer-reviewed?' },
    { title: 'Limitations', text: 'What can\'t this study tell us? Ecological validity? Cultural bias? Correlation vs causation? Ethical constraints on methodology?' },
    { title: 'Link to Your RQ', text: 'How does this specific finding support or complicate your argument? Every study must serve your RQ — don\'t include studies that don\'t directly contribute.' },
  ]},
  { type: 'before-after',
    before: { label: 'Weak: just reporting', text: '"Twenge et al. (2018) found that heavy social media use is associated with depression in teenagers."' },
    after: { label: 'Strong: evaluating', text: '"Twenge et al. (2018) found a significant correlation between heavy social media use and depressive symptoms in a sample of 500,000 US adolescents. However, the study\'s correlational design cannot establish causation — it is equally plausible that adolescents with pre-existing depression use social media more heavily, a directionality problem Coyne et al. (2020) partially address by using longitudinal data."' },
  },
  { type: 'heading', text: 'Data Sources for Psychology EEs' },
  { type: 'numbered-steps', items: [
    'Google Scholar — search for peer-reviewed psychology studies. Sort by relevance, not date.',
    'PsycINFO (if your school has access) — the definitive psychology research database',
    'APA (American Psychological Association) journals — Journal of Personality and Social Psychology, Psychological Science',
    'Frontiers in Psychology — open access journal with broad coverage',
    'Seminal textbooks (Atkinson & Hilgard, Myers\' Psychology) for established theoretical frameworks',
  ]},
  { type: 'tip-box', text: 'For Psychology, finding a study that contradicts another study is gold. Build your analysis around the debate: Study A finds X, Study B finds Y. The difference might be methodology, sample, cultural context. Explaining WHY the studies disagree is genuine critical thinking.' },
  { type: 'heading', text: 'Unique to Psychology: The Ethical Consideration' },
  { type: 'paragraph', text: 'Strong Psychology EEs mention the ethical implications of the research they discuss. Were participants fully informed? Were vulnerable populations involved? Could the findings be misused? This adds a layer of sophistication that weaker essays miss entirely.' },
  { type: 'key-takeaway', items: [
    'Your RQ must be specific: phenomenon + context + population or time range',
    'You\'re analysing existing research, not conducting new experiments',
    'Evaluate every study: findings, strengths, limitations, link to RQ',
    'Build around debates: when studies contradict, explain why',
    'Mention ethical considerations — this distinguishes sophisticated essays',
  ]},
]

const RELATED = [
  { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'Psychology RQ examples alongside 7 other subjects.' },
  { href: '/guides/how-to-use-google-scholar-ee', title: 'How to Use Google Scholar', description: 'Find the peer-reviewed psychology studies your EE needs.' },
]

const FAQ = [
  { question: 'Can I do a survey or interview for my Psychology EE?', answer: 'IB has strict ethical guidelines for student research involving human participants. Survey research is generally not permitted for IB EEs. Your analysis must be based on existing peer-reviewed research. Check with your supervisor and your school\'s ethics guidelines.' },
  { question: 'How many studies should I cite in a Psychology EE?', answer: 'Quality over quantity. 8-12 high-quality peer-reviewed studies, each properly evaluated, is typically more impressive than 20 studies that are just summarised. Every study should directly serve your argument.' },
  { question: 'Do I need to use IB Psychology terminology specifically?', answer: 'Yes. IB Psychology has specific terminology (levels of analysis, schema, localisation of function, etc.) and your EE should demonstrate familiarity with these concepts. This is directly assessed under Criterion A (Knowledge and Understanding).' },
]

export default function EEPsychology() {
  return (
    <GuidePage
      title="IB Extended Essay Psychology Guide"
      description="Psychology EEs succeed by evaluating research, not just reporting it. Learn the three levels of analysis, how to evaluate studies, where to find peer-reviewed sources, and how to build an argument around conflicting evidence."
      canonical="/guides/ee-psychology"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
