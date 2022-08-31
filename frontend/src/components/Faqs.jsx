import Image from 'next/future/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'Can I pay for my subscription via credit card?',
      answer: 'Absolutely, we payment in a variety of forms.',
    },
    {
      question: 'What was included in the latest update of FamilyHub?',
      answer:
        'Please subscribe to our development blog if you are interested in the latest code updates.',
    },
  ],
  [
    {
      question:
        'Can my family use FamilyHub without an internet connection?',
      answer:
        'Yes, FamilyHub is fully compatible with mobile devices and works offline.',
    },
    {
      question:
        'Can FamilyHub be used on a tablet or a smartphone?',
      answer:
        'Yes, though we don’t currently have an app, the website is still accessible using those device types.',
    },
  ],
  [
    {
      question: 'Does FamilyHub have a free trial?',
      answer:
        'Yes, you can try FamilyHub out for 6 months free of charge. You can cancel at any time.',
    },
    {
      question: 'Will FamilyHub be available in other languages?',
      answer: 'Yes, our amazing team is working hard to add more languages.',
    },
    {
      question: 'I lost my password, how do I get into my account?',
      answer:
        'Send us an email and we will send you a link to reset your password.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, please don't hesitate to email our support team.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
