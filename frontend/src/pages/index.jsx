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

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { userService } from '@/services/user.service';

export default function Home() {

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
      // on initial load - run auth check 
      authCheck(router.asPath);

      // on route change start - hide page content by setting authorized to false  
      const hideContent = () => setAuthorized(false);
      router.events.on('routeChangeStart', hideContent);

      // on route change complete - run auth check 
      router.events.on('routeChangeComplete', authCheck)

      // unsubscribe from events in useEffect return function
      return () => {
          router.events.off('routeChangeStart', hideContent);
          router.events.off('routeChangeComplete', authCheck);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
      if (!userService.userValue) {
          setAuthorized(false);
      } else {
          setAuthorized(true);
      }
  }

  return (
    <>
      <Head>
        <title>FamilyHub</title>
        <meta
          name="description"
          content=""
        />
      </Head>   
      <div className={`app-container ${user ? 'bg-light' : ''}`}>
        <Alert/>
        <Header />
        <main>

          {/* Content below here to show when logged in */}
          {authorized && [
            <div>Display App content here for logged in user.</div>,
            ]}

          {/* Content below here to show when logged out */}
          {!authorized && [
          <Hero />,
          <MainFeatures />,
          <CallToAction />,
          <Testimonials />,
          <Pricing />,
          <Faqs />,
          <Footer />,
          ]}

        </main>
        
      </div>
            
    </>
  )
}
