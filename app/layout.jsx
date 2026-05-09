import { ClerkProvider } from '@clerk/nextjs'
import ConditionalShell from '../src/components/ConditionalShell'
import '../src/index.css'

export const metadata = {
  title: {
    default: 'The Extended Essay Academy',
    template: '%s | The Extended Essay Academy',
  },
  description: 'Learn the IB Extended Essay step-by-step with a self-study programme built by a 32/34 student.',
  metadataBase: new URL('https://theextendedessay.com'),
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

// Clerk requires dynamic rendering for auth header access
export const dynamic = 'force-dynamic'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.paddle.com/paddle/v2/paddle.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `
            window.__paddleToken = '${process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN}';
            function __initPaddle() {
              if (window.__paddleInitialized) return;
              Paddle.Initialize({ token: window.__paddleToken });
              window.__paddleInitialized = true;
            }
            if (typeof Paddle !== 'undefined') {
              __initPaddle();
            } else {
              document.querySelector('script[src*="paddle.js"]').addEventListener('load', __initPaddle);
            }
          `}} />
      </head>
      <body>
        <ClerkProvider>
          <ConditionalShell>{children}</ConditionalShell>
        </ClerkProvider>
      </body>
    </html>
  )
}
