import About from '../../src/page-components/About'
import WhatYoullLearn from '../../src/components/WhatYoullLearn'
import Feature108 from '../../src/components/blocks/Feature108'
import HomeProof from '../../src/components/HomeProof'
import HomeGuarantee from '../../src/components/HomeGuarantee'
import HomeFAQ from '../../src/components/HomeFAQ'
import EvervaultCTA from '../../src/components/EvervaultCTA'

export const metadata = {
  title: { absolute: 'How a Predicted C Became a 32/34 Extended Essay' },
  description: 'Read the story behind The Extended Essay Academy and how a predicted C turned into a final A and 32/34 through a clearer EE system. See what you learn, how the system works, and the answers to common questions.',
  alternates: { canonical: 'https://theextendedessay.com/about' },
}

// FAQ schema lives here now — the visible FAQ moved off the (deliberately
// stripped-down) homepage and onto /about (2026-08).
const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Can I start for free?', acceptedAnswer: { '@type': 'Answer', text: "Yes, your first guides are free — unlock the full system whenever you're ready." } },
    { '@type': 'Question', name: 'Do you write the essay for me?', acceptedAnswer: { '@type': 'Answer', text: "No. This is a self-study system, we teach you how to research, structure, and write it yourself. Every word stays yours. That's the whole point: examiners can tell when it isn't, and so can you." } },
    { '@type': 'Question', name: 'Is it built for the current IB syllabus?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, everything maps to the current EE assessment criteria.' } },
    { '@type': 'Question', name: 'How fast can I improve?', acceptedAnswer: { '@type': 'Answer', text: "Most students find their essay gets clearer within the first few guides, because you stop guessing and start matching the markscheme. How far you go depends on your effort, but you'll never again wonder what \"good\" actually looks like." } },
    { '@type': 'Question', name: "What if I'm completely out of time?", acceptedAnswer: { '@type': 'Answer', text: "Start with the 1-Day Protocol. It's built for exactly that, the highest-impact fixes when the deadline is tomorrow." } },
    { '@type': 'Question', name: 'What is the IB Extended Essay?', acceptedAnswer: { '@type': 'Answer', text: 'The IB Extended Essay (EE) is a 4,000-word independent research paper required for the IB Diploma. It is assessed on criteria A–E and contributes up to 3 bonus points toward the IB Diploma score when combined with Theory of Knowledge.' } },
    { '@type': 'Question', name: 'How long does the Extended Essay take?', acceptedAnswer: { '@type': 'Answer', text: "IB recommends approximately 40 hours for the Extended Essay. Most students spread this across 4–6 months. The EE Academy's 14-guide system helps you use those hours efficiently from topic selection to final submission." } },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />
      <About />
      <div id="learn"><WhatYoullLearn /></div>
      <div id="how-it-works"><Feature108 /></div>
      <HomeProof />
      <HomeGuarantee />
      <HomeFAQ />
      <EvervaultCTA />
    </>
  )
}
