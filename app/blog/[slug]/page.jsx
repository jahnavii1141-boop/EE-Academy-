import { notFound } from 'next/navigation'
import { BLOG_POSTS, getBlogPost } from '../../../src/data/blogPosts'
import BlogArticle from '../../../src/components/BlogArticle'

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    // absolute → keyword-first title with no brand tail/double (see CTR fix)
    title: { absolute: post.title },
    description: post.description,
    alternates: { canonical: `https://theextendedessay.com/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `https://theextendedessay.com/blog/${slug}`,
      images: [{ url: 'https://theextendedessay.com/feather-hero.png' }],
    },
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()
  return <BlogArticle post={post} />
}
