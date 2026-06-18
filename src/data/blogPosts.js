// ── Blog posts ────────────────────────────────────────────────────────────────
// Long-tail, question-led posts adapted from real student Q&As. Each post = one
// search intent = one URL. Keep slugs in sync with app/sitemap.js.
//
// Block types (rendered by ContentRenderer): paragraph, heading, tip-box,
// warning-box, numbered-steps, key-takeaway, quote-highlight, cta-box.

export const BLOG_POSTS = [
  {
    slug: 'can-you-use-ai-for-extended-essay',
    title: 'Can You Use AI to Write Your IB Extended Essay (Without Getting Flagged)?',
    description: 'IB allows AI as a thinking partner, not a ghostwriter. Where AI is safe, why "Turnitin didn\'t flag it" is false comfort, and why AI won\'t get you an A anyway.',
    date: '2026-06-18',
    readMins: 6,
    content: [
      { type: 'paragraph', text: 'This is the question almost every IB student is quietly asking. Your teacher says you can use AI "to an extent" — but where exactly is the line? IB is strict about academic integrity, and the fear of being flagged is real. So let\'s settle it: yes, you can use AI for your Extended Essay. The trick is knowing what it\'s actually for.' },

      { type: 'heading', text: 'The short answer' },
      { type: 'paragraph', text: 'IB has published an official position acknowledging that students will use AI, and it frames AI as a thinking partner rather than a ghostwriter. That single distinction is the whole rule. Using AI to think is allowed. Using AI to write is not.' },

      { type: 'heading', text: 'Where AI is completely fine' },
      { type: 'numbered-steps', items: [
        'Discussing where to take your topic and brainstorming angles',
        'Finding and locating sources to read yourself',
        'Summarising dense academic papers so you can decide if they\'re relevant',
        'Explaining concepts you don\'t understand yet',
        'Checking your citations and catching formatting errors',
      ]},
      { type: 'paragraph', text: 'In every one of those, you\'re still doing the thinking. AI is reacting to your work, not producing it.' },

      { type: 'heading', text: 'Where it gets you flagged' },
      { type: 'warning-box', text: 'The line is the writing itself. The moment AI writes your essay — or even a section, or "improves" a paragraph by rewriting it — the work is no longer yours. That\'s what gets flagged, and that\'s what costs students their diploma.' },

      { type: 'heading', text: 'Why "Turnitin didn\'t flag it" is false comfort' },
      { type: 'paragraph', text: 'A lot of students run their essay through the public version of Turnitin, see nothing flagged, and assume they\'re safe. Two problems with that. First, IB doesn\'t use commercial Turnitin — so a clean result on the public tool tells you very little about the version IB actually uses. Second, AI detection isn\'t only about prose style. It\'s about repetition across students: if you and a classmate have similar topics and both ask a chatbot to write a section, the outputs come out near-identical. That sameness is the giveaway — and an examiner paying attention can flag it manually, no software required.' },

      { type: 'heading', text: 'The part nobody mentions: AI won\'t get you an A anyway' },
      { type: 'paragraph', text: 'Even the newest models don\'t actually know what an EE needs. They\'ll produce something that sounds great in general but doesn\'t hit IB\'s specific standards — not because the IB is harder, just different. AI also gives everyone the same surface-level conclusions. The marks in an EE come from the opposite: you reading enough sources to notice something weird, contradictory, or unexpected, and then doing something with it. That spark doesn\'t come from a prompt. It comes from you.' },

      { type: 'quote-highlight', text: 'I initially used AI to generate my EE research question, prompted specifically to match the rubric for an A. My supervisor read it and literally told me it was rubbish. That\'s when I realised my own brain was smarter than AI for IB-specific things. I ended up with a 32/34.', attribution: 'A 32/34 Business Management graduate' },

      { type: 'key-takeaway', items: [
        'Use AI as a sparring partner — brainstorming, sources, summaries, explanations',
        'Never let AI write the essay or any section of it',
        'A clean public-Turnitin result does not mean IB won\'t catch it',
        'AI produces the same surface-level conclusions for everyone — the marks live in your original thinking',
        'Keep the actual thinking yours and you\'ll be fine',
      ]},

      { type: 'cta-box', label: 'Free tool', text: 'Want to use AI the right way? Our free EE Dump tool helps you collect sources and build your bibliography — the legitimate part of the process — without crossing the line.', href: '/dashboard/dump', buttonText: 'Try EE Dump free' },
    ],
    faqItems: [
      { question: 'Is it against IB rules to use AI for the Extended Essay?', answer: 'No — IB explicitly allows AI as a thinking partner: brainstorming, finding sources, summarising papers, and explaining concepts. What\'s forbidden is using AI to write the essay or any part of it. That crosses into academic misconduct.' },
      { question: 'Will Turnitin or IB detect AI writing in my EE?', answer: 'Possibly, and you can\'t rely on the public Turnitin to tell you. IB uses a different system, and detection often comes from repetition across students or an examiner manually spotting telltale patterns — not just a similarity score.' },
      { question: 'Can AI actually write a good Extended Essay?', answer: 'Not really. Current models don\'t know IB\'s specific standards and tend to produce generic, surface-level conclusions. The marks come from original analysis — noticing something unexpected in your sources — which AI can\'t do for you.' },
    ],
    related: [
      { href: '/guides/ee-ai-guide', title: 'How to Use AI for Your IB Extended Essay', description: 'The golden rules for using AI without crossing the integrity line.' },
      { href: '/guides/rppf-guide', title: 'IB Extended Essay RPPF Guide', description: 'How to score all 6 Criterion E marks with genuine reflection.' },
    ],
  },

  {
    slug: 'does-extended-essay-subject-matter',
    title: 'Does the Subject You Choose for Your Extended Essay Actually Matter?',
    description: 'Should you pick an "easy" EE subject? Why genuine interest beats strategy, how to play to your strengths, and why every EE is graded against the same criteria anyway.',
    date: '2026-06-18',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'Every pre-IB student asks some version of this: should I pick an "easy" subject for my Extended Essay, or does it not matter in the end? The honest answer is that your subject matters — but not in the way most students think.' },

      { type: 'heading', text: 'Interest comes first' },
      { type: 'paragraph', text: 'You\'re going to be living with this essay for most of your IB journey. It will get boring, annoying, and tiresome at points. If it\'s something you\'re genuinely interested in, the whole thing becomes far more bearable — and, importantly, interest usually leads to better research, because you\'re naturally willing to go down rabbit holes and notice the interesting details that earn marks.' },

      { type: 'heading', text: 'The "looks good for university" trap' },
      { type: 'warning-box', text: 'A common mistake is choosing a technical subject — Maths, Chemistry, Economics — purely because you want to major in it and think it signals interest to admissions officers. It doesn\'t. Your subject choices already signal that. Admissions officers rarely care what you wrote your EE in. Choosing for that reason just makes your life harder.' },

      { type: 'heading', text: 'Play to your strengths' },
      { type: 'paragraph', text: 'Be realistic about what you\'re actually good at. Plenty of students pick the "impressive" subject and end up with a lower score than they\'d have earned in a subject they\'re naturally stronger in. If you consistently top English, doing your EE in a subject you find harder just to seem "challenging" usually backfires. Strengths matter more than prestige.' },

      { type: 'heading', text: 'Every EE is graded against the same criteria' },
      { type: 'paragraph', text: 'Here\'s the part that reframes the whole question: all EEs are assessed against the same criteria, regardless of subject. What students call "easy" and "hard" subjects often just comes down to how naturally a subject lets you demonstrate those criteria. The newer syllabus even removed subject-specific advice in favour of subject groups — because the underlying skills are the same everywhere: challenge an assumption, ask a genuine question, and actually find something out.' },

      { type: 'key-takeaway', items: [
        'Genuine interest is the single biggest factor — it makes the process bearable and the research better',
        'Don\'t pick a subject just to "look good" for university; your choices already signal interest',
        'Be honest about your strengths — the impressive subject isn\'t worth a lower score',
        'Every EE is marked against the same criteria, so consistency and curiosity beat subject prestige',
      ]},

      { type: 'cta-box', label: 'Free guide', text: 'Still deciding? Our subject guide breaks down what each EE subject actually demands so you can choose with your eyes open.', href: '/guides/ee-subjects-guide', buttonText: 'Read the subject guide' },
    ],
    faqItems: [
      { question: 'Should I pick an easy subject for my Extended Essay?', answer: 'Pick the subject you\'re genuinely interested in and naturally strong at. "Easy" and "hard" mostly reflect how naturally a subject lets you show the assessment criteria — and every EE is marked against those same criteria regardless of subject.' },
      { question: 'Does my EE subject affect university applications?', answer: 'Very little. Admissions officers rarely care which subject you chose for your EE — your overall subject choices already signal your interests. Choosing a "prestigious" EE subject you\'re not strong in usually just lowers your score.' },
      { question: 'Is it harder to score well in a Language B Extended Essay?', answer: 'Not inherently. Every subject has its own challenges, and all EEs are graded against the same criteria. Strength and interest in the subject matter far more than the subject label.' },
    ],
    related: [
      { href: '/guides/ee-subjects-guide', title: 'Best IB Extended Essay Subjects', description: 'How to choose the right EE subject for your strengths.' },
      { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'Strong RQ patterns across 8 subjects.' },
    ],
  },

  {
    slug: 'how-to-write-extended-essay-reflections',
    title: 'How to Write Extended Essay Reflections That Score Full Marks (Criterion E)',
    description: 'EE reflections aren\'t a summary of what you did — they show your thinking. The "zoom out" method, why honesty beats perfectionism, and how to score Criterion E.',
    date: '2026-06-18',
    readMins: 6,
    content: [
      { type: 'paragraph', text: 'Reflections are one of the most misunderstood parts of the Extended Essay. Most students treat them as a summary of what they did — and lose marks for it. IB is looking at something else entirely: your thinking and your decision-making process.' },

      { type: 'heading', text: 'What reflections actually assess' },
      { type: 'paragraph', text: 'By the time you\'re writing reflections, you\'ve usually already done your research and presented your work. So reflections aren\'t there to repeat that. They\'re where you demonstrate engagement — how you thought, what you decided, and how your understanding grew. Criterion E rewards intellectual growth, not a tidy recap.' },

      { type: 'heading', text: 'The "zoom out" method' },
      { type: 'paragraph', text: 'The most useful thing you can do is zoom out and imagine explaining your project to someone unfamiliar with it. They\'d have questions: Why did you become interested in this question? Why does the answer matter? Why did you choose these methods or sources instead of others? What assumptions did you make? How does what you found compare to what others have found? Did anything surprise you? What were the limitations? What would you do differently with more time? Answer those honestly and you\'re essentially writing your reflections.' },

      { type: 'heading', text: 'Honesty beats perfectionism' },
      { type: 'tip-box', text: 'IB does not want perfectionism — it wants academic honesty. If you genuinely struggled with a method, found a flaw in your approach, changed direction halfway through, or realised an assumption was weaker than you thought, say so. A student who reflects honestly on real challenges scores far higher on engagement than one who presents everything as flawless from day one.' },

      { type: 'paragraph', text: 'The strongest reflections show genuine intellectual development. A good test: if someone read only your three reflections, they should be able to understand how your thinking evolved across the entire EE process. And before you write them, read the Engagement criterion in the official EE guide — IB is surprisingly explicit about what it wants, and most students overcomplicate it.' },

      { type: 'key-takeaway', items: [
        'Reflections show your thinking and decisions — not a summary of what you did',
        'Zoom out: answer why you cared, why these methods, what surprised you, what you\'d change',
        'Be honest about struggles and changes of direction — engagement rewards it',
        'If someone read only your reflections, they should see how your thinking grew',
        'Read the Engagement criterion in the EE guide — IB tells you what it wants',
      ]},

      { type: 'cta-box', label: 'Free guide', text: 'Want the full three-reflection structure and what each one should cover? Our RPPF guide walks through all six Criterion E marks.', href: '/guides/rppf-guide', buttonText: 'Read the RPPF guide' },
    ],
    faqItems: [
      { question: 'What should IB Extended Essay reflections include?', answer: 'Your thinking and decisions — why you chose your question and methods, what assumptions you made, what surprised you, what the limitations were, and how your understanding changed. Not a summary of tasks completed.' },
      { question: 'How do you score full marks on Criterion E?', answer: 'Show genuine intellectual growth and academic honesty. Reflect on real struggles and changes of direction across all three reflections, so a reader can trace how your thinking developed. Read the Engagement criterion in the EE guide for exactly what IB rewards.' },
      { question: 'How long should each EE reflection be?', answer: 'The three reflections share a 500-word limit on the RPPF. Use the space to show decision-making and growth rather than describing what you did step by step.' },
    ],
    related: [
      { href: '/guides/rppf-guide', title: 'IB Extended Essay RPPF Guide', description: 'The three-reflection structure for all 6 Criterion E marks.' },
      { href: '/guides/ee-criteria-breakdown', title: 'EE Criteria Breakdown', description: 'How every mark across criteria A–E is awarded.' },
    ],
  },
]

export function getBlogPost(slug) {
  return BLOG_POSTS.find(p => p.slug === slug)
}
