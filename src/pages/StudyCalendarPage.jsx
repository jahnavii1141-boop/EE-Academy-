export default function StudyCalendarPage() {
  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 56px)' }}>
      <iframe
        src="/tools/study-calendar.html"
        title="Study Calendar"
        className="flex-1 w-full border-0"
        style={{ minHeight: 'calc(100vh - 56px)' }}
      />
    </div>
  )
}
