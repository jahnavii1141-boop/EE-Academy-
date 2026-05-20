'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  {
    type: 'paragraph',
    text: 'An A in the IB Extended Essay means scoring 27 or more out of 34 marks. That is roughly 79%, and it is absolutely achievable — but only if you understand what examiners are actually measuring. Most students who fall short do not fail because they are not smart enough. They fail because they misjudge what the essay needs to do.',
  },
  {
    type: 'paragraph',
    text: 'This guide breaks down the A grade into a concrete system: what the marks require, how each criterion works, and the seven steps that separate A-band essays from the rest. Everything here comes from the system behind a 32/34 Extended Essay.',
  },
  {
    type: 'heading',
    text: 'What Grade A Actually Requires',
  },
  {
    type: 'paragraph',
    text: 'The Extended Essay is marked on a scale of 0–34 across five criteria. The IB sets grade boundaries each session, but A typically starts at 27 and above. Here is how the grade bands usually break down:',
  },
  {
    type: 'comparison-table',
    headers: ['Grade', 'Marks', 'What It Means'],
    rows: [
      ['A', '27–34', 'Strong, consistent performance across all five criteria'],
      ['B', '22–26', 'Good but with identifiable gaps — usually in analysis depth or evaluation'],
      ['C', '14–21', 'Basic structure with limited analysis or thin engagement with sources'],
      ['D', '8–13', 'Significant weaknesses in argument, evidence, or academic rigour'],
      ['E', '0–7', 'Fails to meet the standard — essay or RPPF missing or severely flawed'],
    ],
  },
  {
    type: 'paragraph',
    text: 'The key insight is that A grades are not reserved for students who write the most — they go to students who understand what each criterion rewards and write deliberately to earn those marks. A well-planned B-grade essay can outperform an accidental A attempt every time.',
  },
  {
    type: 'heading',
    text: 'The Five Criteria You Are Actually Being Marked On',
  },
  {
    type: 'paragraph',
    text: 'Before building your A-grade strategy, you need to know where the marks live. The five criteria are not equally weighted, and most students either ignore some entirely or misread what they reward.',
  },
  {
    type: 'step-process',
    steps: [
      {
        title: 'Criterion A — Focus and Method (6 marks)',
        text: 'This criterion rewards a well-defined, appropriately scoped research question and a clearly justified methodology. An A-band response has a research question that is genuinely analytical — not just a topic, but a question that can be answered with evidence and argument. It explains why the chosen methods or frameworks were the right fit for this specific RQ. Vague RQs and unexamined methodologies are the fastest route to a B.',
      },
      {
        title: 'Criterion B — Knowledge and Understanding (6 marks)',
        text: 'This rewards accurate, subject-specific knowledge and genuine understanding of the topic. Examiners are looking for correct use of subject terminology, engagement with relevant academic debates, and evidence that you actually understand the content — not just that you found sources. Surface-level summaries without demonstrated understanding cap you here.',
      },
      {
        title: 'Criterion C — Critical Thinking (12 marks)',
        text: 'At 12 marks, Criterion C is the single most important criterion in the essay. It rewards analysis, evaluation, discussion, and reasoned argument. The difference between a B and an A almost always comes down to whether the student interprets and evaluates evidence or simply presents it. If your writing frequently uses phrases like "this shows that" without explaining the significance, counterarguments, or limitations, you are losing marks here.',
      },
      {
        title: 'Criterion D — Presentation (4 marks)',
        text: 'Presentation covers structure, layout, title page, table of contents, citations, bibliography, and adherence to word count. These marks are essentially free — they do not require analytical ability, only discipline. Many students lose one or two marks here through carelessness. Run a formatting checklist before you submit.',
      },
      {
        title: 'Criterion E — Engagement (6 marks)',
        text: 'Criterion E is assessed through the RPPF (Reflections on Planning and Progress Form). It rewards evidence of intellectual engagement, genuine curiosity, and authentic reflection on how your understanding developed. Examiners are not looking for a diary — they want to see that you thought critically about your research process, adapted when things did not work, and genuinely engaged with the intellectual challenge.',
      },
    ],
  },
  {
    type: 'stat-highlight',
    stat: '12/34',
    label: 'Criterion C alone — half your grade lives here',
  },
  {
    type: 'heading',
    text: 'How to Get an A in the Extended Essay: 7-Step System',
  },
  {
    type: 'paragraph',
    text: 'A 32/34 essay does not happen by accident. It follows a deliberate process from the very first decision. Here is the exact sequence that works:',
  },
  {
    type: 'step-process',
    steps: [
      {
        title: 'Step 1: Write a scoreable research question',
        text: 'Your research question is the single highest-leverage decision you make. A weak RQ forces everything downstream to be weaker. A strong RQ is specific, analytical, and researchable within 4,000 words. It asks "how", "to what extent", or "why" — not "what". Compare "What is the effect of social media on political engagement?" (too broad, descriptive by default) with "To what extent did Instagram Reels drive voter turnout among 18–24 year-olds in the 2024 US presidential election?" (specific, arguable, evidence-driven). The second RQ earns A-grade marks because it forces analysis, not just summary.',
      },
      {
        title: 'Step 2: Map every section to a specific criterion before you write',
        text: 'Before you write a single word of body text, open the markscheme and decide which parts of your essay earn which criterion marks. Your introduction should target Criterion A (focus and method). Your literature review and analysis should target Criterion C (critical thinking). Your methodology section addresses Criteria A and B. Your conclusion closes Criterion C and D. If you cannot say which criterion a section is earning, that section may not need to exist — or needs reframing.',
      },
      {
        title: 'Step 3: Build your source base before you draft',
        text: 'The biggest structural mistake in EE writing is starting to write before you have finished researching. When you write without a complete source base, you either pad sections you cannot support or you skip important counterarguments because you did not find the relevant paper yet. Use the EE Dump method: research by subtopic first, copy every useful quotation and source link into a structured document, then write from that foundation. Students who write from a full dump write faster, more confidently, and with stronger analysis.',
      },
      {
        title: 'Step 4: Prioritise analysis over description in every paragraph',
        text: 'The most common reason students fall from an A to a B is descriptive writing. Describing what your sources say is not analysis — it is a summary. Analysis means explaining what the evidence implies, evaluating its reliability or limitations, comparing it against a counterargument, and connecting it directly to your research question. Every paragraph in your analysis section should follow this structure: claim → evidence → interpretation → limitation or counterpoint → link back to RQ. If you are consistently skipping the interpretation and counterpoint steps, Criterion C marks are being left on the table.',
      },
      {
        title: 'Step 5: Structure for clarity, not length',
        text: 'A-grade essays have logical, navigable structures. The reader — your examiner — should never have to wonder where the argument is going or why a section exists. Use clear section headings, signposting at the start of each section ("This section argues..."), and a consistent internal structure for your body paragraphs. The seven-section framework (Introduction, Literature Review, Methodology, Analysis, Discussion, Conclusion, References) is the gold standard for most subjects because it directly mirrors how examiners read and mark.',
      },
      {
        title: 'Step 6: Write RPPF reflections that show intellectual growth',
        text: 'Too many students treat the RPPF as a formality and write three near-identical paragraphs describing what they did in each meeting. Examiners see through this instantly. A high-scoring RPPF entry shows genuine decision-making: a problem you encountered, how you thought about it, what you tried, and what you learned. Write your first entry after your initial planning phase (show your thinking about the RQ and methodology), your second after your main research phase (show how your understanding evolved or changed), and your third after your drafting phase (reflect honestly on what worked and what you would do differently). Authentic intellectual engagement earns 5–6 marks. Diary entries earn 1–2.',
      },
      {
        title: 'Step 7: Run a systematic pre-submission review',
        text: 'The final 48 hours before submission should be structured review, not panicked editing. Work through this in order: (1) read your conclusion and check that it directly, explicitly answers the research question stated in your introduction; (2) read your introduction and check that it accurately reflects the essay you actually wrote — these often drift apart; (3) check every in-text citation maps to a bibliography entry; (4) verify your word count is between 3,800 and 4,000 words; (5) confirm your title page, table of contents, and section headings match the submitted document; (6) read your RPPF entries and confirm they reflect genuine intellectual engagement rather than procedural description.',
      },
    ],
  },
  {
    type: 'heading',
    text: 'Where A Grades Are Most Commonly Lost',
  },
  {
    type: 'paragraph',
    text: 'Based on IB examiner reports and the patterns in lower-scoring essays, these are the specific points where students consistently drop from an A to a B:',
  },
  {
    type: 'key-takeaway',
    items: [
      'RQ is too broad — analysis cannot go deep enough in 4,000 words',
      'Analysis paragraphs describe evidence rather than interpreting it',
      'Counterarguments are absent or mentioned but not engaged with',
      'Conclusion does not directly answer the research question',
      'RPPF entries read as procedural diary entries rather than intellectual reflection',
      'Bibliography is incomplete, inconsistently formatted, or missing cited sources',
      'Methodology section explains what tools were used but not why they fit the RQ',
    ],
  },
  {
    type: 'heading',
    text: 'The Difference Between an A and a B in Practice',
  },
  {
    type: 'paragraph',
    text: 'The gap between a B and an A is almost never about intelligence or how hard someone worked. It is usually about one or two consistent habits in how evidence is handled. Here is what it looks like in practice:',
  },
  {
    type: 'comparison-table',
    headers: ['B-Grade Habit', 'A-Grade Habit'],
    rows: [
      ['Presents two studies and moves on', 'Presents two studies, evaluates their methodologies, identifies the tension between them, and connects that tension to the RQ'],
      ['States that the research question is answered', 'Explicitly answers the RQ using the evidence collected, acknowledges what remains uncertain, and suggests what further research could resolve'],
      ['Mentions a limitation in the conclusion', 'Addresses limitations at the point they arise in the analysis, explaining their specific impact on the validity of the argument'],
      ['RPPF: "I met with my supervisor and revised my RQ"', 'RPPF: "My initial RQ assumed X, but engagement with [source] revealed that Y complicates this. I narrowed the scope to address this and it strengthened the analytical focus of the essay"'],
    ],
  },
  {
    type: 'heading',
    text: 'Subject-Specific Considerations',
  },
  {
    type: 'paragraph',
    text: 'The seven-step system above applies across all subjects, but the specific markers of A-grade performance vary slightly by discipline:',
  },
  {
    type: 'step-process',
    steps: [
      {
        title: 'Sciences (Biology, Chemistry, Physics)',
        text: 'A-grade science EEs almost always involve primary data collection — a lab, experiment, or field study — rather than a purely secondary literature review. Your methodology section needs to justify your experimental design choices explicitly. Statistical analysis of your results is expected at A-band level, and you must evaluate sources of error and their impact on your conclusions.',
      },
      {
        title: 'Humanities (History, Economics, Business Management)',
        text: 'A-grade humanities EEs engage critically with sources rather than treating them as neutral fact-repositories. In History, this means evaluating origin, purpose, value, and limitation. In Economics, it means applying theory correctly and evaluating its assumptions in the context of your specific case. In Business Management, original analysis of a real company using established frameworks (with acknowledged limitations) separates A from B.',
      },
      {
        title: 'Language and Literature',
        text: 'A-grade Language A EEs demonstrate close textual analysis, not just thematic summary. The research question must be narrow enough that your 4,000 words can go deep rather than broad. Strong essays choose two or three texts (or a very focused single text) and analyse specific literary devices with reference to meaning, context, and effect.',
      },
    ],
  },
  {
    type: 'warning-box',
    text: 'The most common score killers are a broad RQ, descriptive writing without evaluation, weak or missing counterarguments, and RPPF entries that read as procedural rather than reflective. Fix these four and you fix most of the gap between B and A.',
  },
  {
    type: 'heading',
    text: 'A-Grade Checklist: Run This Before Submission',
  },
  {
    type: 'key-takeaway',
    items: [
      'Research question is specific, analytical, and stated identically in the introduction and on the title page',
      'Each section has a clear, identifiable purpose and targets a specific criterion',
      'Every analysis paragraph interprets evidence — not just presents it',
      'Counterarguments are raised and genuinely engaged with, not just mentioned',
      'Conclusion explicitly answers the research question using evidence from the body',
      'RPPF entries show intellectual decision-making, not procedural description',
      'All in-text citations correspond to a bibliography entry in consistent format',
      'Word count is between 3,800 and 4,000',
      'Formatting matches IB requirements: title page, table of contents, section headings',
    ],
  },
  {
    type: 'tip-box',
    text: 'Treat your EE like a mini-thesis written for an intelligent non-specialist — someone who knows the field but has not read your sources. If your argument would still be clear and compelling to that reader, you are writing at A-grade level.',
  },
]

