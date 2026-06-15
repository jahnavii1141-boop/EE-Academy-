'use client'

import LegalPage from './LegalPage'

const SECTIONS = [
  {
    number: '1',
    title: 'Agreement',
    body: 'By purchasing or using any product from The Extended Essay Academy ("we," "us," "our") through theextendedessay.com, you agree to these Terms of Service.',
  },
  {
    number: '2',
    title: 'Products & Delivery',
    body: 'We sell digital educational products including online learning content, interactive tools, templates, and downloadable resources. All products are delivered digitally. Upon successful payment, you will receive access to the purchased content via email or through our website.',
  },
  {
    number: '3',
    title: 'Acceptable Use',
    body: 'You may use our products for your personal educational purposes. You may not resell, redistribute, share login credentials, publicly republish, or commercially exploit any content or tools provided. One purchase grants access to one individual.',
  },
  {
    number: '4',
    title: 'Copyright Notice',
    body: 'All content contained within The Extended Essay, including but not limited to templates, frameworks, worksheets, guides, videos, written materials, graphics, tools, and downloadable resources, is protected by copyright law.\n\nAccess to this platform grants you a personal, non-transferable licence to use these materials for your own educational purposes only.',
    sublists: [
      {
        label: 'You may not:',
        bullets: [
          'Copy, reproduce, distribute, sell, sublicense, or share any part of the platform or its materials.',
          'Upload materials to public websites, forums, social media platforms, AI training datasets, or file-sharing services.',
          'Redistribute templates, worksheets, guides, or other resources to third parties.',
          'Claim any content as your own work or creation.',
        ],
      },
      {
        label: 'You may:',
        bullets: [
          'Use the resources to support your own Extended Essay research and writing process.',
          'Print or download materials for your personal academic use.',
        ],
      },
    ],
    bodyAfter: 'Unauthorised reproduction or distribution of any content may result in termination of access and further action where appropriate.\n\n© The Extended Essay. All rights reserved.',
  },
  {
    number: '5',
    title: 'Disclaimer',
    body: 'Our products are educational resources designed to help students with the IB Extended Essay process. We do not guarantee any specific grade, score, or academic outcome. Results depend on individual effort, circumstances, and other factors beyond our control. Our content represents the personal experience and strategies of the creator and should not be taken as official IB guidance.',
  },
  {
    number: '6',
    title: 'Limitation of Liability',
    body: 'The Extended Essay Academy shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products. Our total liability shall not exceed the amount you paid for the product in question.',
  },
  {
    number: '7',
    title: 'Refund Policy',
    body: 'We offer a 7-day satisfaction guarantee from the date of purchase, subject to the conditions outlined in our Refund Policy. Please review the full refund terms at theextendedessay.com/refund before purchasing.',
  },
  {
    number: '8',
    title: 'Modifications',
    body: 'We reserve the right to update these terms at any time. Continued use of our products after changes constitutes acceptance of the updated terms.',
  },
  {
    number: '9',
    title: 'Contact',
    body: null,
    contact: 'hello@theextendedessay.com',
    contactPrefix: 'For questions about these terms, contact us at',
  },
]

export default function TermsOfService() {
  return (
    <LegalPage title="Terms of Service" updated="March 3, 2026" sections={SECTIONS} />
  )
}
