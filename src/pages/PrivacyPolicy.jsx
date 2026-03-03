import LegalPage from './LegalPage'

const SECTIONS = [
  {
    number: '1',
    title: 'Information We Collect',
    body: 'We collect only what is necessary to deliver our products and communicate with you:',
    bullets: [
      'Purchase information: name, email address, and payment details (processed securely by Lemon Squeezy — we do not store your credit card information)',
      'Email address: if you sign up for our mailing list or free resources',
      'Usage data: basic website analytics (pages visited, time on site) through privacy-friendly analytics tools',
    ],
  },
  {
    number: '2',
    title: 'How We Use Your Information',
    bullets: [
      'To deliver the products you purchase',
      'To send you access credentials and purchase confirmations',
      'To send marketing emails if you have opted in (you can unsubscribe at any time)',
      'To improve our website and products',
    ],
  },
  {
    number: '3',
    title: 'Third-Party Services',
    body: 'We use the following third-party services:',
    bullets: [
      'Lemon Squeezy: payment processing and product delivery',
      'Vercel: website hosting',
      'Analytics tools: to understand how visitors use our site',
    ],
    bodyAfter: 'These services have their own privacy policies. We do not sell, rent, or share your personal information with any third parties for their marketing purposes.',
  },
  {
    number: '4',
    title: 'Data Security',
    body: 'We take reasonable measures to protect your personal information. Payment processing is handled entirely by Lemon Squeezy, which uses industry-standard encryption and security practices.',
  },
  {
    number: '5',
    title: 'Your Rights',
    body: 'You may request access to, correction of, or deletion of your personal data at any time by emailing us. If you are in the EU, you have additional rights under GDPR including the right to data portability and the right to lodge a complaint with a supervisory authority.',
  },
  {
    number: '6',
    title: 'Cookies',
    body: 'Our website may use essential cookies for functionality. We do not use advertising or tracking cookies.',
  },
  {
    number: '7',
    title: 'Contact',
    body: null,
    contact: 'hello@theextendedessay.com',
    contactPrefix: 'For privacy-related questions, contact us at',
  },
]

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" updated="March 3, 2026" sections={SECTIONS} />
  )
}
