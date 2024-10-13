import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query(body) {
        return {
          url: "/auth/register",
          method: "POST",
          body,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query(body) {
        return {
          url: "/password/forgot",
          method: "POST",
          body,
        };
      },
    }),
    resetPassword: builder.mutation({
      query({ token, body }) {
        return {
          url: `/password/reset/${token}`,
          method: "PUT",
          body,
        };
      },
    }),
    getUsers: builder.query({
      query() {
        return {
          url: "/users",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUsersQuery,  // New hook for fetching user list
} = authApi;
