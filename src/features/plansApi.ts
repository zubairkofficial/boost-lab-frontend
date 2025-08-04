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
        price: number;
        description?: string;
        features?: string[];
      }
    >({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Plan"],
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
          price: number;
          description?: string;
          features?: string[];
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
      { stripePriceId: string } 
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
} = plansApi;
