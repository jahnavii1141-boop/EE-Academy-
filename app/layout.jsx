import Script from 'next/script'
import Providers from './providers'
import ConditionalShell from '../src/components/ConditionalShell'
import '../src/index.css'

export const metadata = {
  title: {
    default: 'The Extended Essay Academy',
    template: '%s | The Extended Essay Academy',
  },
  description: 'Learn the IB Extended Essay step-by-step with a self-study programme built by a 32/34 student.',
  metadataBase: new URL('https://theextendedessay.com'),
}

// Clerk requires dynamic rendering for auth header access
export const dynamic = 'force-dynamic'

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <Script src="https://cdn.paddle.com/paddle/v2/paddle.js" strategy="afterInteractive" />
          <ConditionalShell>{children}</ConditionalShell>
        </body>
      </html>
    </Providers>
  )
}