const RELATED = [
  {
    href: '/guides/ee-criteria-breakdown',
    title: 'IB Extended Essay Criteria Explained',
    description: 'Know exactly where the 34 marks come from — criterion by criterion.',
  },
  {
    href: '/guides/extended-essay-structure',
    title: 'EE Structure Template',
    description: 'A section-by-section blueprint that maps directly to the markscheme.',
  },
  {
    href: '/guides/research-question-examples',
    title: 'Research Question Examples',
    description: 'Strong RQ patterns and real examples across subjects.',
  },
  {
    href: '/guides/ee-analysis-vs-description',
    title: 'Analysis vs Description',
    description: 'The single most common reason essays drop from A to B — and how to fix it.',
  },
]

const FAQ_ITEMS = [
  {
    question: 'What mark do I need for an A in the Extended Essay?',
    answer: 'You typically need 27 or more out of 34 marks (around 79%) for an A. The exact boundary varies slightly by session, but 27/34 is the reliable planning target. Check the IB grade boundaries for your subject and session once they are released.',
  },
  {
    question: 'What is the most important criterion for getting an A?',
    answer: 'Criterion C — Critical Thinking — is worth 12 of the 34 marks, making it by far the most important. It rewards analysis, evaluation, and reasoned argument rather than description. Most students who fall short of an A are losing marks specifically on Criterion C.',
  },
  {
    question: 'How long does it take to improve from a B to an A?',
    answer: 'If you have a complete draft, targeted improvements to your analysis paragraphs and RPPF reflections can often be made in one to three focused weeks. The biggest gains usually come from rewriting your analysis section to include genuine interpretation and counterarguments, and revising your RPPF to demonstrate intellectual engagement rather than procedural description.',
  },
  {
    question: 'What is the biggest reason students miss an A?',
    answer: 'Descriptive writing — presenting evidence without interpreting it, evaluating it, or linking it explicitly to the research question. Examiners use the phrase "merely descriptive" to describe B-band essays. Every analysis paragraph should answer the implicit question: so what does this evidence actually mean for your argument?',
  },
  {
    question: 'Can I get an A without primary research or experiments?',
    answer: 'In most humanities and social science subjects, yes — secondary source analysis done at sufficient depth earns A-band marks. In sciences (Biology, Chemistry, Physics), primary research or original data collection is strongly associated with A grades because the criteria reward experimental methodology and data analysis. A literature-only science EE can reach an A but is significantly harder.',
  },
  {
    question: 'Does the subject I choose affect my chances of getting an A?',
    answer: 'Indirectly, yes. Some subjects have broader A-grade distributions than others, and some subjects are significantly harder to write a compelling EE in if you lack prior knowledge. Subjects where you have genuine interest and existing academic strength give you a head start on Criteria B and C. Choosing a "strategically easier" subject you have no interest in usually backfires at the analysis stage.',
  },
]

export default function GetAExtendedEssayGuide() {
  return (
    <GuidePage
      title="How to Get an A in the Extended Essay (Step-by-Step)"
      description="Learn exactly how to get an A in the IB Extended Essay with a 7-step system, a full criterion breakdown, and the specific habits that separate A-grade essays from B-grade ones."
      canonical="/guides/how-to-get-an-a-in-extended-essay"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ_ITEMS}
    />
  )
}
