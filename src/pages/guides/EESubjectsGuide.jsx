import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Choosing the right subject for your Extended Essay is one of the most important decisions you\'ll make. The right choice means less stress and higher marks. The wrong choice means fighting uphill for 4,000 words.' },
  { type: 'heading', text: 'The Venn Diagram Framework' },
  { type: 'formula-box', title: 'Your Ideal EE Subject', formula: 'Genuine Interest + Academic Strength + EE-Friendly Subject', description: 'Your topic should sit at the intersection of these three. The closer to the centre, the better your experience.' },
  { type: 'heading', text: 'Popular Subjects Compared' },
  { type: 'comparison-table', headers: ['Subject', 'Difficulty', 'Key Consideration'], rows: [
    ['Business Management', 'Moderate', 'Generally more lenient grading. Strong for case study approaches.'],
    ['Economics', 'Moderate-High', 'Requires quantitative analysis. Data availability is crucial.'],
    ['Psychology', 'Moderate', 'Needs strong methodology. Ethics considerations important.'],
    ['History', 'Moderate', 'Requires primary sources. Argumentation is key.'],
    ['English Literature', 'High', 'Requires sophisticated literary analysis. Originality matters.'],
    ['Biology', 'High', 'Needs experimental component. Lab access can be limiting.'],
    ['Mathematics', 'Very High', 'Requires deep justification. Methodological rigour is critical.'],
    ['Environmental Science', 'Moderate', 'Data collection needs planning. Fieldwork adds strength.'],
  ]},
  { type: 'heading', text: 'How to Decide' },
  { type: 'icon-card', icon: 'Zap', title: 'Check Your Genuine Interest', text: 'Not an IB subject — what shows up on your social media? What do you talk about with friends? Fashion, gaming, politics, cooking?' },
  { type: 'icon-card', icon: 'GraduationCap', title: 'Check Your Academic Strength', text: 'Which subject do you score highest in with the least effort? Where does analysis come naturally?' },
  { type: 'icon-card', icon: 'Target', title: 'Check Clastify', text: 'Filter by subject. Look at 30+ essays and 20-25 essays. Understand what works and what doesn\'t.' },
  { type: 'tip-box', text: 'The magic happens when you connect a real interest to an IB subject. A student who loves sneakers can write a Business EE on Nike\'s pricing strategy. A gamer can write a Psychology EE on cognitive effects of video games.' },
  { type: 'warning-box', text: 'If your topic lives on the edges of the Venn diagram — you\'re passionate but it\'s in a weak subject, or it scores well but you couldn\'t care less — expect higher stress for the same marks.' },
  { type: 'key-takeaway', items: [
    'Use the Venn diagram: interest + strength + EE-friendly',
    'Business Management tends to have more lenient grading',
    'Mathematics requires the deepest justification and rigour',
    'Check Clastify before committing to understand scoring patterns',
  ]},
]

const RELATED = [
  { href: '/guides/research-question-examples', title: 'RQ Examples by Subject', description: 'See strong research questions across 8 subjects.' },
  { href: '/guides/extended-essay-tips', title: 'Top 20 EE Tips', description: 'Practical advice from A-grade students.' },
]

export default function EESubjectsGuide() {
  return (
    <GuidePage
      title="Best Subjects for Your IB Extended Essay"
      description="Compare IB subjects for the Extended Essay. Learn which subjects are easier to score in, how to match your interests to academic strengths, and use the Venn diagram framework."
      canonical="/guides/ee-subjects-guide"
      content={CONTENT}
      relatedGuides={RELATED}
    />
  )
}
