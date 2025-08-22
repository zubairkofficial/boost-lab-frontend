import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testApi = createApi({
  reducerPath: "testApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Test"],
  endpoints: (builder) => ({
    getTestResultByEmail: builder.query<string, string>({
      query: (email) => `auth/results/${email}`, 
    }),
  }),
});

export const { useGetTestResultByEmailQuery } = testApi;
