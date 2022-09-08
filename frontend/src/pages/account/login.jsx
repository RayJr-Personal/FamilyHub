import Head from 'next/head'
import Link from 'next/link'

import React from 'react'

import { AuthLayout } from '@/pages/account/AuthLayout'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService } from '@/services/user.service';
import { alertService } from '@/services/alert.service';
import { Alert } from '@/components/Alert'


export default function Login() {

  const router = useRouter();

  // form validation rules 
  const validationSchema = Yup.object().shape({
      email: Yup.string().required('Email Address is required'),
      password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ email, password }) {
      return userService.login(email, password)
          .then(() => {
              // get return url from query parameters or default to '/'
              const returnUrl = router.query.returnUrl || '/';
              router.push(returnUrl);
          })
          .catch(alertService.error);
  }  

  return (
    <>
      <Head>
        <title>Sign In - FamilyHub</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
            <strong>FamilyHub</strong>
          </Link>
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Don’t have an account?{' '}
              <Link
                href="/account/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>{' '}
              for a free trial.
            </p>
          </div>
        </div>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="mt-0 grid grid-cols-1 gap-y-4"
        >

          <div className='form-group'>
            <label className="mb-3 block text-sm font-medium text-gray-700">Email Address</label>
            <input
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              {...register('email')}
              className={`form-control ${errors.email ? 'is-invalid' : ''} block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
          <div className='form-group'>
            <label className="mb-3 block text-sm font-medium text-gray-700">Password</label>
            <input
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''} block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <div>
            <Button
              variant="solid"
              color="blue"
              className="w-full"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
              <span>
                Sign in <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
            <Alert />
          </div>
        </form>
      </AuthLayout>
    </>
  )
}
