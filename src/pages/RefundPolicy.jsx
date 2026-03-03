import LegalPage from './LegalPage'

const SECTIONS = [
  {
    number: '1',
    title: 'No Refund Policy',
    body: 'All sales are final. Due to the digital nature of our products, we do not offer refunds once access to course materials and tools has been delivered. By completing your purchase, you acknowledge that you are buying a digital product with immediate access and that no refund will be issued.',
    callout: true,
  },
  {
    number: '2',
    title: 'Technical Issues',
    body: null,
    contact: 'hello@theextendedessay.com',
    contactPrefix: 'If you experience a technical issue that prevents you from accessing your purchase, contact us at',
    contactSuffix: 'and we will resolve it.',
  },
]

export default function RefundPolicy() {
  return (
    <LegalPage title="Refund Policy" updated="March 3, 2026" sections={SECTIONS} />
  )
}
