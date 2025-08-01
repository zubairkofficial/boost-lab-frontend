// src/features/auth/plansApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const testApi = createApi({
  reducerPath: 'testApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.BASE_URL}/test-result/` }),
  tagTypes: ['Test'],
  endpoints: (builder) => ({
    getTestResultByEmail: builder.query<any, string>({
      query: (email) => `${email}`,
      providesTags: (_result, _error, email) => [{ type: 'Test', email }],
    }),
  }),
});

export const {
  useGetTestResultByEmailQuery,
} = testApi;
