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
  {
    slug: 'ib-ai-academic-integrity-meeting',
    title: 'Called Into an IB Academic Integrity Meeting for AI? Here\'s What to Expect',
    description: 'Flagged for AI on your IB essay and called to a meeting? What these interviews are actually for, how to prove the work is yours, and exactly what to bring.',
    date: '2026-06-18',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'You submitted your essay, maybe even graduated, and then got the email: the school flagged your work for AI and wants a meeting to "explain yourself." It\'s a stomach-drop moment. Take it seriously — but don\'t panic, and don\'t assume the worst before you\'ve even sat down.' },

      { type: 'heading', text: 'What the meeting is actually for' },
      { type: 'paragraph', text: 'These meetings are usually about determining whether you can demonstrate ownership of your work — not the school announcing a conclusion it\'s already reached. AI detectors on their own aren\'t treated as definitive proof, precisely because they produce false positives. That\'s why you\'re being given the chance to explain rather than just handed a verdict.' },

      { type: 'heading', text: 'What they tend to ask' },
      { type: 'paragraph', text: 'Expect questions about your process: your sources, your drafts, and how you developed your argument from start to finish. The single most important thing you can do is be able to walk through how the essay actually came together — the messy, human path from first idea to final draft.' },

      { type: 'heading', text: 'What to bring' },
      { type: 'numbered-steps', items: [
        'Outlines and early drafts',
        'Annotations and research notes',
        'Supervisor feedback and meeting records',
        'Version history (Google Docs / Word version history is gold here)',
        'Anything that shows the essay evolving over time',
      ]},
      { type: 'paragraph', text: 'Evidence of development is the most powerful thing you can show. AI-written work has no history; real work has a trail.' },

      { type: 'heading', text: 'The distinction that matters' },
      { type: 'paragraph', text: 'Understand the line schools and the IB look at: using AI to think differently or brainstorm is very different from having AI generate the work you submitted. If you used it as a thinking partner, say so clearly and show where your own thinking took over.' },

      { type: 'tip-box', text: 'Take it seriously, gather your evidence, and stay calm. A meeting is an opportunity to demonstrate your process — not a foregone conclusion.' },

      { type: 'key-takeaway', items: [
        'The meeting is about proving ownership, not a verdict already decided',
        'AI detectors alone aren\'t definitive — false positives happen',
        'Bring drafts, notes, supervisor feedback, and version history',
        'Be ready to explain how the essay developed from start to finish',
        'Know the difference between AI for thinking vs AI generating your work',
      ]},

      { type: 'cta-box', label: 'Free guide', text: 'Want to use AI without ever ending up in this room? Our guide covers exactly where the line is.', href: '/guides/ee-ai-guide', buttonText: 'Read the AI guide' },
    ],
    faqItems: [
      { question: 'Does an AI detector flag mean I\'ll automatically fail?', answer: 'No. AI detectors aren\'t treated as definitive proof because they generate false positives. The meeting exists to let you demonstrate ownership of your work, which a flag alone cannot disprove.' },
      { question: 'What should I bring to an IB academic integrity meeting?', answer: 'Anything that shows your essay developing over time: outlines, early drafts, research notes, annotations, supervisor feedback, and document version history. Evidence of development is your strongest defence.' },
      { question: 'How serious is an IB AI investigation?', answer: 'It\'s serious and worth careful preparation, but it\'s also your chance to explain. Schools generally focus on whether you can walk through your process and distinguish using AI to think from using it to write.' },
    ],
    related: [
      { href: '/blog/can-you-use-ai-for-extended-essay', title: 'Can You Use AI for Your Extended Essay?', description: 'Where AI is safe and where it gets you flagged.' },
      { href: '/guides/ee-ai-guide', title: 'How to Use AI for Your IB Extended Essay', description: 'The golden rules for staying on the right side of the line.' },
    ],
  },

  {
    slug: 'is-the-extended-essay-too-hard',
    title: 'Is the IB Extended Essay Really That Hard? A 32/34 Student\'s Honest Take',
    description: 'The EE feels impossible because of the "just survive it" mindset. Why that mindset holds students back, and what actually separates the ones who breeze through.',
    date: '2026-06-18',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'A common take floating around is that the Extended Essay is overkill: 4,000 words pushed onto high schoolers who\'ve never touched academic material, far too self-directed, far too long. There\'s truth in the difficulty — but the "just survive it" framing is the exact thing that holds most students back. I went into mine predicted a C and came out with a 32/34, so respectfully, let me push back.' },

      { type: 'heading', text: 'The "survive-it" trap' },
      { type: 'paragraph', text: 'The survive-it mentality is the default mindset for IB as a whole, not just the EE. When you go in thinking "just survive," you put IB on a pedestal above you — this massive, impossible thing you have to endure. It isn\'t. The students who sail through the EE aren\'t smarter or working harder. They\'ve figured out what IB actually wants and they give it to them.' },

      { type: 'heading', text: 'You probably don\'t know what IB actually wants' },
      { type: 'paragraph', text: 'That sounds obvious, but it\'s the part most people skip. Most students think they know what IB wants and that they\'re delivering it — and you\'d be surprised how often that\'s not what\'s actually happening. They write essays they intuitively feel should score well. But IB has a very specific rubric looking for very specific things, and once you reverse-engineer that, the EE stops feeling impossible.' },

      { type: 'heading', text: 'IB doesn\'t reward what you think it rewards' },
      { type: 'paragraph', text: 'It doesn\'t reward more information, more citations, or deeper research the way students assume. It rewards making mistakes and learning from them — because you\'re a high schooler, not a Nobel laureate. Most students see the EE as so hard that they try to perfect their paper to the point they can\'t be honest about the mistakes they\'ll inevitably make. That\'s the trap. It\'s less about writing a flawless research paper and more about fulfilling the actual learning objectives.' },

      { type: 'heading', text: 'Where the marks are actually hiding' },
      { type: 'paragraph', text: 'Being honest about your shortcomings in your evaluation and limitations sections is usually your highest-leverage move. That\'s where the marks hide, and most students walk right past them because they\'re busy trying to look smarter than they need to.' },

      { type: 'key-takeaway', items: [
        'The EE feels impossible mostly because of the "survive it" mindset',
        'Students who breeze through reverse-engineered the rubric — they\'re not smarter',
        'IB rewards learning from mistakes, not more citations or research',
        'Honesty in your evaluation and limitations is where easy marks hide',
        'You don\'t need to be a perfect academic — you need to hit the criteria',
      ]},

      { type: 'cta-box', label: 'Free module', text: 'The whole game is the mindset shift. Our free Mindset module breaks down exactly what examiners reward.', href: '/guides/ee-mindset', buttonText: 'Read the mindset guide' },
    ],
    faqItems: [
      { question: 'Is the Extended Essay too hard for high school students?', answer: 'It\'s challenging, but the difficulty is overstated by the "just survive it" mindset. The students who do well aren\'t smarter — they understand the specific rubric and write to it. IB rewards learning from mistakes, not Nobel-level research.' },
      { question: 'Why does the Extended Essay feel impossible?', answer: 'Because most students treat it as something to endure and try to look perfect. Once you reverse-engineer what the criteria actually reward — including honest evaluation of your limitations — it becomes far more manageable.' },
      { question: 'Do you have to be a great writer to score well on the EE?', answer: 'No. You have to hit the assessment criteria. Many high scorers were predicted low grades; understanding what IB rewards matters more than natural writing talent.' },
    ],
    related: [
      { href: '/guides/ee-mindset', title: 'The IB Extended Essay Mindset Shift', description: 'The mental model that separates a C from an A.' },
      { href: '/guides/ee-criteria-breakdown', title: 'EE Criteria Breakdown', description: 'Exactly how each mark is awarded.' },
    ],
  },

  {
    slug: 'ee-predicted-grade-and-bonus-points',
    title: 'Will a Bad EE Draft Ruin My Predicted Grade? How EE and TOK Points Actually Work',
    description: 'Worried a rough EE draft tanks your predicted grade for university? How predicted vs final grades work, the EE/TOK bonus matrix, and why only an E fails the diploma.',
    date: '2026-06-18',
    readMins: 5,
    content: [
      { type: 'paragraph', text: 'You messed up your EE draft, predicted grades go to universities in October, and final submission is weeks after that. So will your predicted grade carry a C or D for the EE — and is your offer in danger? Here\'s how it actually works, from someone who went in predicted a C.' },

      { type: 'heading', text: 'Predicted and final grades come from two different people' },
      { type: 'paragraph', text: 'Your predicted grade is set by your supervisor, based on what they\'ve seen: your draft, your RPPF reflections, and your meetings. If your draft was rough, your predicted grade will probably reflect that. But your actual final EE grade is given by an external IB examiner who has never seen your draft and doesn\'t know what your supervisor predicted. They grade fresh, on your final submission and RPPF alone. That\'s exactly how I went from a predicted C to a final A.' },

      { type: 'heading', text: 'The EE + TOK bonus matrix' },
      { type: 'paragraph', text: 'EE and TOK combine to award up to 3 extra points toward your total. A C in EE with an A in TOK still earns 2 bonus points. A D in EE with an A in TOK still earns 2. So strong TOK genuinely lifts your overall score even if the EE comes out weaker than you\'d hoped.' },

      { type: 'heading', text: 'Only an E actually fails' },
      { type: 'warning-box', text: 'Only an E in the EE or TOK fails the diploma. A C or D is still a pass. So unless you\'re genuinely at risk of an E, your diploma isn\'t in danger — the bonus points are what\'s in play.' },

      { type: 'heading', text: 'What to do in the final weeks' },
      { type: 'numbered-steps', items: [
        'Use your one full draft review — IB allows it, so take the feedback seriously',
        'Re-read against the actual criteria, especially Criterion B and Criterion C, where most marks are lost',
        'Take your RPPF seriously — it\'s 6 of 34 marks for 500 words, wildly high-leverage',
      ]},

      { type: 'key-takeaway', items: [
        'Predicted grade = your supervisor; final grade = a fresh external examiner',
        'A strong final can score far above your predicted grade',
        'EE + TOK give up to 3 bonus points via the matrix',
        'Only an E in EE or TOK fails the diploma — C and D pass',
        'Your RPPF is 6 marks for 500 words: don\'t leave it to the last minute',
      ]},

      { type: 'cta-box', label: 'Free guide', text: 'Those last marks usually come from the RPPF. Here\'s how to score all six.', href: '/guides/rppf-guide', buttonText: 'Read the RPPF guide' },
    ],
    faqItems: [
      { question: 'Does my EE draft affect my predicted grade?', answer: 'Yes. Your supervisor sets your predicted grade based on your draft, RPPF, and meetings. A rough draft usually lowers the prediction — but the prediction is not your final grade.' },
      { question: 'Can my final EE grade be higher than my predicted grade?', answer: 'Absolutely. An external examiner grades your final submission fresh, with no knowledge of your draft or prediction. A strong final can score well above a low predicted grade.' },
      { question: 'Does a C or D in the Extended Essay fail the IB diploma?', answer: 'No. Only an E in the EE or TOK fails the diploma. A C or D still passes; the EE/TOK bonus matrix then adds up to 3 points to your total.' },
    ],
    related: [
      { href: '/guides/rppf-guide', title: 'IB Extended Essay RPPF Guide', description: 'Score all 6 Criterion E marks in 500 words.' },
      { href: '/guides/ee-criteria-breakdown', title: 'EE Criteria Breakdown', description: 'Where students lose the most marks.' },
    ],
  },

  {
    slug: 'how-long-should-ee-outline-be',
    title: 'How Long Should Your Extended Essay Outline Be?',
    description: 'Your supervisor wants 1,500 words but you\'re stuck at 750? There\'s no IB-mandated outline length — here\'s what an EE outline actually needs to cover.',
    date: '2026-06-18',
    readMins: 4,
    content: [
      { type: 'paragraph', text: 'Your supervisor said your EE outline should be 1,500 words, you\'re sitting at 750, and you can\'t see how to get there without padding. Good news: the word count is not the thing that matters.' },

      { type: 'heading', text: 'There\'s no official outline length' },
      { type: 'paragraph', text: 'The IB doesn\'t mandate an outline length. The 1,500 your supervisor mentioned is their preference for how they like outlines structured — not a rule. Outlines can run anywhere from a page to several, depending on the supervisor.' },

      { type: 'heading', text: 'What an outline actually needs to cover' },
      { type: 'numbered-steps', items: [
        'Your research question',
        'Your argument structure — what each section will do',
        'Your main sources',
        'Your methodology, if relevant',
      ]},
      { type: 'paragraph', text: 'If you can articulate all of that clearly in 750 words, you don\'t need 1,500.' },

      { type: 'heading', text: 'If you can\'t hit the target without padding' },
      { type: 'tip-box', text: 'That\'s usually a sign you need to develop the substance further — not just write more words. Have you mapped out what each body section actually argues? Have you identified your main sources and what each contributes? If yes and you\'re still under, you\'re fine. If no, the gap isn\'t a word-count problem — your essay just isn\'t planned out yet.' },

      { type: 'paragraph', text: 'Either way, ask your supervisor what they specifically want to see in the outline. "1,500 words" is a target, not a structure. Once you know the content they need, the word count becomes irrelevant.' },

      { type: 'key-takeaway', items: [
        'There is no IB-mandated EE outline length',
        'A good outline covers your RQ, section-by-section argument, sources, and methodology',
        'If 750 words covers all that, it\'s enough',
        'Struggling to reach a target usually means the plan needs developing, not padding',
        'Ask your supervisor what content they want — not just a number',
      ]},

      { type: 'cta-box', label: 'Free guide', text: 'Not sure what each section should argue? Our structure guide maps the whole essay to the criteria.', href: '/guides/extended-essay-structure', buttonText: 'Read the structure guide' },
    ],
    faqItems: [
      { question: 'Is there an official Extended Essay outline length?', answer: 'No. The IB doesn\'t mandate an outline length. Any number your supervisor gives is their own preference for how they like outlines structured.' },
      { question: 'My EE outline is shorter than my supervisor asked for — is that a problem?', answer: 'Not if it covers your RQ, your section-by-section argument, your main sources, and your methodology. If it covers all that clearly, length is irrelevant. If it can\'t, the issue is planning, not word count.' },
      { question: 'What should an Extended Essay outline include?', answer: 'Your research question, the structure of your argument (what each section does), your main sources, and your methodology if relevant — enough that someone could see how the whole essay will hang together.' },
    ],
    related: [
      { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'A section-by-section blueprint mapped to the criteria.' },
      { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'Strong RQ patterns across subjects.' },
    ],
  },
]

export function getBlogPost(slug) {
  return BLOG_POSTS.find(p => p.slug === slug)
}
