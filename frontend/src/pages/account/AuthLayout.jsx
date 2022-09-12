import Image from 'next/future/image'

import backgroundImage from '@/images/background-auth.jpg'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { userService } from '@/services/user.service'


export function AuthLayout({ children }) {

  const router = useRouter();

  useEffect(() => {
      // redirect to home if already logged in
      if (userService.userValue) {
          router.push('/');
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="relative flex min-h-full justify-center md:px-12 lg:px-0">
        <div className="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28">
          <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
            {children}
          </div>
        </div>
        <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src={backgroundImage}
            alt=""
            unoptimized
          />
        </div>
      </div>
    </>
  )
}