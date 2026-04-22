import Providers from './providers'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'
import ExitIntentPopup from '../src/components/ExitIntentPopup'
import '../src/index.css'

export const metadata = {
  title: {
    default: 'The Extended Essay Academy',
    template: '%s | The Extended Essay Academy',
  },
  description: 'Learn the IB Extended Essay step-by-step with a self-study programme built by a 32/34 student.',
  metadataBase: new URL('https://www.theextendedessay.com'),
}

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <div className="min-h-screen bg-cream flex flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <ExitIntentPopup />
          </div>
        </body>
      </html>
    </Providers>
  )
}

// Prevent static generation of the layout since Clerk needs dynamic request context
export const dynamic = 'force-dynamic'
