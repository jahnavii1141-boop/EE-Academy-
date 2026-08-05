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
    description: 'IB lets you use AI as a thinking partner, but not to write your essay. Where AI is safe, why a clean Turnitin result means little, and why AI won\'t get you an A.',
    date: '2026-06-18',
    readMins: 6,
    content: [
      { type: 'paragraph', text: 'Almost every IB student is quietly asking this. Your teacher says you can use AI "to an extent" but never really says where the line is. IB is strict about academic integrity and the fear of getting flagged is real. So here is the straight answer. You can use AI for your Extended Essay. You just have to know what it is actually for.' },

      { type: 'heading', text: 'The short answer' },
      { type: 'paragraph', text: 'IB has put out an official position that accepts students will use AI. It treats AI as a thinking partner rather than a ghostwriter, and that is basically the whole rule. You can use it to think. You cannot use it to write your essay.' },

      { type: 'heading', text: 'Where AI is fine' },
      { type: 'numbered-steps', items: [
        'Talking through where to take your topic and brainstorming angles',
        'Finding sources for you to go and read yourself',
        'Summarising dense papers so you can decide if they are worth reading',
        'Explaining concepts you don\'t understand yet',
        'Checking your citations and catching formatting errors',
      ]},
      { type: 'paragraph', text: 'In all of these you are still the one thinking. The AI is reacting to work you have already done.' },

      { type: 'heading', text: 'Where it gets you flagged' },
      { type: 'warning-box', text: 'The line is the writing. The moment AI writes your essay, or even one section, or rewrites a paragraph to "improve" it, the work stops being yours. That is what gets flagged, and it has cost students their diploma.' },

      { type: 'heading', text: 'Why "Turnitin didn\'t flag it" is false comfort' },
      { type: 'paragraph', text: 'Plenty of students run their essay through the public version of Turnitin, see nothing, and assume they are safe. Two problems with that. First, IB does not use commercial Turnitin, so a clean result on the public tool tells you very little about the version IB actually uses. Second, detection is not only about writing style. A lot of it is repetition across students. If you and a classmate have similar topics and both ask a chatbot to write a section, the outputs come out almost identical, and an examiner who is paying attention can flag that by hand without any software.' },

      { type: 'heading', text: 'AI won\'t get you an A anyway' },
      { type: 'paragraph', text: 'Even the newest models don\'t really know what an EE needs. They produce something that sounds good in general but misses IB\'s specific standards. Not because IB is harder, it is just different. AI also hands everyone the same surface-level conclusions. The marks come from the opposite of that: you reading enough sources to spot something odd or contradictory, and then doing something with it. That part has to come from you, not a prompt.' },

      { type: 'quote-highlight', text: 'I initially used AI to generate my EE research question, prompted specifically to match the rubric for an A. My supervisor read it and literally told me it was rubbish. That\'s when I realised my own brain was smarter than AI for IB-specific things. I ended up with a 32/34.', attribution: 'A 32/34 Business Management graduate' },

      { type: 'key-takeaway', items: [
        'Use AI as a sparring partner: brainstorming, sources, summaries, explanations',
        'Never let AI write the essay or any part of it',
        'A clean public Turnitin result does not mean IB will miss it',
        'AI gives everyone the same shallow conclusions, so the marks live in your own thinking',
        'Keep the thinking yours and you will be fine',
      ]},

      { type: 'cta-box', label: 'Free tool', text: 'Want to use AI the right way? The free EE Dump helps you collect sources and build your bibliography, which is the legitimate side of the process.', href: '/dashboard/dump', buttonText: 'Try EE Dump free' },
    ],
    faqItems: [
      { question: 'Is it against IB rules to use AI for the Extended Essay?', answer: 'No. IB allows AI as a thinking partner: brainstorming, finding sources, summarising papers, explaining concepts. What is not allowed is using AI to write the essay or any part of it. That crosses into academic misconduct.' },
      { question: 'Will Turnitin or IB detect AI writing in my EE?', answer: 'Possibly, and you can\'t rely on the public Turnitin to tell you. IB uses a different system, and a lot of detection comes from repetition across students or an examiner spotting patterns by hand, not just a similarity score.' },
      { question: 'Can AI actually write a good Extended Essay?', answer: 'Not really. Current models don\'t know IB\'s specific standards and tend to produce generic conclusions. The marks come from your own analysis, like noticing something unexpected in your sources, which AI cannot do for you.' },
    ],
    related: [
      { href: '/guides/ee-ai-guide', title: 'How to Use AI for Your IB Extended Essay', description: 'The rules for using AI without crossing the integrity line.' },
      { href: '/guides/rppf-guide', title: 'IB Extended Essay RPPF Guide', description: 'How to score all 6 Criterion E marks with genuine reflection.' },
          { href: "/blog/ib-ai-academic-integrity-meeting", title: "Called Into an AI Integrity Meeting?", description: "What to expect and how to handle it." },
      { href: "/blog/how-to-write-extended-essay-reflections", title: "EE Reflections That Score Full Marks", description: "The RPPF is the easiest 6 marks you can bank." },
    ],
  },

  {
    slug: 'does-extended-essay-subject-matter',
    title: 'Does the Subject You Choose for Your Extended Essay Actually Matter?',
    description: 'Should you pick an "easy" EE subject? Why genuine interest beats strategy, how to play to your strengths, and why every EE is graded against the same criteria.',
    date: '2026-06-18',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'Every pre-IB student asks some version of this. Should I pick an "easy" subject for my Extended Essay, or does it not matter in the end? Your subject does matter, just not in the way most students think.' },

      { type: 'heading', text: 'Interest comes first' },
      { type: 'paragraph', text: 'You are going to be living with this essay for most of your IB. It will get boring and tiresome at points. If it is something you are actually interested in, the whole thing becomes much more bearable. Interest also tends to produce better research, because you are happy to go down rabbit holes and you notice the small details that earn marks.' },

      { type: 'heading', text: 'The "looks good for university" trap' },
      { type: 'warning-box', text: 'A common mistake is picking a technical subject like Maths, Chemistry or Economics purely because you want to major in it and think it signals interest to admissions officers. It doesn\'t. Your subject choices already signal that. Admissions officers rarely care what you wrote your EE in, so choosing for that reason just makes your life harder.' },

      { type: 'heading', text: 'Play to your strengths' },
      { type: 'paragraph', text: 'Be realistic about what you are actually good at. Plenty of students pick the impressive subject and end up scoring lower than they would have in a subject they are naturally stronger in. If you consistently top English, doing your EE in a subject you find harder just to seem challenging usually backfires.' },

      { type: 'heading', text: 'Every EE is graded against the same criteria' },
      { type: 'paragraph', text: 'This is the part that reframes the whole question. All EEs are marked against the same criteria, whatever the subject. What students call "easy" and "hard" usually just comes down to how naturally a subject lets you show those criteria. The newer syllabus even dropped subject-specific advice in favour of subject groups, because the underlying skills are the same everywhere. Challenge an assumption, ask a real question, and actually find something out.' },

      { type: 'key-takeaway', items: [
        'Genuine interest is the biggest factor; it makes the process bearable and the research better',
        'Don\'t pick a subject just to "look good" for university, your choices already do that',
        'Be honest about your strengths; the impressive subject is not worth a lower score',
        'Every EE is marked against the same criteria, so consistency and curiosity beat prestige',
      ]},

      { type: 'cta-box', label: 'Free guide', text: 'Still deciding? Our subject guide breaks down what each EE subject actually demands so you can choose with your eyes open.', href: '/guides/ee-subjects-guide', buttonText: 'Read the subject guide' },
    ],
    faqItems: [
      { question: 'Should I pick an easy subject for my Extended Essay?', answer: 'Pick the subject you are genuinely interested in and naturally strong at. "Easy" and "hard" mostly reflect how naturally a subject lets you show the criteria, and every EE is marked against those same criteria regardless of subject.' },
      { question: 'Does my EE subject affect university applications?', answer: 'Very little. Admissions officers rarely care which subject you chose for your EE, because your overall subject choices already signal your interests. Picking a prestigious EE subject you are not strong in usually just lowers your score.' },
      { question: 'Is it harder to score well in a Language B Extended Essay?', answer: 'Not really. Every subject has its own challenges, and all EEs are graded against the same criteria. Strength and interest in the subject matter far more than the subject label.' },
    ],
    related: [
      { href: '/guides/ee-subjects-guide', title: 'Best IB Extended Essay Subjects', description: 'How to choose the right EE subject for your strengths.' },
      { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'Strong RQ patterns across 8 subjects.' },
          { href: "/blog/is-economics-ee-hard", title: "Is Economics One of the Hardest EEs?", description: "Difficulty, marking, and how to play it." },
      { href: "/blog/is-history-ee-hard", title: "Is a History EE Hard?", description: "Passion vs difficulty in subject choice." },
    ],
  },

  {
    slug: 'how-to-write-extended-essay-reflections',
    title: 'How to Write Extended Essay Reflections That Score Full Marks (Criterion E)',
    description: 'EE reflections are not a summary of what you did, they show your thinking. The "zoom out" method, why honesty beats perfectionism, and how to score Criterion E.',
    date: '2026-06-18',
    readMins: 6,
    content: [
      { type: 'paragraph', text: 'Reflections are one of the most misunderstood parts of the Extended Essay. Most students treat them as a summary of what they did, and lose marks for it. IB is looking at something else: your thinking and your decisions.' },

      { type: 'heading', text: 'What reflections actually assess' },
      { type: 'paragraph', text: 'By the time you write reflections you have usually finished your research and presented your work, so reflections are not there to repeat that. They are where you show engagement: how you thought, what you decided, and how your understanding grew. Criterion E rewards intellectual growth, not a tidy recap.' },

      { type: 'heading', text: 'The "zoom out" method' },
      { type: 'paragraph', text: 'The most useful thing you can do is zoom out and imagine explaining your project to someone who knows nothing about it. They would have questions. Why did you become interested in this? Why does the answer matter? Why did you choose these methods or sources over others? What assumptions did you make? How does what you found compare to what others have found? Did anything surprise you? What were the limitations? What would you do differently with more time? Answer those honestly and you are basically writing your reflections.' },

      { type: 'heading', text: 'Honesty beats perfectionism' },
      { type: 'tip-box', text: 'IB does not want perfectionism, it wants academic honesty. If you struggled with a method, found a flaw in your approach, changed direction halfway through, or realised an assumption was weaker than you thought, say so. A student who reflects honestly on real challenges scores much higher on engagement than one who pretends everything worked from day one.' },

      { type: 'paragraph', text: 'The strongest reflections show real intellectual development. A good test: if someone read only your three reflections, they should be able to follow how your thinking changed across the whole process. Before you write them, read the Engagement criterion in the official EE guide. IB is surprisingly clear about what it wants and most students overcomplicate it.' },

      { type: 'key-takeaway', items: [
        'Reflections show your thinking and decisions, not a summary of what you did',
        'Zoom out: why you cared, why these methods, what surprised you, what you would change',
        'Be honest about struggles and changes of direction, engagement rewards it',
        'If someone read only your reflections, they should see how your thinking grew',
        'Read the Engagement criterion in the EE guide, IB tells you what it wants',
      ]},

      { type: 'cta-box', label: 'Free guide', text: 'Want the full three-reflection structure and what each one should cover? Our RPPF guide walks through all six Criterion E marks.', href: '/guides/rppf-guide', buttonText: 'Read the RPPF guide' },
    ],
    faqItems: [
      { question: 'What should IB Extended Essay reflections include?', answer: 'Your thinking and decisions: why you chose your question and methods, what assumptions you made, what surprised you, what the limitations were, and how your understanding changed. Not a summary of tasks completed.' },
      { question: 'How do you score full marks on Criterion E?', answer: 'Show real intellectual growth and academic honesty. Reflect on struggles and changes of direction across all three reflections, so a reader can trace how your thinking developed. Read the Engagement criterion in the EE guide for exactly what IB rewards.' },
      { question: 'How long should each EE reflection be?', answer: 'The three reflections share a 500-word limit on the RPPF. Use the space to show decision-making and growth rather than describing what you did step by step.' },
    ],
    related: [
      { href: '/guides/rppf-guide', title: 'IB Extended Essay RPPF Guide', description: 'The three-reflection structure for all 6 Criterion E marks.' },
      { href: '/guides/ee-criteria-breakdown', title: 'EE Criteria Breakdown', description: 'How every mark across criteria A to E is awarded.' },
          { href: "/blog/can-you-change-your-ee-research-question", title: "Can You Change Your EE Research Question?", description: "When to pivot and how to tell your supervisor." },
      { href: "/blog/is-the-extended-essay-too-hard", title: "Is the EE Really That Hard?", description: "An honest take built on a real 32/34 essay." },
    ],
  },
  {
    slug: 'ib-ai-academic-integrity-meeting',
    title: 'Called Into an IB Academic Integrity Meeting for AI? Here\'s What to Expect',
    description: 'Flagged for AI on your IB essay and called to a meeting? What these interviews are actually for, how to prove the work is yours, and exactly what to bring.',
    date: '2026-06-18',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'You submitted your essay, maybe even graduated, and then got the email. The school flagged your work for AI and wants a meeting to "explain yourself." It is a stomach-drop moment. Take it seriously, but don\'t panic, and don\'t assume the worst before you have even sat down.' },

      { type: 'heading', text: 'What the meeting is actually for' },
      { type: 'paragraph', text: 'These meetings are usually about whether you can show ownership of your work, not the school announcing a decision it has already made. AI detectors on their own are not treated as proof, because they throw up false positives. That is why you are getting a chance to explain rather than just a verdict.' },

      { type: 'heading', text: 'What they tend to ask' },
      { type: 'paragraph', text: 'Expect questions about your process: your sources, your drafts, and how you built your argument from start to finish. The most important thing is being able to walk through how the essay actually came together, including the messy parts.' },

      { type: 'heading', text: 'What to bring' },
      { type: 'numbered-steps', items: [
        'Outlines and early drafts',
        'Annotations and research notes',
        'Supervisor feedback and meeting records',
        'Version history (Google Docs or Word version history is gold here)',
        'Anything that shows the essay changing over time',
      ]},
      { type: 'paragraph', text: 'Evidence that your essay developed is the strongest thing you can show. AI-written work has no history. Real work leaves a trail.' },

      { type: 'heading', text: 'The distinction that matters' },
      { type: 'paragraph', text: 'Schools and IB look closely at one thing: whether you used AI to think and brainstorm, or to generate the work you handed in. If you used it as a thinking partner, say that clearly and show where your own thinking took over.' },

      { type: 'tip-box', text: 'Take it seriously, gather your evidence, and stay calm. The meeting is a chance to show your process, not a decision that has already been made.' },

      { type: 'key-takeaway', items: [
        'The meeting is about proving ownership, not a verdict already decided',
        'AI detectors on their own are not proof, false positives happen',
        'Bring drafts, notes, supervisor feedback, and version history',
        'Be ready to explain how the essay developed from start to finish',
        'Know the difference between AI for thinking and AI generating your work',
      ]},

      { type: 'cta-box', label: 'Free guide', text: 'Want to use AI without ever ending up in this room? Our guide covers exactly where the line is.', href: '/guides/ee-ai-guide', buttonText: 'Read the AI guide' },
    ],
    faqItems: [
      { question: 'Does an AI detector flag mean I\'ll automatically fail?', answer: 'No. AI detectors are not treated as proof because they generate false positives. The meeting exists to let you show ownership of your work, which a flag alone cannot disprove.' },
      { question: 'What should I bring to an IB academic integrity meeting?', answer: 'Anything that shows your essay developing over time: outlines, early drafts, research notes, annotations, supervisor feedback, and document version history. Evidence of development is your strongest defence.' },
      { question: 'How serious is an IB AI investigation?', answer: 'It is serious and worth preparing for, but it is also your chance to explain. Schools usually focus on whether you can walk through your process and show you used AI to think rather than to write.' },
    ],
    related: [
      { href: '/blog/can-you-use-ai-for-extended-essay', title: 'Can You Use AI for Your Extended Essay?', description: 'Where AI is safe and where it gets you flagged.' },
      { href: '/guides/ee-ai-guide', title: 'How to Use AI for Your IB Extended Essay', description: 'The rules for staying on the right side of the line.' },
          { href: "/blog/can-you-use-ai-for-extended-essay", title: "Can You Use AI for Your EE?", description: "Where the line sits and how to stay on the right side of it." },
      { href: "/blog/ee-predicted-grade-and-bonus-points", title: "How EE and TOK Points Actually Work", description: "What a rough draft does (and does not) do to your predicted grade." },
    ],
  },

  {
    slug: 'is-the-extended-essay-too-hard',
    title: 'Is the IB Extended Essay Really That Hard? A 32/34 Student\'s Honest Take',
    description: 'The EE feels impossible because of the "just survive it" mindset. Why that mindset holds students back, and what separates the ones who breeze through.',
    date: '2026-06-18',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'A common take going around is that the Extended Essay is overkill. 4,000 words handed to high schoolers who have never touched academic material, far too self-directed, far too long. There is some truth in the difficulty. But the "just survive it" framing is the thing that holds most students back. I went in predicted a C and came out with a 32/34, so let me push back on it.' },

      { type: 'heading', text: 'The "survive it" trap' },
      { type: 'paragraph', text: 'The survive-it mentality is the default for IB in general, not just the EE. When you go in thinking "just survive," you put IB on a pedestal above you, like it is this huge impossible thing you have to get through. It isn\'t. The students who breeze through the EE are not smarter or working harder. They worked out what IB actually wants and gave it to them.' },

      { type: 'heading', text: 'You probably don\'t know what IB actually wants' },
      { type: 'paragraph', text: 'That sounds obvious, but it is the part most people skip. Most students think they know what IB wants and that they are delivering it, and you would be surprised how often that is not the case. They write essays they feel should score well. IB has a very specific rubric looking for very specific things, and once you work that out, the EE stops feeling impossible.' },

      { type: 'heading', text: 'IB doesn\'t reward what you think it rewards' },
      { type: 'paragraph', text: 'It does not reward more information, more citations, or deeper research the way students assume. It rewards making mistakes and learning from them, because you are a high schooler and not a Nobel laureate. Most students see the EE as so hard that they try to make their paper perfect, which leaves no room to be honest about the mistakes they will inevitably make. The point is not a flawless research paper. The point is hitting the actual learning objectives.' },

      { type: 'heading', text: 'Where the marks are actually hiding' },
      { type: 'paragraph', text: 'Being honest about your shortcomings in your evaluation and limitations sections is usually the easiest win you have. That is where the marks hide, and most students walk straight past them because they are busy trying to look smarter than they need to.' },

      { type: 'key-takeaway', items: [
        'The EE feels impossible mostly because of the "survive it" mindset',
        'The students who breeze through worked out the rubric, they are not smarter',
        'IB rewards learning from mistakes, not more citations or research',
        'Honesty in your evaluation and limitations is where easy marks hide',
        'You don\'t need to be a perfect academic, you need to hit the criteria',
      ]},

      { type: 'cta-box', label: 'Free module', text: 'The whole game is the mindset shift. Our free Mindset module breaks down exactly what examiners reward.', href: '/guides/ee-mindset', buttonText: 'Read the mindset guide' },
    ],
    faqItems: [
      { question: 'Is the Extended Essay too hard for high school students?', answer: 'It is challenging, but the difficulty is overstated by the "just survive it" mindset. The students who do well are not smarter, they understand the rubric and write to it. IB rewards learning from mistakes, not Nobel-level research.' },
      { question: 'Why does the Extended Essay feel impossible?', answer: 'Because most students treat it as something to endure and try to look perfect. Once you work out what the criteria actually reward, including honest evaluation of your limitations, it becomes far more manageable.' },
      { question: 'Do you have to be a great writer to score well on the EE?', answer: 'No. You have to hit the assessment criteria. Plenty of high scorers were predicted low grades, so understanding what IB rewards matters more than natural writing talent.' },
    ],
    related: [
      { href: '/guides/ee-mindset', title: 'The IB Extended Essay Mindset Shift', description: 'The mental model that separates a C from an A.' },
      { href: '/guides/ee-criteria-breakdown', title: 'EE Criteria Breakdown', description: 'Exactly how each mark is awarded.' },
          { href: "/blog/does-extended-essay-subject-matter", title: "Does Your EE Subject Matter?", description: "How subject choice actually affects your grade." },
      { href: "/blog/dp1-dp2-summer-ee", title: "Your DP1 to DP2 Summer EE Plan", description: "What to actually do over the break." },
    ],
  },

  {
    slug: 'ee-predicted-grade-and-bonus-points',
    title: 'Will a Bad EE Draft Ruin My Predicted Grade? How EE and TOK Points Actually Work',
    description: 'Worried a rough EE draft tanks your predicted grade for university? How predicted and final grades work, the EE/TOK bonus matrix, and why only an E fails.',
    date: '2026-06-18',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'You messed up your EE draft, predicted grades go to universities in October, and final submission is a few weeks after that. So will your predicted grade carry a C or D for the EE, and is your offer in danger? Here is how it works, from someone who went in predicted a C.' },

      { type: 'heading', text: 'Predicted and final grades come from two different people' },
      { type: 'paragraph', text: 'Your predicted grade is set by your supervisor based on what they have seen: your draft, your RPPF reflections, and your meetings. If your draft was rough, the prediction will probably reflect that. Your actual final EE grade is given by an external IB examiner who has never seen your draft and has no idea what your supervisor predicted. They grade fresh, off your final submission and RPPF only. That is how I went from a predicted C to a final A.' },

      { type: 'heading', text: 'The EE and TOK bonus matrix' },
      { type: 'paragraph', text: 'EE and TOK combine for up to 3 extra points on your total. A C in EE with an A in TOK still gives you 2 bonus points. A D in EE with an A in TOK also gives you 2. So strong TOK lifts your overall score even when the EE comes out weaker than you hoped.' },

      { type: 'heading', text: 'Only an E actually fails' },
      { type: 'warning-box', text: 'Only an E in the EE or TOK fails the diploma. A C or D still passes. So unless you are genuinely at risk of an E, your diploma is not in danger. The bonus points are what is in play.' },

      { type: 'heading', text: 'What to do in the final weeks' },
      { type: 'numbered-steps', items: [
        'Use your one full draft review, IB allows it, so take the feedback seriously',
        'Re-read against the actual criteria, especially Criterion B and Criterion C, where most marks are lost',
        'Take your RPPF seriously, it is 6 of 34 marks for 500 words',
      ]},

      { type: 'key-takeaway', items: [
        'Predicted grade comes from your supervisor, final grade from a fresh external examiner',
        'A strong final can score well above your predicted grade',
        'EE and TOK give up to 3 bonus points through the matrix',
        'Only an E in EE or TOK fails the diploma, a C or D still passes',
        'Your RPPF is 6 marks for 500 words, so don\'t leave it to the last minute',
      ]},

      { type: 'cta-box', label: 'Free guide', text: 'Those last marks usually come from the RPPF. Here is how to score all six.', href: '/guides/rppf-guide', buttonText: 'Read the RPPF guide' },
    ],
    faqItems: [
      { question: 'Does my EE draft affect my predicted grade?', answer: 'Yes. Your supervisor sets your predicted grade based on your draft, RPPF, and meetings. A rough draft usually lowers the prediction, but the prediction is not your final grade.' },
      { question: 'Can my final EE grade be higher than my predicted grade?', answer: 'Yes. An external examiner grades your final submission fresh, with no knowledge of your draft or prediction. A strong final can score well above a low predicted grade.' },
      { question: 'Does a C or D in the Extended Essay fail the IB diploma?', answer: 'No. Only an E in the EE or TOK fails the diploma. A C or D still passes, and the EE/TOK bonus matrix then adds up to 3 points to your total.' },
    ],
    related: [
      { href: '/guides/rppf-guide', title: 'IB Extended Essay RPPF Guide', description: 'Score all 6 Criterion E marks in 500 words.' },
      { href: '/guides/ee-criteria-breakdown', title: 'EE Criteria Breakdown', description: 'Where students lose the most marks.' },
          { href: "/blog/is-the-extended-essay-too-hard", title: "Is the EE Really That Hard?", description: "An honest take built on a real 32/34 essay." },
      { href: "/blog/how-to-write-extended-essay-reflections", title: "EE Reflections That Score Full Marks", description: "The RPPF is the easiest 6 marks you can bank." },
    ],
  },

  {
    slug: 'how-long-should-ee-outline-be',
    title: 'How Long Should Your Extended Essay Outline Be?',
    description: 'Your supervisor wants 1,500 words but you\'re stuck at 750? There\'s no IB-mandated outline length. Here\'s what an EE outline actually needs to cover.',
    date: '2026-06-18',
    readMins: 4,
    content: [
      { type: 'paragraph', text: 'Your supervisor said your EE outline should be 1,500 words, you are sitting at 750, and you cannot see how to get there without padding. Good news: the word count is not the thing that matters.' },

      { type: 'heading', text: 'There\'s no official outline length' },
      { type: 'paragraph', text: 'The IB does not mandate an outline length. The 1,500 your supervisor mentioned is their own preference for how they like outlines set out, not a rule. Outlines run anywhere from a page to several, depending on the supervisor.' },

      { type: 'heading', text: 'What an outline actually needs to cover' },
      { type: 'numbered-steps', items: [
        'Your research question',
        'Your argument structure, meaning what each section will do',
        'Your main sources',
        'Your methodology, if relevant',
      ]},
      { type: 'paragraph', text: 'If you can lay all of that out clearly in 750 words, you do not need 1,500.' },

      { type: 'heading', text: 'If you can\'t hit the target without padding' },
      { type: 'tip-box', text: 'That usually means you need to develop the substance, not write more words. Have you mapped out what each body section actually argues? Have you worked out your main sources and what each one gives you? If yes and you are still under, you are fine. If no, the gap is not a word-count problem. Your essay just is not planned yet.' },

      { type: 'paragraph', text: 'Either way, ask your supervisor what they actually want to see in the outline. "1,500 words" is a target, not a structure. Once you know the content they need, the word count stops mattering.' },

      { type: 'key-takeaway', items: [
        'There is no IB-mandated EE outline length',
        'A good outline covers your RQ, section-by-section argument, sources, and methodology',
        'If 750 words covers all that, it is enough',
        'Struggling to reach a target usually means the plan needs work, not padding',
        'Ask your supervisor what content they want, not just a number',
      ]},

      { type: 'cta-box', label: 'Free guide', text: 'Not sure what each section should argue? Our structure guide maps the whole essay to the criteria.', href: '/guides/extended-essay-structure', buttonText: 'Read the structure guide' },
    ],
    faqItems: [
      { question: 'Is there an official Extended Essay outline length?', answer: 'No. The IB does not mandate an outline length. Any number your supervisor gives is their own preference for how they like outlines set out.' },
      { question: 'My EE outline is shorter than my supervisor asked for, is that a problem?', answer: 'Not if it covers your RQ, your section-by-section argument, your main sources, and your methodology. If it covers all that clearly, length does not matter. If it cannot, the issue is planning, not word count.' },
      { question: 'What should an Extended Essay outline include?', answer: 'Your research question, the structure of your argument (what each section does), your main sources, and your methodology if relevant. Enough that someone could see how the whole essay will hang together.' },
    ],
    related: [
      { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'A section-by-section blueprint mapped to the criteria.' },
      { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'Strong RQ patterns across subjects.' },
          { href: "/blog/world-studies-ee-structure", title: "Structuring a World Studies EE", description: "How to hold two disciplines together." },
      { href: "/blog/how-to-get-better-at-ib-research", title: "Get Better at IB Research and Analysis", description: "The skills that quietly raise every grade." },
    ],
  },
  {
    slug: 'english-literature-ee-text-choice',
    title: 'How to Choose the Right Text for an English Literature Extended Essay',
    description: 'Picking between dense or "impressive" texts for your English Lit EE? The four things that actually matter, and why originality comes from your RQ, not the text.',
    date: '2026-06-18',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'Choosing your text is the first big decision in an English Literature EE, and most students get the instinct backwards. They reach for the densest, most ambitious, most obscure text they can find, hoping it makes them look smart. That is rarely what wins.' },

      { type: 'heading', text: 'The right text isn\'t the most ambitious one' },
      { type: 'paragraph', text: 'It is the one that is original to you, that you actually find interesting, and that connects to a strong, emotive global issue. Examiners reward students who clearly have something to say, not students who picked a difficult text to look impressive.' },

      { type: 'heading', text: 'Four things to actually weigh' },
      { type: 'numbered-steps', items: [
        'Density of literary techniques: how much is the text really doing at the level of language and structure?',
        'Existing critical scholarship: you need to cite for Criterion C, so a text nobody has analysed is much harder',
        'A narrow enough RQ that you can analyse it deeply in 4,000 words',
        'Your supervisor\'s enthusiasm: they write the report and read your essay through their own lens, so this matters more than students think',
      ]},

      { type: 'heading', text: 'Why "overdone" isn\'t the problem you think' },
      { type: 'paragraph', text: 'A popular text can feel overdone, but it is overdone in high school essays, not in EEs. In the Extended Essay, originality comes from your research question and your angle, not from how obscure the text is. A well-known novel with a strong personal arc and a current global-issue framing, like consumerism, mental health or identity, often beats a niche text you picked just to be different.' },

      { type: 'tip-box', text: 'Graphic novels are a valid choice, but they add visual analysis as a whole extra layer to manage inside 4,000 words. It is possible, just harder, so go in with your eyes open.' },

      { type: 'paragraph', text: 'Whatever you choose, write the RQ first. The text on its own is not the question. The RQ and text together are.' },

      { type: 'key-takeaway', items: [
        'Pick the text that is original to you and tied to a strong global issue, not the densest one',
        'Weigh technique density, available scholarship, RQ scope, and supervisor enthusiasm',
        'Originality lives in your RQ and angle, not in an obscure text',
        'Graphic novels add a visual-analysis layer that is harder to manage in 4,000 words',
        'Write the RQ first, the text on its own is not the question',
      ]},

      { type: 'cta-box', label: 'Free guide', text: 'Your RQ does the heavy lifting. See strong research question patterns across subjects.', href: '/guides/research-question-examples', buttonText: 'See RQ examples' },
    ],
    faqItems: [
      { question: 'Should I pick an obscure text for my English Literature EE?', answer: 'Not for the sake of it. Obscure texts often lack the critical scholarship you need to cite for Criterion C. Originality comes from your research question and angle, so a well-known text with a fresh RQ usually scores better.' },
      { question: 'Does the text matter more than the research question?', answer: 'No. The RQ and text together are what count, and the RQ is where originality lives. Write your research question first, because the text on its own is not the question.' },
      { question: 'Can I do my English EE on a graphic novel?', answer: 'Yes, but it adds visual analysis as an extra layer to manage within 4,000 words. It works if the text is rich and your RQ is narrow, but expect more to juggle than with a novel.' },
    ],
    related: [
      { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'Strong RQ patterns to build your text around.' },
      { href: '/guides/ee-analysis-vs-description', title: 'Analysis vs Description', description: 'How to analyse a text instead of summarising it.' },
          { href: "/blog/does-extended-essay-subject-matter", title: "Does Your EE Subject Matter?", description: "How subject choice actually affects your grade." },
      { href: "/blog/ee-topic-your-teacher-wont-allow", title: "Teacher Rejected Your EE Topic?", description: "How to rework it so it flies." },
    ],
  },

  {
    slug: 'can-you-change-your-ee-research-question',
    title: 'Can You Change Your EE Research Question? (And How to Tell Your Supervisor)',
    description: 'Behind on your EE and want to change your RQ, but your supervisor is intimidating? Why pivoting in DP1 is normal, and exactly how to frame the conversation.',
    date: '2026-06-18',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'You are in DP1, behind on your Extended Essay, you want to change your research question, and your supervisor terrifies you. First, breathe. Yes, you can change it. Plenty of students do, and in DP1 it is not too late.' },

      { type: 'heading', text: 'Pivoting is normal, and often smart' },
      { type: 'paragraph', text: 'If your gut says your current direction is harder than it needs to be, trust it. A classic example is a biology experiment on bacteria. School labs are genuinely bad for bacterial work. Contamination is constant and reliable results are a nightmare. Pivoting to something with a faster, more reliable cycle is not giving up, it is good judgement.' },

      { type: 'heading', text: 'How to handle a scary supervisor' },
      { type: 'paragraph', text: 'Frame the change as a roadblock in your research, not a personal failure. Supervisors get far more annoyed by students who tell them nothing than by students who say "here is what is not working, here is what I want to do instead, and here is why." Walk in with the change already half-thought-through. Tell them you already have background knowledge in the new topic so there is no backlog, and reassure them you will finish.' },

      { type: 'tip-box', text: 'Treat the conversation like a status update, not a confession. With intimidating supervisors, the move is to be rational and systematic, and less emotional.' },

      { type: 'heading', text: 'If you\'re pivoting an experiment, pick a fast cycle' },
      { type: 'paragraph', text: 'For science EEs that need to finish quickly, lean toward options that give reliable data fast and are well documented, so the methodology is easy to defend. Plant biology works well (enzyme activity, transpiration rates, germination conditions), as does human physiology (reaction time, heart-rate variability, breathing patterns), or observational studies. Draft the new RQ now and email your supervisor the proposed pivot. Do not spend days agonising.' },

      { type: 'key-takeaway', items: [
        'In DP1, changing your RQ is normal and usually still on time',
        'If your current direction is needlessly hard, like bacteria in a school lab, pivoting is smart',
        'Frame the change as a research roadblock, not a failure, and arrive with a plan',
        'Be rational and systematic with intimidating supervisors, treat it as a status update',
        'For science pivots, choose a fast, well-documented experimental cycle',
      ]},

      { type: 'cta-box', label: 'Free guide', text: 'Need a stronger RQ for your new direction? See worked examples across subjects.', href: '/guides/research-question-examples', buttonText: 'See RQ examples' },
    ],
    faqItems: [
      { question: 'Is it too late to change my EE research question?', answer: 'If you are in DP1, almost certainly not. Plenty of students change their RQ. Deadlines vary by school, so confirm with your coordinator, but pivoting early is common and often the right call.' },
      { question: 'How do I tell my supervisor I want to change my EE topic?', answer: 'Frame it as a roadblock with a solution, not a confession. Walk in with the new direction half-planned, explain why the old one is not working, show you already have background knowledge, and reassure them you will finish.' },
      { question: 'What\'s a good EE experiment that works in a school lab?', answer: 'Plant biology (enzyme activity, transpiration, germination), human physiology (reaction time, heart rate, breathing), or observational studies. They produce reliable data faster than bacterial work and are well documented, so the methodology is easy to defend.' },
    ],
    related: [
      { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'Strong RQ patterns for your new direction.' },
      { href: '/guides/ee-supervisor-tips', title: 'Working With Your EE Supervisor', description: 'How to use your meetings and protect your marks.' },
          { href: "/blog/too-late-to-change-ee-topic", title: "Too Late to Change Your EE Topic?", description: "What you can still fix, and what to keep." },
      { href: "/blog/how-long-should-ee-outline-be", title: "How Long Should Your EE Outline Be?", description: "The outline length that actually helps you write." },
    ],
  },

  {
    slug: 'ee-supervisor-not-expert-in-subject',
    title: 'What to Do If Your EE Supervisor Isn\'t an Expert in Your Subject',
    description: 'Stuck with a supervisor who doesn\'t know your subject? How to still get a strong draft: where to find the subject knowledge, and what your supervisor can help with.',
    date: '2026-06-18',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'It happens more than you would think. The Economics teacher is full, so you get a Geography teacher who does not know Economics. With a 4,000-word draft due, it feels like you are on your own. You are not. You just need to know where each piece of help comes from.' },

      { type: 'heading', text: 'For your draft, focus on the wordy parts' },
      { type: 'paragraph', text: 'Put your energy into the sections that carry the most words and marks: introduction, outline, analysis, limitations, and evaluation. A draft does not need to be perfect, but it does still matter, because your supervisor uses it for the RPPF and it shapes your predicted grade.' },

      { type: 'heading', text: 'Get the subject knowledge elsewhere' },
      { type: 'paragraph', text: 'Your course textbook and its online companion are your best friend here. For Economics, the Cambridge IB Economics textbook and the online guide that comes with your login answer most subject-specific questions. Pair that with the subject-specific section of the IB EE guide and you have replaced most of what a specialist supervisor would have told you.' },

      { type: 'heading', text: 'Use your supervisor for what they can do' },
      { type: 'paragraph', text: 'A non-specialist supervisor will naturally focus on formatting, structure, and presentation, and that is genuinely useful, because those are easy marks. If your formatting and citations are clean, you should be in at least B territory for the draft. The subject content is on you, and the textbook and guide do that heavy lifting.' },

      { type: 'tip-box', text: 'Citations are easy marks and a place non-specialist supervisors will look. A citation generator handles them cleanly so you can spend your time on the analysis.' },

      { type: 'key-takeaway', items: [
        'Spend draft time on the wordy sections: intro, outline, analysis, limitations, evaluation',
        'Your textbook, its online guide, and the subject section of the EE guide replace most specialist help',
        'Let your supervisor help with formatting and structure, those are easy marks',
        'Clean formatting and citations alone should put your draft in B territory',
        'The subject content is on you, and that is very doable with the right sources',
      ]},

      { type: 'cta-box', label: 'Free tool', text: 'Handle your citations cleanly so you can focus on the analysis. Our EE Dump builds your bibliography for you.', href: '/dashboard/dump', buttonText: 'Try EE Dump free' },
    ],
    faqItems: [
      { question: 'What if my EE supervisor doesn\'t know my subject?', answer: 'Get the subject knowledge from your course textbook, its online companion, and the subject-specific section of the IB EE guide. Use your supervisor for formatting and structure feedback, which are still easy marks.' },
      { question: 'Can I still get a good EE grade with a weak supervisor?', answer: 'Yes. The final grade comes from an external examiner, not your supervisor. If your formatting and citations are clean and your analysis hits the criteria, a non-specialist supervisor will not hold your grade back.' },
      { question: 'Where do I get subject-specific EE help?', answer: 'Your subject textbook and its online resources, the subject section of the IB EE guide, and high-scoring exemplars with examiner comments are the most reliable sources when your supervisor is not a specialist.' },
    ],
    related: [
      { href: '/guides/ee-formatting-guide', title: 'EE Formatting Guide', description: 'Lock in the easy presentation marks.' },
      { href: '/guides/ee-citations-mla', title: 'MLA Citations for the EE', description: 'Get citations right and avoid integrity flags.' },
          { href: "/blog/how-to-get-better-at-ib-research", title: "Get Better at IB Research and Analysis", description: "The skills that quietly raise every grade." },
      { href: "/blog/ee-topic-your-teacher-wont-allow", title: "Teacher Rejected Your EE Topic?", description: "How to rework it so it flies." },
    ],
  },

  {
    slug: 'is-economics-ee-hard',
    title: 'Is Economics One of the Hardest EE Subjects? (And Maths & Sciences Too)',
    description: 'Economics, Maths and the sciences get a reputation as the hardest EE subjects. Why that reputation exists, the two traps that cost marks, and how to avoid both.',
    date: '2026-06-18',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'Ask which EE subjects students fear most and the same three come up: the sciences, Mathematics, and Economics. They have one thing in common. They are technical. But technical and impossible are not the same thing, and the gap between them is where marks are won or lost.' },

      { type: 'heading', text: 'Why technical subjects feel hard' },
      { type: 'paragraph', text: 'Because the analysis is genuinely tricky, one of two things tends to happen. Students either get lost in the technical work and make mistakes, or they stop the moment they have presented the facts, calculations, or theory. Both cost you.' },

      { type: 'heading', text: 'The technical work isn\'t the end goal' },
      { type: 'paragraph', text: 'The calculations, the diagrams, the theory are all just tools. Once you have done the analysis, you still have to build an argument from it and connect it back to your research question. Because the material is heavy, it is easy to lose track of the point you are making, and losing the point is when you start losing marks. It is the same thing that happens in Paper 1, 2 and 3.' },

      { type: 'heading', text: 'Hard usually means "unclear on the criteria"' },
      { type: 'paragraph', text: 'A subject only becomes hard when students do not understand what the examiner is looking for. Get the technical aspects right, then make sure every piece of analysis ties back to your argument and your RQ. Know the criteria, hit them consistently, and a "hard" subject becomes very manageable.' },

      { type: 'tip-box', text: 'Read the subject-specific section of the IB EE guide for your subject. You do not need all 134 pages, just the part that tells you what an A looks like in your discipline.' },

      { type: 'key-takeaway', items: [
        'Sciences, Maths and Economics feel hard because they are technical, not because they are impossible',
        'Two traps: getting lost in the analysis, or stopping once the calculations are done',
        'Technical work is a tool, you still have to build an argument and tie it to your RQ',
        'Subjects feel "hard" mainly when students don\'t know what the examiner rewards',
        'Read the subject section of the EE guide to see what an A actually looks like',
      ]},

      { type: 'cta-box', label: 'Free workbooks', text: 'Our subject workbooks turn the EE criteria into a fill-in checklist, including the technical subjects.', href: '/dashboard/templates', buttonText: 'Get the workbooks' },
    ],
    faqItems: [
      { question: 'Is Economics the hardest EE subject?', answer: 'It has a reputation as one of the hardest because it is technical, but it is very doable. The key is not stopping at the calculations. You have to build an argument from your analysis and connect it back to your research question.' },
      { question: 'Why are Maths and science EEs considered hard?', answer: 'The analysis is genuinely tricky, so students either get lost in it or stop once they have presented the technical work. Both lose marks. The technical work is only a tool for building an argument.' },
      { question: 'How do I get an A in a technical-subject EE?', answer: 'Get the technical work right, then make every part of it serve your argument and tie back to your RQ. Learn what the examiner rewards by reading the subject-specific section of the EE guide and hitting those points consistently.' },
    ],
    related: [
      { href: '/guides/ee-economics', title: 'IB Economics EE Guide', description: 'Frameworks and A-grade structure for Economics.' },
      { href: '/guides/ee-criteria-breakdown', title: 'EE Criteria Breakdown', description: 'Exactly what examiners reward, criterion by criterion.' },
          { href: "/blog/economics-ee-forward-looking-policy", title: "An Economics EE on a Future Policy?", description: "How to analyse a policy that has not happened yet." },
      { href: "/blog/does-inline-math-count-ee-word-count", title: "Does Inline Math Count in the Word Count?", description: "The word-count rules, settled." },
    ],
  },

  {
    slug: 'too-late-to-change-ee-topic',
    title: 'It\'s "Too Late" to Change My EE Topic. What Now?',
    description: 'Regretting your EE topic but your supervisor says it\'s too late to switch? Why an ordinary topic can still become a strong essay, and how to get your momentum back.',
    date: '2026-06-18',
    readMins: 4,
    content: [
      { type: 'paragraph', text: 'You rushed your topic selection and first draft, now you can see the problems in your RQ and structure, you have spotted a better topic, and your mentor says it is too late to switch. So you are stuck fixing a draft you are not excited about, haunted by the idea that you could have done better. Here is the honest reframe.' },

      { type: 'heading', text: 'First, check whether it really is too late' },
      { type: 'paragraph', text: 'If you are still in DP1, it is at least worth a conversation, because schools differ a lot on deadlines and flexibility. If your advisor is firm, then the productive move is to make your current topic work rather than keep relitigating the switch.' },

      { type: 'heading', text: 'An ordinary topic is not a mediocre EE' },
      { type: 'paragraph', text: 'It is easy to compare your real topic to an idealised version of the new one. A topic that seems mediocre now does not lead to a mediocre essay. Some of the strongest EEs come from students who take an ordinary-looking topic and explore it really thoroughly. Often all it takes is a new angle or line of analysis to make the topic feel alive again.' },

      { type: 'heading', text: 'The EE is iterative by design' },
      { type: 'paragraph', text: 'The IB\'s own EE guide says your initial RQ will look quite different by the end of the process, and that is normal and expected. Most of the improvement happens during revision, not before the first draft. So do not beat yourself up over a rough draft one. That is the stage it is meant to be rough at.' },

      { type: 'key-takeaway', items: [
        'If you are in DP1, it is worth one honest conversation about switching',
        'If switching is off the table, commit to making your current topic work',
        'Ordinary topics explored thoroughly often beat "impressive" ones done shallowly',
        'A fresh angle or line of analysis can revive a topic you have gone cold on',
        'The EE is built through revision, so a rough first draft is normal',
      ]},

      { type: 'cta-box', label: 'Free workspace', text: 'A sharper RQ can revive a tired topic. Set up your free workspace and rework it.', href: '/dashboard/home', buttonText: 'Open your free workspace' },
    ],
    faqItems: [
      { question: 'Is it too late to change my EE topic?', answer: 'If you are in DP1, probably not, and it is worth asking, since schools vary on deadlines. If your advisor says it is firmly too late, the better use of energy is improving your current topic rather than switching.' },
      { question: 'Can a boring EE topic still get a good grade?', answer: 'Yes. Some of the strongest essays come from ordinary topics explored thoroughly. A fresh angle or line of analysis matters far more than how impressive the topic sounds.' },
      { question: 'Should I switch EE topics or fix my draft?', answer: 'Unless switching is genuinely viable for your deadlines, fixing your draft is usually the better move. The EE improves most through revision, and a rough first draft is completely normal.' },
    ],
    related: [
      { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'Find a sharper angle for your topic.' },
      { href: '/guides/ee-mindset', title: 'The EE Mindset Shift', description: 'Why revision, not perfection, makes an A.' },
          { href: "/blog/can-you-change-your-ee-research-question", title: "Can You Change Your EE Research Question?", description: "When to pivot and how to tell your supervisor." },
      { href: "/blog/dp1-dp2-summer-ee", title: "Your DP1 to DP2 Summer EE Plan", description: "What to actually do over the break." },
    ],
  },
  {
    slug: 'is-history-ee-hard',
    title: 'Is a History EE Hard? How to Choose a Subject You\'re Passionate About',
    description: 'Torn between the "easy" subject and the one you love for your EE? Why passion and depth beat the safe option, and how to handle having too much material.',
    date: '2026-06-18',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'Here is a dilemma a lot of pre-IB students face. The "easy" EE subject at your school is something like English B, but you are genuinely obsessed with a History topic, say WW1 medicine, and you have already got archives and academic papers piling up. Is History too hard to risk it?' },

      { type: 'heading', text: 'EEs grade you on depth' },
      { type: 'paragraph', text: 'English gets called the easier EE subject because it is easier for most people to go deep, whereas History, Maths and the sciences ask for a level of depth and interest most students do not want to put in. But if you already have the passion and the material, you are exactly the kind of student who will go deep, and depth is the main thing IB rewards. Most students miss that.' },

      { type: 'heading', text: 'Passion can\'t be replicated' },
      { type: 'paragraph', text: 'A friend who did a Maths EE, one of the harder choices, mastered it purely because he was passionate enough to go deep. The general advice is to pick the easier subject if you are indifferent. If you have real passion, follow it. You will actually enjoy the process instead of grinding through it.' },

      { type: 'heading', text: 'Too much material is a real problem' },
      { type: 'paragraph', text: 'If you have got hundreds of archive pages and a stack of papers, you have too much, and that is its own challenge. Use AI to help surface the two or three highest-leverage sources rather than drowning in volume. Ask yourself which archive or paper actually changes the initial assumption behind your RQ. Those one or two are the ones worth analysing deeply.' },

      { type: 'tip-box', text: 'Narrow the topic. "WW1 medicine" is too broad, so tighten it to where your sources concentrate, like European WW1 medicine. Primary sources are a big advantage most EE writers do not have, so lean into them.' },

      { type: 'key-takeaway', items: [
        'History rewards depth, so if you have passion and sources, you are in the right category',
        'Pick the easier subject only if you are indifferent, real passion is worth following',
        'Too much material is a real problem, find the 2 to 3 sources that change your RQ\'s assumptions',
        'Narrow a broad topic to where your sources concentrate',
        'Primary sources are a major advantage, use them',
      ]},

      { type: 'cta-box', label: 'Free guide', text: 'See how to frame a History RQ that goes deep instead of wide.', href: '/guides/ee-history', buttonText: 'Read the History guide' },
    ],
    faqItems: [
      { question: 'Is a History EE harder than an English EE?', answer: 'History asks for more depth and sustained interest, which is why it is seen as harder. But if you have real passion and good sources, that depth becomes a strength rather than a barrier, and depth is what IB rewards most.' },
      { question: 'Should I pick the easy EE subject or the one I\'m passionate about?', answer: 'If you are indifferent, pick the easier subject. If you have real passion and material for a harder one, follow it. Passion drives the depth that scores well and makes the process enjoyable rather than a grind.' },
      { question: 'I have too many sources for my EE, what do I do?', answer: 'Don\'t analyse everything. Find the two or three sources that actually change the assumptions behind your research question, and go deep on those. Depth beats volume in the EE.' },
    ],
    related: [
      { href: '/guides/ee-history', title: 'IB History EE Guide', description: 'How to frame a History RQ and engage with sources.' },
      { href: '/blog/does-extended-essay-subject-matter', title: 'Does Your EE Subject Matter?', description: 'Choosing a subject for the right reasons.' },
          { href: "/blog/is-economics-ee-hard", title: "Is Economics One of the Hardest EEs?", description: "Difficulty, marking, and how to play it." },
      { href: "/blog/english-literature-ee-text-choice", title: "Choosing a Text for an English Lit EE", description: "Pick a text with enough depth for 4,000 words." },
    ],
  },

  {
    slug: 'how-to-get-better-at-ib-research',
    title: 'How to Get Better at Research and Analysis for the IB',
    description: 'If research, topic-finding and analysis don\'t come naturally, you can still learn them. Why they\'re skills rather than talent, and the habits that build them.',
    date: '2026-06-18',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'The IB asks for research and analytical skills across your IAs, EE, TOK and English that no other school system really prepares you for. So if that stuff does not come naturally to you, how do people adjust? The encouraging answer is that these are learned skills, not personality traits.' },

      { type: 'heading', text: 'Research and analysis aren\'t innate talents' },
      { type: 'paragraph', text: 'They are skills with a process behind them. Plenty of strong researchers were not research people before the IB. Some of their lowest early grades were in English, and they were predicted a C in the EE, before those became their strongest areas. The more you write essays, research topics, get feedback and make mistakes, the more the process becomes second nature.' },

      { type: 'heading', text: 'Treat research as something separate from school' },
      { type: 'paragraph', text: 'If you build genuine curiosity about things and get into the habit of asking "why?" and "how do we know this?", research stops being an intimidating school task. It becomes a way of satisfying your own curiosity, which is exactly the mindset the EE rewards.' },

      { type: 'heading', text: 'What analysis and evaluation actually are' },
      { type: 'paragraph', text: 'Strip away the jargon. Analysis is making sense of information and finding patterns. Evaluation is weighing the strengths and weaknesses of those findings. Once you do both consistently, research stops feeling like randomly collecting sources and starts feeling like building an argument, which is the whole point.' },

      { type: 'key-takeaway', items: [
        'Research and analysis are learnable skills, not innate talent',
        'They improve through reps: writing, researching, feedback, and mistakes',
        'Build genuine curiosity, ask "why?" and "how do we know this?"',
        'Analysis is finding patterns, evaluation is weighing strengths and weaknesses',
        'Done consistently, research becomes building an argument, not collecting sources',
      ]},

      { type: 'cta-box', label: 'Free guide', text: 'The fastest skill gain is learning to analyse instead of describe. Here is how.', href: '/guides/ee-analysis-vs-description', buttonText: 'Analysis vs description' },
    ],
    faqItems: [
      { question: 'Can you actually learn research and analysis skills for the IB?', answer: 'Yes. They are skills with a process behind them, not innate talent. They improve through repetition, like writing, researching, getting feedback, and making mistakes, and most students underestimate how teachable they are.' },
      { question: 'What\'s the difference between analysis and evaluation?', answer: 'Analysis is making sense of information and finding patterns in it. Evaluation is weighing the strengths and weaknesses of those findings. Strong EEs do both consistently.' },
      { question: 'How do I get better at writing analytically?', answer: 'Build curiosity by always asking "why?" and "how do we know this?", then practise turning information into patterns and judgements rather than summaries. The more reps and feedback you get, the more automatic it becomes.' },
    ],
    related: [
      { href: '/guides/ee-analysis-vs-description', title: 'Analysis vs Description', description: 'The single biggest skill jump for EE marks.' },
      { href: '/guides/ee-academic-writing', title: 'Academic Writing for the EE', description: 'Sentence patterns that signal A-grade thinking.' },
          { href: "/blog/how-long-should-ee-outline-be", title: "How Long Should Your EE Outline Be?", description: "The outline length that actually helps you write." },
      { href: "/blog/ee-supervisor-not-expert-in-subject", title: "Supervisor Not an Expert in Your Subject?", description: "How to get what you need anyway." },
    ],
  },

  {
    slug: 'dp1-dp2-summer-ee',
    title: 'What to Do Over the Summer Between DP1 and DP2',
    description: 'Two months between DP1 and DP2, so what\'s actually worth doing? Why finishing your EE and IAs is the highest-ROI move, and why speed-running DP2 isn\'t.',
    date: '2026-06-18',
    readMins: 4,
    content: [
      { type: 'paragraph', text: 'You have got a two-month break between DP1 and DP2, everyone says to finish your IAs and EE, and you are wondering what else is worth doing. Study DP2 content in advance, or re-study DP1? Here is the highest-return way to spend it.' },

      { type: 'heading', text: 'Finishing your EE and IAs is the best use of the break' },
      { type: 'paragraph', text: 'This is almost certainly the single highest-return thing you can do. Future you, buried in DP2 deadlines, will be very grateful for every section you got done over summer.' },

      { type: 'heading', text: 'Don\'t try to speed-run DP2 content' },
      { type: 'paragraph', text: 'Spending the whole break trying to learn next year\'s syllabus usually is not worth it. You are better off strengthening weak DP1 areas and building good systems for DP2 than racing ahead into content you will be taught properly anyway.' },

      { type: 'heading', text: 'A summer list that actually helps' },
      { type: 'numbered-steps', items: [
        'Finish as much of your EE and IAs as possible',
        'Organise your notes properly',
        'Work out your weak subjects and topics',
        'Build a revision system you will actually stick to',
        'Read examiner reports and markschemes for your subjects',
      ]},
      { type: 'paragraph', text: 'Also start treating research as a skill. The EE is one of the best chances you will get to learn how to research properly, and the sooner you are comfortable finding and evaluating sources, the easier the whole of DP2 becomes.' },

      { type: 'tip-box', text: 'And actually enjoy your summer. Plenty of students burn themselves out before DP2 even starts, so rest is part of the plan, not a betrayal of it.' },

      { type: 'key-takeaway', items: [
        'Finishing EE and IAs is the highest-return summer task',
        'Don\'t speed-run DP2 content, strengthen weak DP1 areas instead',
        'Organise notes, spot weak topics, and build a revision system you will keep',
        'Read examiner reports and markschemes to learn what is rewarded',
        'Rest properly, burnout before DP2 helps no one',
      ]},

      { type: 'cta-box', label: 'Free workspace', text: 'Get a head start on the EE over summer with 5 free modules, workbooks, and a real 32/34 example.', href: '/dashboard/home', buttonText: 'Open your free workspace' },
    ],
    faqItems: [
      { question: 'What should I do over the DP1 to DP2 summer?', answer: 'Prioritise finishing your EE and IAs, since it is the highest-return work you can do. Then organise notes, work out weak topics, build a revision system, and read examiner reports. And rest, so you do not burn out before DP2.' },
      { question: 'Should I study DP2 content in advance over the summer?', answer: 'Usually not worth the whole break. You will be taught it properly in DP2. Strengthening weak DP1 areas and building good study systems pays off more than racing ahead.' },
      { question: 'Is it worth finishing the EE over the summer?', answer: 'Yes, it is one of the best uses of the time. Getting the EE substantially done before DP2 removes a major source of stress during your most demanding year.' },
    ],
    related: [
      { href: '/guides/ee-planning-timeline', title: 'EE Timeline & Planning', description: 'Map the whole EE across the weeks you have.' },
      { href: '/guides/ee-dump-method', title: 'The EE Dump Research Method', description: 'Build your source base efficiently.' },
          { href: "/blog/is-the-extended-essay-too-hard", title: "Is the EE Really That Hard?", description: "An honest take built on a real 32/34 essay." },
      { href: "/blog/how-long-should-ee-outline-be", title: "How Long Should Your EE Outline Be?", description: "The outline length that actually helps you write." },
    ],
  },

  {
    slug: 'how-to-get-an-a-global-politics-ee',
    title: 'How to Get an A in a Global Politics Extended Essay',
    description: 'Starting a Global Politics EE and worried your outline isn\'t "A material"? The topic, research depth, and RQ habits behind a top-band EE, from the top scorer in their grade.',
    date: '2026-06-18',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'You are starting a Global Politics EE on a topic you are passionate about, and you are already worried your outline is not "A material." Here is some reassurance from someone who had no idea what their EE would become at the start and ended up the highest scorer in their grade. The outline is not the essay.' },

      { type: 'heading', text: 'Choose a topic you genuinely care about' },
      { type: 'paragraph', text: 'A lot of students pick topics based on what they think will score well. The best topic is usually the one you will still be excited to read, research and write about months from now. Execution matters far more than picking something that sounds impressive.' },

      { type: 'heading', text: 'Don\'t judge your outline, or force a conclusion, too early' },
      { type: 'paragraph', text: 'Your outline is only part of the story, so do not panic if it does not look like A material yet. And do not try to force a conclusion before you have done the research. One of the biggest surprises for most students is how much their argument changes as they learn more, and that is a good sign.' },

      { type: 'heading', text: 'Be thorough with your research' },
      { type: 'paragraph', text: 'Go well past the first few articles that show up online. Academic journals, professors\' work, dissertations, niche publications, and opposing perspectives are where the depth is. The deeper you go, the more likely you are to find something genuinely interesting instead of repeating what everyone else already says.' },

      { type: 'heading', text: 'A research question is a real question' },
      { type: 'paragraph', text: 'So many students get caught up in making the RQ sound academic that they forget the whole point is to investigate something they do not yet know the answer to. Often you cannot write the best version of your RQ until you are 20 to 30% into your research, because that is when the genuinely interesting questions show up.' },

      { type: 'tip-box', text: 'Ask your coordinator for deadlines early, plan your time, and use your supervisor feedback. The EE is built through revision, so your first outline does not need to be amazing.' },

      { type: 'key-takeaway', items: [
        'Pick a topic you will still care about in months, execution beats impressiveness',
        'Don\'t judge your early outline or force a conclusion before researching',
        'Research deep: journals, dissertations, niche sources, opposing views',
        'A real RQ investigates something you do not yet know, and it sharpens 20 to 30% into research',
        'The EE is built through revision, not a perfect day-one outline',
      ]},

      { type: 'cta-box', label: 'Free guide', text: 'See what separates an A-grade EE from a B, step by step.', href: '/guides/how-to-get-an-a-in-extended-essay', buttonText: 'How to get an A' },
    ],
    faqItems: [
      { question: 'How do I get an A in a Global Politics EE?', answer: 'Choose a topic you genuinely care about, research far past the first few articles, and treat your RQ as a real question you are investigating. Let your argument change through the research, and refine through revision rather than aiming for a perfect first outline.' },
      { question: 'What makes an A-grade Extended Essay?', answer: 'Real depth and a genuine investigation, not an impressive-sounding topic. Thorough research that uncovers something interesting, an RQ that is actually a question, and an argument refined through revision.' },
      { question: 'When should I finalise my EE research question?', answer: 'Often not until you are 20 to 30% into your research. That is when the genuinely interesting questions surface. Forcing a polished RQ before researching usually leads to a weaker one.' },
    ],
    related: [
      { href: '/guides/how-to-get-an-a-in-extended-essay', title: 'How to Get an A in the Extended Essay', description: 'The habits that separate A-grade essays from B.' },
      { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'Strong RQ patterns to model yours on.' },
          { href: "/blog/world-studies-ee-structure", title: "Structuring a World Studies EE", description: "How to hold two disciplines together." },
      { href: "/blog/how-to-write-extended-essay-reflections", title: "EE Reflections That Score Full Marks", description: "The RPPF is the easiest 6 marks you can bank." },
    ],
  },
  {
    slug: 'world-studies-ee-structure',
    title: 'How to Structure a World Studies (Interdisciplinary) Extended Essay',
    description: 'Doing a World Studies EE across two subjects? Why weaving them into one argument beats separate sections, and a story-driven way to structure the flow.',
    date: '2026-06-23',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'World Studies EEs sound great until you sit down to structure one. Say you are combining Business Management and Global Politics. Do you write a Global Politics section and then a separate Business section, or do you weave them together? Almost everyone overthinks this.' },

      { type: 'heading', text: 'Use one subject as home, the other to analyse' },
      { type: 'paragraph', text: 'IB suggests treating one subject as the home base and using the other as the analytical lens. So you are not building a "Global Politics half" and a "Business half" bolted together. One subject sets up the situation, the other does the analysis.' },

      { type: 'heading', text: 'Write it like a story, not two sections' },
      { type: 'paragraph', text: 'The cleanest way to structure it is to write it as a story that walks through your process, and let one subject flow into the other. For example: tension in the Middle East escalates (global politics), a country closes a key shipping strait (a politically powerful move with huge market effects), and then you ask how that hits local businesses. The main pressure for businesses doing international trade is the exchange rate, so you analyse a firm\'s revenue before and after using a quantitative business tool, then look at its inventory turnover. Two subjects, but they flow into one another and it reads as one argument.' },

      { type: 'heading', text: 'Why this scores better' },
      { type: 'paragraph', text: 'Examiners want a clear line of argument, and the whole point of an interdisciplinary EE is genuine integration. Two stapled-together sections read like two mini-essays. A woven argument shows you actually used both lenses to answer one question.' },

      { type: 'key-takeaway', items: [
        'Pick one subject as the home base and use the other to analyse',
        'Do not split the essay into a separate section per subject',
        'Structure it as a story that flows from situation to analysis',
        'A single woven argument scores better than two stitched-together halves',
      ]},

      { type: 'cta-box', label: 'Free', text: 'Want to see how this looks in a real essay? Read a full 32/34 EE, first 17 pages free.', href: '/dashboard/sample-ee', buttonText: 'Read the example essay' },
    ],
    faqItems: [
      { question: 'Should I separate the two subjects in a World Studies EE?', answer: 'No. Treat one subject as the home base and use the other to analyse. Weave them into a single line of argument rather than writing a separate section for each, which reads like two essays stapled together.' },
      { question: 'How does an interdisciplinary (World Studies) EE work?', answer: 'You investigate one issue through two DP subjects that genuinely need each other. One acts as the home base, the other provides the analytical lens, and the marks come from integrating them into one argument.' },
      { question: 'Which subject should be the home subject in a World Studies EE?', answer: 'Usually the one that frames the issue and carries most of your sources. The second subject then supplies the specific analytical tools (for example, business or economic methods applied to a political situation).' },
    ],
    related: [
      { href: '/blog/how-to-get-an-a-global-politics-ee', title: 'How to Get an A in a Global Politics EE', description: 'Topic, research and RQ habits for a top-band EE.' },
      { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'Map your sections to the criteria.' },
          { href: "/blog/how-to-get-an-a-global-politics-ee", title: "Get an A in a Global Politics EE", description: "Structure and sources that score." },
      { href: "/blog/does-inline-math-count-ee-word-count", title: "Does Inline Math Count in the Word Count?", description: "The word-count rules, settled." },
    ],
  },
  {
    slug: 'ee-topic-your-teacher-wont-allow',
    title: 'Your Teacher Says You Can\'t Do That EE Topic. Here\'s How to Make It Work',
    description: 'Want to write your EE on a topic your teacher is blocking, like a novel under Psychology? How to reframe it so it fits the subject rules and keeps your topic.',
    date: '2026-06-23',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'You have a topic you actually care about, say analysing how the Twilight saga frames an unhealthy relationship as romance, and your teacher says you cannot do it under Psychology because you would be analysing fiction instead of research. Before you give up the topic, reframe it.' },

      { type: 'heading', text: 'Know the subject\'s hard rules first' },
      { type: 'paragraph', text: 'For a Psychology EE specifically, three rules matter:' },
      { type: 'numbered-steps', items: [
        'It must be based only on secondary sources',
        'The focus must be psychological theories, concepts, and peer-reviewed research',
        'It must be about real-world people and phenomena, not fictional characters, even if the fiction is based on real things',
      ]},

      { type: 'heading', text: 'Make the topic a case study, not the star' },
      { type: 'paragraph', text: 'The way to keep Twilight is to stop treating it as the source. Ground your essay in published research, for example media\'s effect on adolescent beliefs about love, and use the text as a case study inside that framework. Audience reactions, psychological theories, and empirical evidence carry the analysis. Think of the text as a strong supporting character, not the star of the show.' },

      { type: 'heading', text: 'Or switch the pathway' },
      { type: 'paragraph', text: 'A topic your teacher blocks in one subject often fits better as an interdisciplinary EE. Twilight has far more scope through Psychology plus Digital Society, where you can dig into its media and cultural impact. The topic survives, the framing changes.' },

      { type: 'key-takeaway', items: [
        'Learn the subject\'s rules before fighting for the topic',
        'For Psychology: secondary sources, real-world focus, peer-reviewed theory',
        'Use the text as a case study inside a research framework, not the main source',
        'A blocked topic often fits an interdisciplinary pathway instead',
      ]},

      { type: 'cta-box', label: 'Free', text: 'Not sure what each subject actually requires? Our subject workbooks break it down.', href: '/dashboard/templates', buttonText: 'Get the workbooks' },
    ],
    faqItems: [
      { question: 'Can I write a Psychology EE about a novel or film?', answer: 'Only if you treat it as a case study inside research-based analysis. A Psychology EE must use secondary sources and focus on psychological theory and peer-reviewed research about real-world phenomena, not literary analysis of fictional characters.' },
      { question: 'What are the rules for a Psychology EE?', answer: 'It must be based on secondary sources, focus on psychological theories and peer-reviewed research, and study real-world people and phenomena rather than fictional ones.' },
      { question: 'My teacher rejected my EE topic. What can I do?', answer: 'Reframe it to fit the subject rules (use it as a case study inside published research), or move it to an interdisciplinary pathway where it fits better. The topic can usually survive a change of framing.' },
    ],
    related: [
      { href: '/blog/does-extended-essay-subject-matter', title: 'Does Your EE Subject Matter?', description: 'Choosing the right subject for your topic.' },
      { href: '/guides/ee-subjects-guide', title: 'Best IB EE Subjects', description: 'What each subject rewards.' },
          { href: "/blog/biology-ee-ethics", title: "Biology EE Ethics Rules", description: "What you can and cannot experiment on." },
      { href: "/blog/can-you-change-your-ee-research-question", title: "Can You Change Your EE Research Question?", description: "When to pivot and how to tell your supervisor." },
    ],
  },
  {
    slug: 'biology-ee-ethics',
    title: 'IB Biology EE Ethics: What You Can and Can\'t Experiment On',
    description: 'Planning a Biology EE with live organisms? The IB ethics rules, why a risk assessment matters, when to use lab-grown alternatives, and the replicability trap.',
    date: '2026-06-23',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'A Biology EE with living organisms is one of the most rewarding routes, but it comes with ethics rules that trip students up. If your experiment stresses or harms an organism, you need to be careful, even with the best intentions.' },

      { type: 'heading', text: 'A permit helps, but you still need a risk assessment' },
      { type: 'paragraph', text: 'If you have a collection permit from local authorities, that satisfies a key IB requirement. But the bigger thing examiners look for is a risk assessment that shows why the work had to be done this way, and why you could not use a less harmful alternative. Document your permits and show clearly that the research is legal and ethical.' },

      { type: 'heading', text: 'The safest route is usually lab-grown' },
      { type: 'paragraph', text: 'If there is a lab-grown or cultured alternative, use it. Researchers run these tests on lab-grown specimens all the time, and IB does not restrict that. Stressing a wild organism or ecosystem, permit or not, is far harder to justify than working with material that was grown for the purpose.' },

      { type: 'heading', text: 'Do not forget replicability' },
      { type: 'paragraph', text: 'IB cares a lot that a science experiment is controllable and easily replicable. A one-off manipulation of a wild organism often is not, which can quietly cost you marks even if the ethics check out.' },

      { type: 'key-takeaway', items: [
        'Document everything: permits, sourcing, and approvals',
        'Write a risk assessment that justifies your method and rules out gentler alternatives',
        'Prefer lab-grown or cultured material where it exists',
        'Keep the experiment scientific, controllable, and easily replicable',
        'Get proper supervision, ideally a university lab contact for advanced work',
      ]},

      { type: 'cta-box', label: 'Free', text: 'See how to choose and justify a research method that holds up. Read the research methods guide.', href: '/guides/ee-research-methods', buttonText: 'Read the research guide' },
    ],
    faqItems: [
      { question: 'Can I experiment on animals for my IB Biology EE?', answer: 'Only within strict limits. IB restricts experiments that cause unnecessary stress or harm to animals. You need a documented risk assessment, and you should use lab-grown or alternative material wherever possible.' },
      { question: 'Does a collection permit make my Biology EE ethical?', answer: 'A permit satisfies one requirement, but not the whole picture. You still need a risk assessment showing the work was necessary, that gentler alternatives were considered, and that the experiment is replicable.' },
      { question: 'What does IB require for a science EE experiment?', answer: 'It must be scientific, controllable, and easily replicable, properly supervised, and ethically justified. Documentation of permits and a clear risk assessment are essential when living organisms are involved.' },
    ],
    related: [
      { href: '/guides/ee-research-methods', title: 'EE Research Methods Guide', description: 'Choosing and justifying your method.' },
      { href: '/guides/ee-biology', title: 'IB Biology EE Guide', description: 'Experiment design and analysis for Biology.' },
          { href: "/blog/ee-topic-your-teacher-wont-allow", title: "Teacher Rejected Your EE Topic?", description: "How to rework it so it flies." },
      { href: "/blog/ee-supervisor-not-expert-in-subject", title: "Supervisor Not an Expert in Your Subject?", description: "How to get what you need anyway." },
    ],
  },
  {
    slug: 'does-inline-math-count-ee-word-count',
    title: 'Does Inline Math Count Toward Your EE Word Count?',
    description: 'Equations are excluded from the EE word count, but what about the words around them? How inline math is counted, with a worked example.',
    date: '2026-06-23',
    readMins: 3,
    content: [
      { type: 'paragraph', text: 'If your EE is math-heavy, you have probably wondered whether all that inline math eats into your 4,000 words. Equation lines are clearly excluded, but what about the equations sitting inside your sentences?' },

      { type: 'heading', text: 'Equations don\'t count. The words do.' },
      { type: 'paragraph', text: 'A formula or equation itself is not counted, even when it sits inline in a sentence. The words you write around it are.' },

      { type: 'heading', text: 'A worked example' },
      { type: 'paragraph', text: 'Take the sentence: "The area of a circle is given by the formula A = πr²." The words "The area of a circle is given by the formula" count toward your limit. The "A = πr²" does not. So that sentence costs you about 7 words, not 10.' },
      { type: 'paragraph', text: 'In other words, inline math is not parsed into separate words. Only your prose counts, and standalone equation lines are excluded entirely.' },

      { type: 'key-takeaway', items: [
        'Equations and formulas are not counted, inline or on their own line',
        'The words you write to explain the math do count',
        'Inline symbols like A = πr² are excluded from the total',
        'Write the explanation you need; the math itself is free',
      ]},

      { type: 'cta-box', label: 'Free', text: 'Want the full rules on what counts and what does not? Read the word count guide.', href: '/guides/ee-word-count', buttonText: 'Read the word count guide' },
    ],
    faqItems: [
      { question: 'Do equations count toward the EE word count?', answer: 'No. Formulas and equations are excluded from the word count, whether they sit on their own line or inline within a sentence.' },
      { question: 'Does inline math count as words in the EE?', answer: 'The math symbols do not count, but the words around them do. "The area of a circle is given by the formula A = πr²" counts the words, not the equation.' },
      { question: 'What is excluded from the EE word count?', answer: 'Equations, formulas, calculations, diagrams, tables, the title page, contents page, citations and references, and the bibliography. Your body prose is what counts.' },
    ],
    related: [
      { href: '/guides/ee-word-count', title: 'EE Word Count & Section Balance', description: 'What counts toward 4,000 and what does not.' },
      { href: '/guides/ee-formatting-guide', title: 'EE Formatting Guide', description: 'The free presentation marks.' },
          { href: "/blog/is-economics-ee-hard", title: "Is Economics One of the Hardest EEs?", description: "Difficulty, marking, and how to play it." },
      { href: "/blog/how-long-should-ee-outline-be", title: "How Long Should Your EE Outline Be?", description: "The outline length that actually helps you write." },
    ],
  },
  {
    slug: 'economics-ee-forward-looking-policy',
    title: 'Can Your Economics EE Be About a Policy That Hasn\'t Happened Yet?',
    description: 'Want an Economics EE on a proposed or deferred policy with little public data? Why forward-looking topics can work, and how to frame the RQ like IB\'s own sample.',
    date: '2026-06-23',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'Most Economics EEs evaluate a policy that already happened. But what if your topic is a scheme that was only piloted, or proposed and then deferred, so there is barely any public data? A forward-looking policy topic can absolutely work, and it can mirror IB\'s own sample research question.' },

      { type: 'heading', text: 'It can follow the shape of IB\'s sample RQ' },
      { type: 'paragraph', text: 'IB\'s sample Economics RQ analyses how valid an economic argument is in light of current research. A forward-looking policy analysis fits the same shape: you take a core theory, anchor it to a specific place, and test it against the evidence you can gather.' },

      { type: 'heading', text: 'The three components to check' },
      { type: 'numbered-steps', items: [
        'A core economic theory (for a congestion charge, that is negative externalities)',
        'A specific geographic place (for example, Hong Kong)',
        'Empirical research on the specific scheme (pilot data, government reports, and your own primary surveys where public data is thin)',
      ]},

      { type: 'heading', text: 'Add a comparison to push it further' },
      { type: 'paragraph', text: 'IB\'s sample does not just present one argument. It compares an argument against current research and then runs its own analysis to reach a conclusion. You can do the same: instead of only presenting your argument, weigh it against your own primary data. Think "argument A versus my own study, therefore this conclusion." That comparative move is what lifts it.' },

      { type: 'key-takeaway', items: [
        'Forward-looking and proposed-policy topics are valid for an Economics EE',
        'Anchor it in a core theory, a specific place, and real empirical research',
        'Primary surveys are fine where public data is thin',
        'Compare your argument against your own study rather than just presenting it',
      ]},

      { type: 'cta-box', label: 'Free guide', text: 'See strong Economics structure and frameworks for a top-band essay.', href: '/guides/ee-economics', buttonText: 'Read the Economics guide' },
    ],
    faqItems: [
      { question: 'Can an Economics EE be about a proposed or future policy?', answer: 'Yes. Forward-looking topics work as long as you ground them in a core economic theory, a specific place, and real evidence, including your own primary data where public figures are limited.' },
      { question: 'Is primary survey data okay for an Economics EE?', answer: 'Yes, especially when public data on the policy is thin. Surveys let you simulate or estimate effects, and combining them with secondary sources strengthens your analysis.' },
      { question: 'How should I structure an Economics EE research question?', answer: 'Mirror IB\'s sample: pair a core theory with a specific place and test it against evidence, then compare your argument with your own study to reach a conclusion.' },
    ],
    related: [
      { href: '/guides/ee-economics', title: 'IB Economics EE Guide', description: 'Frameworks and A-grade structure.' },
      { href: '/blog/is-economics-ee-hard', title: 'Is Economics One of the Hardest EE Subjects?', description: 'The traps that cost marks, and how to avoid them.' },
          { href: "/blog/is-economics-ee-hard", title: "Is Economics One of the Hardest EEs?", description: "Difficulty, marking, and how to play it." },
      { href: "/blog/how-to-get-an-a-global-politics-ee", title: "Get an A in a Global Politics EE", description: "Structure and sources that score." },
    ],
  },
]

export function getBlogPost(slug) {
  return BLOG_POSTS.find(p => p.slug === slug)
}
