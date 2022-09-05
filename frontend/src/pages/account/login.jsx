import Head from 'next/head'
import Link from 'next/link'

import React from 'react'

import { AuthLayout } from '@/pages/account/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService } from '@/services/user.service';
import { alertService } from '@/services/alert.service';


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
        className="mt-10 grid grid-cols-1 gap-y-8">
          <TextField
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
          
          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting}
              <span>
                Sign in <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}
