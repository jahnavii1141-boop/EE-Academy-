import Link from 'next/link'
import { BLOG_POSTS } from '../../src/data/blogPosts'

export const metadata = {
  title: { absolute: 'IB Extended Essay Blog — Real Student Questions, Answered' },
  description: 'Honest answers to the IB Extended Essay questions students actually ask — using AI, choosing a subject, reflections, scoring, and more. From a 32/34 graduate.',
  alternates: { canonical: 'https://theextendedessay.com/blog' },
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return iso }
}

export default function BlogIndex() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1))
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-navy-deep py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-steel/60 text-xs mb-6">
            <Link href="/" className="hover:text-steel transition-colors">Home</Link>
            <span>/</span>
            <span className="text-steel">Blog</span>
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-cream leading-tight">The Extended Essay Blog</h1>
          <p className="text-steel mt-3 text-lg leading-relaxed">
            Real questions from IB students, answered honestly by a 32/34 graduate.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-12 pb-20">
        <div className="space-y-4">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-navy/10 hover:border-navy/25 bg-white/60 hover:bg-white transition-all px-6 py-5">
              <p className="text-xs text-navy/40 mb-1">{formatDate(post.date)}{post.readMins ? ` · ${post.readMins} min read` : ''}</p>
              <h2 className="font-serif text-xl font-bold text-navy leading-snug">{post.title}</h2>
              <p className="text-sm text-navy/60 mt-2 leading-relaxed">{post.description}</p>
              <p className="text-sm font-semibold text-navy mt-3">Read →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
