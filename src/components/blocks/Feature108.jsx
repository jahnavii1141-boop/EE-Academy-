import { useState } from 'react'
import { Layout, Pointer, Zap } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'
import AnimateIn from '../ui/AnimateIn'

// Lightweight Tabs built without Radix (avoids shadcn dependency)
function TabsTrigger({ value, active, setActive, children, className }) {
  const isActive = active === value
  return (
    <button
      onClick={() => setActive(value)}
      className={cn(
        'flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
        isActive
          ? 'bg-parchment text-navy'
          : 'text-ink-soft hover:text-navy',
        className
      )}
    >
      {children}
    </button>
  )
}

function TabsContent({ value, active, children, className }) {
  if (active !== value) return null
  return <div className={className}>{children}</div>
}

const DEFAULT_TABS = [
  {
    value: 'tab-1',
    icon: <Zap className="h-auto w-4 shrink-0" />,
    label: 'Master the EE',
    content: {
      badge: 'Core Skills',
      title: 'Write an Extended Essay that stands out.',
      description:
        'Learn how to choose a compelling research question, structure your argument, and produce a polished academic essay that earns top marks.',
      buttonText: 'See Plans',
      imageSrc: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
      imageAlt: 'Student studying at desk',
    },
  },
  {
    value: 'tab-2',
    icon: <Pointer className="h-auto w-4 shrink-0" />,
    label: 'Research Skills',
    content: {
      badge: 'Expert Techniques',
      title: 'Find and evaluate sources like a scholar.',
      description:
        'Master academic databases, citation styles, and critical evaluation of sources. Build the research foundation that underpins every great EE.',
      buttonText: 'Explore Tools',
      imageSrc: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
      imageAlt: 'Library books and research',
    },
  },
  {
    value: 'tab-3',
    icon: <Layout className="h-auto w-4 shrink-0" />,
    label: 'Score Maximiser',
    content: {
      badge: 'Assessment Insights',
      title: 'Understand exactly what examiners want.',
      description:
        'Unpack the IB assessment criteria with real exemplars, annotated model essays, and examiner tips. Know what A looks like before you write a word.',
      buttonText: 'See Options',
      imageSrc: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
      imageAlt: 'Graded paper and pen',
    },
  },
]

export default function Feature108({
  badge = 'The Extended Essay Academy',
  heading = 'Everything you need to ace your Extended Essay',
  description = 'A structured, expert-led programme for IB students who want more than a pass.',
  tabs = DEFAULT_TABS,
}) {
  const [active, setActive] = useState(tabs[0].value)

  return (
    <section className="py-20 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <AnimateIn>
          <div className="flex flex-col items-center gap-4 text-center mb-8">
            <Badge variant="outline">{badge}</Badge>
            <h2 className="max-w-2xl text-3xl font-serif font-bold text-navy md:text-4xl">{heading}</h2>
            <p className="text-ink-soft max-w-xl">{description}</p>
          </div>
        </AnimateIn>

        {/* Tab triggers */}
        <AnimateIn delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10">
            {tabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value} active={active} setActive={setActive}>
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </div>
        </AnimateIn>

        {/* Tab panels */}
        <AnimateIn delay={0.15}>
          {tabs.map(tab => (
            <TabsContent key={tab.value} value={tab.value} active={active}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="flex flex-col items-center gap-5">
                <Badge variant="secondary" className="w-fit">{tab.content.badge}</Badge>
                <h3 className="text-2xl font-serif font-bold text-navy lg:text-4xl">{tab.content.title}</h3>
                <p className="text-ink-soft lg:text-base">{tab.content.description}</p>
                <Button size="lg" className="mt-2">{tab.content.buttonText}</Button>
              </div>
            </TabsContent>
          ))}
        </AnimateIn>
      </div>
    </section>
  )
}
