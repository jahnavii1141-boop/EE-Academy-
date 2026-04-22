'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Biology Extended Essays are unique among IB EE subjects because they require primary research — you design and conduct your own experiment. This is both the greatest challenge and the greatest opportunity. A well-designed Biology EE with clean data and genuine analysis stands out immediately from essays that are purely based on secondary research.' },
  { type: 'heading', text: 'Biology EE Research Questions: The Formula' },
  { type: 'paragraph', text: 'Biology RQs follow a specific pattern: "What is the effect of [independent variable] on [dependent variable] in [organism/system]?" This structure forces you to design an experiment with a clear hypothesis and measurable outcome.' },
  { type: 'comparison-table', headers: ['Weak RQ', 'Strong RQ'], rows: [
    ['"How does caffeine affect cells?"', '"What is the effect of varying concentrations of caffeine (0, 50, 100, 200, 400 mg/L) on the rate of mitosis in Allium cepa root tip cells?"'],
    ['"Does light affect plant growth?"', '"To what extent does the wavelength of light (red vs. blue vs. white) affect the rate of photosynthesis in Spinacia oleracea as measured by oxygen production?"'],
    ['"How do antibiotics work?"', '"What is the effect of varying concentrations of amoxicillin on the zone of inhibition in Escherichia coli cultures?"'],
  ]},
  { type: 'tip-box', text: 'The specificity is everything. "Allium cepa root tip cells" is specific. "Cells" is not. "Rate of mitosis" is measurable. "Cell health" is not. Make your independent variable, dependent variable, and organism all specific from the start.' },
  { type: 'heading', text: 'Designing Your Biology EE Experiment' },
  { type: 'step-process', steps: [
    { title: 'Independent Variable', text: 'The one thing you change. Use at least 5 concentrations or conditions for a meaningful range. Wider ranges with more data points give you stronger statistical results.' },
    { title: 'Dependent Variable', text: 'What you measure. Must be quantifiable and measurable with available equipment. "Rate of mitosis" (counted under microscope) is measurable. "Overall cell health" is not.' },
    { title: 'Controlled Variables', text: 'Everything else that could affect results: temperature, pH, light exposure, time, organism source. Document and control these rigorously — this is Criterion B (Application and Analysis).' },
    { title: 'Repetition', text: 'Conduct at least 5 trials per condition. Calculate means and standard deviations. Biology examiners expect statistical treatment of data.' },
    { title: 'Control Group', text: 'Always include a zero-concentration or untreated control. This is what your experimental results are compared against.' },
  ]},
  { type: 'heading', text: 'Statistical Analysis in Biology EEs' },
  { type: 'paragraph', text: 'Biology EEs are expected to include statistical analysis of data. This is not optional — it directly affects your Criterion B score. Common statistical tests for Biology EEs:' },
  { type: 'numbered-steps', items: [
    'Mean and standard deviation (required for all quantitative data)',
    'Standard error and 95% confidence intervals (shows reliability of your mean)',
    't-test (comparing two means — e.g., caffeine vs. no caffeine)',
    'ANOVA (comparing more than two groups — e.g., five concentrations)',
    'Correlation coefficient (if measuring a relationship between two continuous variables)',
  ]},
  { type: 'heading', text: 'Literature Review for Biology EEs' },
  { type: 'paragraph', text: 'Your literature review should introduce the biological mechanisms behind your experiment. If you\'re studying caffeine and mitosis, explain: what caffeine does biochemically, how mitosis works, and what previous research has found about caffeine\'s effect on cell division. This shows examiners you understand the underlying biology, not just your specific procedure.' },
  { type: 'heading', text: 'Common Biology EE Organisms and Systems' },
  { type: 'comparison-table', headers: ['Organism/System', 'Good For Studying'], rows: [
    ['Allium cepa (onion) root tips', 'Mitosis, chromosome behaviour, cell division inhibition'],
    ['Spinach leaves (Spinacia oleracea)', 'Photosynthesis rate, chlorophyll effects'],
    ['Yeast (Saccharomyces cerevisiae)', 'Fermentation, enzyme activity, substrate concentration'],
    ['Daphnia (water fleas)', 'Heart rate effects, toxicity testing (ethical considerations)'],
    ['Bacteria (E. coli or safe strains)', 'Antibiotic effectiveness, growth conditions'],
    ['Germinating seeds', 'Enzyme activity, inhibitor effects, germination rates'],
  ]},
  { type: 'warning-box', text: 'Ethical constraints: Do not use vertebrates (fish, mice, birds) for experiments. Do not use human subjects. Allium cepa, yeast, and bacteria are commonly used precisely because they have no ethical restrictions.' },
  { type: 'heading', text: 'Writing Your Conclusion' },
  { type: 'paragraph', text: 'Your conclusion must: directly answer your RQ using your data, connect your findings to the biological theory you established in the literature review, explain any anomalies or unexpected results, and evaluate the limitations of your methodology.' },
  { type: 'key-takeaway', items: [
    'RQ formula: "What is the effect of [IV] on [DV] in [specific organism]?"',
    'Minimum 5 concentrations/conditions, 5 trials each, control group always included',
    'Statistical analysis is required — at minimum, mean and standard deviation',
    'Literature review establishes the biological mechanism BEFORE your experiment',
    'Conclusion must directly answer your RQ using your own data, not general biology knowledge',
  ]},
]

const RELATED = [
  { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'Biology RQ examples alongside 7 other subjects.' },
  { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'How to organise a Biology EE from introduction to conclusion.' },
]

const FAQ = [
  { question: 'Do I need expensive equipment for a Biology EE?', answer: 'Not necessarily. Many strong Biology EEs are done with standard school lab equipment: microscopes, spectrophotometers, water baths, and basic chemistry supplies. Choose your research question based on what equipment is available to you at school.' },
  { question: 'Can I do a Biology EE using secondary research only?', answer: 'It is possible but unusual. Biology EEs are generally expected to include a significant primary research component (your own experiment). A purely literature-based Biology EE needs a very strong justification — discuss this with your supervisor before committing.' },
  { question: 'How many pages should my data tables and graphs be?', answer: 'Include all raw data and processed data, but be selective about graphs — include only those that directly support a specific analytical point. Appendices can hold raw data if it\'s extensive. Every graph and table must be referenced in your text.' },
]

export default function EEBiology() {
  return (
    <GuidePage
      title="IB Extended Essay Biology Guide"
      description="Biology EEs require primary research — your own experiment. Learn the RQ formula, how to design a controlled experiment, which statistical tests to use, and how to write a conclusion that directly answers your research question."
      canonical="/guides/ee-biology"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
