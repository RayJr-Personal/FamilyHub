import Head from 'next/head'
import Link from 'next/link'

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

export default function Register() {
  
  const router = useRouter();

  // form validation rules 
  const validationSchema = Yup.object().shape({
      firstName: Yup.string()
          .required('First Name is required'),
      lastName: Yup.string()
          .required('Last Name is required'),
      email: Yup.string()
          .required('Email Address is required'),
      password: Yup.string()
          .required('Password is required')
          .min(6, 'Password must be at least 6 characters')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(user) {
      return userService.register(user)
          .then(() => {
              alertService.success('Registration successful', { keepAfterRouteChange: true });
              router.push('login');
          })
          .catch(alertService.error);
  }


  return (
    <>

      <Head>
        <title>Sign Up - FamilyHub</title>
      </Head>
      <AuthLayout>
        <Alert />
        <div className="flex flex-col">
        
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
            <strong>FamilyHub</strong>
          </Link>
          
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-900">
              Get started for free
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Already registered?{' '}
              <Link
                href="/account/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign in
              </Link>{' '}
              to your account.
            </p>
          </div>
        </div>
        <form
          className="mt-10 grid grid-cols-1 gap-y-0 gap-x-4 sm:grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='form-group'>
            <label className="mb-3 block text-sm font-medium text-gray-700">First Name</label>
            <input
              label="First name"
              id="first_name"
              name="first_name"
              title="first_name"
              type="text"
              autoComplete="given-name"
              required
              {...register('first_name')}
              className={`form-control ${errors.first_name ? 'is-invalid' : ''} block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm`}
            />
            <div className="invalid-feedback mb-3 block text-sm font-medium text-red-700">{errors.first_name?.message}</div>
          </div>

          <div className='form-group'>
            <label className="mb-3 block text-sm font-medium text-gray-700">Last Name</label>          
            <input
              label="Last name"
              id="last_name"
              name="last_name"
              title="last_name"
              type="text"
              autoComplete="family-name"
              required
              {...register('last_name')} 
              className={`form-control ${errors.last_name ? 'is-invalid' : ''}block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-grey-900 placeholder-grey-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm`}
            />
            <div className="invalid-feedback mb-3 block text-sm font-medium text-red-700">{errors.last_name?.message}</div>
          </div>

          <div className='form-group col-span-full'>
            <label className="mb-3 block text-sm font-medium text-gray-700">Email Address</label>          
            <input
              label="Email address"
              id="email"
              name="email"
              title="email"
              type="email"
              autoComplete="email"
              required
              {...register('email')}
              className={`form-control ${errors.email ? 'is-invalid' : ''} col-span-full block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm`}
            />
            <div className="invalid-feedback mb-3 block text-sm font-medium text-red-700">{errors.email?.message}</div>
          </div>
          <div className='form-group col-span-full'>
            <label className="mb-3 block text-sm font-medium text-gray-700">Password</label>          
            <input
              label="Password"
              id="password"
              name="password"
              title="password"
              type="password"
              autoComplete="new-password"
              required
              {...register('password')} 
              className={`form-control ${errors.password ? 'is-invalid' : ''} col-span-full block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm`}
            />
            <div className="invalid-feedback mb-3 block text-sm font-medium text-red-700">{errors.password?.message}</div>
          </div>
          <div className="col-span-full">
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="btn btn-primary w-full"
              disabled={formState.isSubmitting}
            >
            
              {formState.isSubmitting}
              <span>
                Sign up <span aria-hidden="true">&rarr;</span>
              </span>

            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}
