import LegalPage from './LegalPage'

const SECTIONS = [
  {
    number: '1',
    title: '7-Day Satisfaction Guarantee',
    body: 'We offer a 7-day satisfaction guarantee from the date of purchase. If you are not satisfied with the course, you may request a full refund within 7 days of your original purchase date.',
    callout: true,
  },
  {
    number: '2',
    title: 'Completion Threshold',
    body: 'Refund eligibility requires that you have not accessed more than 50% of the course content. If more than 50% of modules have been accessed at the time of your refund request, the refund will not be granted.',
  },
  {
    number: '3',
    title: 'How to Request a Refund',
    body: null,
    contact: 'hello@theextendedessay.com',
    contactPrefix: 'To request a refund, email us at',
    contactSuffix: 'with your purchase details and reason for the refund. Please include the email address used for your purchase.',
  },
  {
    number: '4',
    title: 'Processing Time',
    body: 'Refunds are processed within 5–7 business days of approval. The refund will be issued to the original payment method used for the purchase.',
  },
  {
    number: '5',
    title: 'Technical Issues',
    body: null,
    contact: 'hello@theextendedessay.com',
    contactPrefix: 'If you experience a technical issue that prevents you from accessing your purchase, contact us at',
    contactSuffix: 'and we will resolve it. Technical issues do not count toward the 50% completion threshold.',
  },
]

export default function RefundPolicy() {
  return (
    <LegalPage title="Refund Policy" updated="March 29, 2026" sections={SECTIONS} />
  )
}
