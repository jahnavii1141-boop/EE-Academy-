import { ClerkProvider } from '@clerk/nextjs'
import ConditionalShell from '../src/components/ConditionalShell'
import PostHogProvider from '../src/components/PostHogProvider'
import '../src/index.css'

export const metadata = {
  title: {
    default: 'The Extended Essay Academy',
    template: '%s | The Extended Essay Academy',
  },
  description: 'Learn the IB Extended Essay step-by-step with a self-study programme built from a real 32/34 Extended Essay.',
  metadataBase: new URL('https://theextendedessay.com'),
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

// ClerkProvider is a client component — no force-dynamic needed on root layout.
// Auth is handled client-side (useAuth) and in middleware. Removing force-dynamic
// lets guide pages and module pages be statically pre-rendered at build time,
// which eliminates cold-start 5xx timeouts when Google crawls many pages at once.

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Paddle stays lazy-loaded via src/lib/paddle.js, only on checkout. */}
      <body>
        {/* Google AdSense loader — React 19 hoists this async <script> into <head>
            on every page. `async` keeps it non-blocking (won't slow first paint). */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8652560449719165"
          crossOrigin="anonymous"
        />
        <ClerkProvider
          signInFallbackRedirectUrl="/dashboard/home"
          signUpFallbackRedirectUrl="/dashboard/home"
        >
          <PostHogProvider>
            <ConditionalShell>{children}</ConditionalShell>
          </PostHogProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
