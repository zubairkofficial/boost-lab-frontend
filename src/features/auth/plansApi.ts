// src/features/auth/plansApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const plansApi = createApi({
  reducerPath: 'plansApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/plans' }),
  tagTypes: ['Plan'],
  endpoints: (builder) => ({
    createPlan: builder.mutation<any, {
      name: string;
      price: number;
      description?: string;
      features?: string[];
    }>({
      query: (body) => ({
        url: '/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Plan'],
    }),

    getAllPlans: builder.query<any[], void>({
      query: () => '/getall',
      providesTags: ['Plan'],
    }),

    getPlanById: builder.query<any, string>({
      query: (id) => `/get/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Plan', id }],
    }),

    updatePlan: builder.mutation<any, {
      id: string;
      data: Partial<{
        name: string;
        price: number;
        description?: string;
        features?: string[];
      }>
    }>({
      query: ({ id, data }) => ({
        url: `/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Plan', id }],
    }),

    deletePlan: builder.mutation<any, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Plan', id }],
    }),

    // ✅ Stripe Checkout Session Endpoint
    createCheckoutSession: builder.mutation<{ url: string }, { priceId: string }>({
      query: (body) => ({
        url: '/checkout-session',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useCreatePlanMutation,
  useGetAllPlansQuery,
  useGetPlanByIdQuery,
  useUpdatePlanMutation,
  useDeletePlanMutation,
  useCreateCheckoutSessionMutation, // ✅ export this
} = plansApi;
