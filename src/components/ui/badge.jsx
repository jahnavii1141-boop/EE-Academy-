import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        default:  'border-transparent bg-navy text-cream hover:bg-navy/80',
        secondary:'border-transparent bg-parchment text-navy hover:bg-parchment/80',
        outline:  'border-border text-foreground bg-transparent',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { badgeVariants }
