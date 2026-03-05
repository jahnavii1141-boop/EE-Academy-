export default function PlannerPage() {
  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 56px)' }}>
      <iframe
        src="/tools/planner.html"
        title="EE Planner"
        className="flex-1 w-full border-0"
        style={{ minHeight: 'calc(100vh - 56px)' }}
      />
    </div>
  )
}
