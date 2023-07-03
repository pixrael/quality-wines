import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL_API } from '../../constants';

export const authApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({ baseUrl: URL_API }),
    endpoints: builder => ({
        registerUser: builder.mutation<any, { email: string, password: string, username: string }>({
            query: (body) => ({
                url: `/auth/register`,
                method: 'POST',
                body
            })
        }),
        loginUser: builder.mutation<any, { email: string, password: string }>({
            query: (body) => ({
                url: `/auth/login`,
                method: 'POST',
                body
            })
        }),
    })
})

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;