import Head from 'next/head'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { MainFeatures } from '@/components/MainFeatures'
import { Testimonials } from '@/components/Testimonials'

import { Alert } from '@/components/Alert';

export default function Home() {
  return (
    <>
      <Alert/>
      <Head>
        <title>FamilyHub</title>
        <meta
          name="description"
          content=""
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <MainFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
