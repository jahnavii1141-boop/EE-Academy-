import Script from 'next/script'

// Google Analytics 4 (gtag.js) — owner-provided tag (2026-08). Rendered once in
// the root layout so it loads on every page, exactly once. next/script with
// afterInteractive is Next's recommended way to add gtag (non-blocking); GA4's
// enhanced measurement tracks client-side route changes automatically.
const GA_ID = 'G-F7K52Q1M15'

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  )
}
