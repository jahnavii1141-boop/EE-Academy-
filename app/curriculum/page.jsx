import Curriculum from '../../src/components/Curriculum'
export const metadata = {
  title: { absolute: 'IB Extended Essay Curriculum: Full 14-Module Breakdown' },
  description: 'Explore the 14-module IB Extended Essay curriculum covering topic selection, research, structure, writing, citations, and final polish.',
  alternates: { canonical: 'https://theextendedessay.com/curriculum' },
}
export default function CurriculumPage() {
  return (
    <main className="min-h-screen bg-navy">
      <Curriculum />
    </main>
  )
}
