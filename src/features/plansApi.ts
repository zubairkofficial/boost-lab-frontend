import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const plansApi = createApi({
  reducerPath: "plansApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/plans`,
  }),
  tagTypes: ["Plan"],
  endpoints: (builder) => ({
    createPlan: builder.mutation<
      any,
      {
        name: string;
        oldPrice: number;
        price: number;
        description?: string;
        duration: number;
      }
    >({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Plan"],
    }),

    cancelSubscription: builder.mutation<any, { userId: number }>({
      query: ({ userId }) => ({
        url: `/cancel-subscription/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["Plan"],
    }),

    getActiveSubscription: builder.query({
      query: (userId) => `/active-subscription/${userId}`,
    }),

    getAllPlans: builder.query<any[], void>({
      query: () => "/getall",
      providesTags: ["Plan"],
    }),

    getPlanById: builder.query<any, string>({
      query: (id) => `/get/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Plan", id }],
    }),

    updatePlan: builder.mutation<
      any,
      {
        id: string;
        data: Partial<{
          name: string;
          oldPrice: number;
          price: number;
          description?: string;
          duration?: number;
        }>;
      }
    >({
      query: ({ id, data }) => ({
        url: `/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Plan", id }],
    }),

    deletePlan: builder.mutation<any, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Plan", id }],
    }),

    createCheckoutSession: builder.mutation<
      { url: string },
      { stripePriceId: string; userId: number }
    >({
      query: (body) => ({
        url: "/checkout-session",
        method: "POST",
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
  useCreateCheckoutSessionMutation,
  useGetActiveSubscriptionQuery,
  useCancelSubscriptionMutation,
} = plansApi;
