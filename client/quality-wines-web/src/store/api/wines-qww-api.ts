import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL_API } from '../../constants';
import { NEW_WINE } from '../../components/new-wine-form/NewWineForm';

export const winesQWWApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: URL_API, mode: 'cors' }),
    endpoints: builder => ({
        //auth
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

        //wines
        addWine: builder.mutation({
            query: (body: NEW_WINE) => ({
                url: `/wines`,
                method: 'POST',
                credentials: 'include',
                body: {
                    ...body,
                    temperature: body.temperature.toString()
                }
            }),
            //invalidatesTags: [''],

        }),

    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useAddWineMutation } = winesQWWApi;