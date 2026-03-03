import EEDumpWorkspace from '../components/EEDumpWorkspace'

export default function DumpWorkspacePage() {
  return (
    <main className="bg-navy-deep min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center bg-parchment/10 text-parchment text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-parchment/20 tracking-wide">
            Research Organisation Tool
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-cream mb-4">
            EE Dump Workspace
          </h1>
          <p className="text-steel max-w-xl mx-auto leading-relaxed">
            Dump every source and idea into subtopics, view them as a spreadsheet, add notes, and export when you're ready to write.
          </p>
        </div>

        {/* Workspace */}
        <EEDumpWorkspace />
      </div>
    </main>
  )
}
