import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/auth' }),
  endpoints: (builder) => ({
    signup: builder.mutation<any, { name: string; email: string; password: string }>(
      {
        query: (body) => ({
          url: '/register',
          method: 'POST',
          body,
        }),
      }
    ),
    sendRegisterOtp: builder.mutation<any, { name: string; email: string; password: string }>(
      {
        query: (body) => ({
          url: '/register/send-otp',
          method: 'POST',
          body,
        }),
      }
    ),
    verifyRegisterOtp: builder.mutation<any, { name: string; email: string; password: string; otp: string }>(
      {
        query: (body) => ({
          url: '/register/verify-otp',
          method: 'POST',
          body,
        }),
      }
    ),
    login: builder.mutation<any, { email: string; password: string }>(
      {
        query: (body) => ({
          url: '/login',
          method: 'POST',
          body,
        }),
      }
    ),
    forgotPassword: builder.mutation<any, { email: string }>(
      {
        query: (body) => ({
          url: '/forgot-password',
          method: 'POST',
          body,
        }),
      }
    ),
    resetPassword: builder.mutation<any, { token: string; newPassword: string }>({
      query: (body) => ({
        url: '/reset-password',
        method: 'POST',
        body,
      }),
    }),
    resendConfirmationEmail: builder.mutation<any, { email: string }>({
      query: (body) => ({
        url: '/resend-confirmation',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useSignupMutation, useLoginMutation, useForgotPasswordMutation, useSendRegisterOtpMutation, useVerifyRegisterOtpMutation, useResetPasswordMutation, useResendConfirmationEmailMutation } = authApi 