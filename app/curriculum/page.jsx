import Curriculum from '../../src/components/Curriculum'
export const metadata = {
  title: { absolute: 'IB Extended Essay Curriculum: Full 14-Lesson Breakdown' },
  description: 'Explore the 14-lesson IB Extended Essay curriculum covering topic selection, research, structure, writing, citations, and final polish.',
  alternates: { canonical: 'https://theextendedessay.com/curriculum' },
}
export default function CurriculumPage() {
  return (
    <main className="min-h-screen bg-navy">
      <Curriculum />
    </main>
  )
}
