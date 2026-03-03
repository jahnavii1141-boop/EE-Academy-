import EEPlanner from '../components/EEPlanner'

export default function PlannerPage() {
  return (
    <main className="bg-navy-deep min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center bg-parchment/10 text-parchment text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-parchment/20 tracking-wide">
            Free Planning Tool
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-cream mb-4">
            EE Planner
          </h1>
          <p className="text-steel max-w-xl mx-auto leading-relaxed">
            Set your final submission date and get a complete backwards-planned timeline with every milestone mapped out.
          </p>
        </div>

        {/* Planner */}
        <EEPlanner />
      </div>
    </main>
  )
}
