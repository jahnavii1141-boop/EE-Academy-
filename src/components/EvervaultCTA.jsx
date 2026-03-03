import { EvervaultCard, Icon } from "./ui/evervault-card";
import AnimateIn from "./ui/AnimateIn";

const MODULE_REVEAL_TEXT = [
  "M1: Examiner Mindset",
  "M2: IB Criteria & Grading",
  "M3: Subject & Topic Selection",
  "M4: The EE Dump Method",
  "M5: Crafting Your Research Question",
  "M6: Source Evaluation & Research Skills",
  "M7: Essay Structure & Argumentation",
  "M8: Writing the Introduction",
  "M9: Body Paragraphs & Analysis",
  "M10: Discussion & Conclusion",
  "M11: Referencing & Citations",
  "M12: RPPF Reflections",
  "M13: Editing & Polishing",
  "M14: Final Submission Strategy",
].join("  ·  ")

export default function EvervaultCTA() {
  return (
    <section className="bg-navy py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left: IB-themed copy */}
          <div>
            <AnimateIn>
              <span className="inline-flex items-center bg-parchment/10 text-parchment text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-parchment/20 tracking-wide">
                Why EE Academy?
              </span>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-cream leading-tight mb-5">
                The structured path from<br />
                <span className="text-steel">uncertain to submitted.</span>
              </h2>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <p className="text-steel text-base leading-relaxed mb-8 max-w-md">
                Most students tackle the Extended Essay alone. Our programme gives
                you the examiner-backed framework, guided writing exercises, and
                real feedback that changes outcomes.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <ul className="space-y-4 mb-10">
                {[
                  "Examiner-informed teaching — know exactly what earns marks",
                  "Step-by-step modules that remove the guesswork",
                  "Real feedback on my 32/34 EE from Claude Opus 4.6 with added commentary and lessons",
                  "Structured AI prompts to use AI ethically and to your advantage",
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-cream/80">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-parchment/15 border border-parchment/25 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-parchment" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </AnimateIn>

            <AnimateIn delay={0.25}>
              <a href="#pricing" className="btn-primary-light">
                Start Learning Today
              </a>
            </AnimateIn>
          </div>

          {/* Right: EvervaultCard — hover to reveal module names */}
          <AnimateIn delay={0.15} className="flex justify-center">
            <div className="border border-parchment/20 flex flex-col items-start max-w-sm w-full mx-auto p-4 relative h-[30rem]">
              <Icon className="absolute h-6 w-6 -top-3 -left-3" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3" />

              <EvervaultCard text="EE" revealText={MODULE_REVEAL_TEXT} className="flex-1 w-full" />

              <p className="mt-3 text-xs text-steel text-center w-full">
                Hover to reveal all 14 modules inside
              </p>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
}
