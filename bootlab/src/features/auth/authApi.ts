import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/auth' }),
  endpoints: (builder) => ({
    signup: builder.mutation<any, { firstName: string; lastName: string; email: string; password: string }>(
      {
        query: (body) => ({
          url: '/signup',
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
  }),
})

export const { useSignupMutation, useLoginMutation, useForgotPasswordMutation } = authApi 