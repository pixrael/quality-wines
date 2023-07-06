import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL_API } from '../../constants';
import { NEW_WINE } from '../../components/new-wine-form/NewWineForm';

export const winesQWWApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: URL_API, mode: 'cors' }),
    tagTypes: ['ListWines'],
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
        getWines: builder.query<NEW_WINE[], void>({
            query: () => {
                return { url: `/wines`, credentials: "include" };
            },
            providesTags: ['ListWines']
        }),
        addWine: builder.mutation({
            query: (body: NEW_WINE) => ({
                url: `/wines`,
                method: 'POST',
                credentials: 'include',
                body: {
                    ...body
                }
            }),
            invalidatesTags: ['ListWines'],
        }),

        getWineById: builder.query<NEW_WINE, string>({
            query: (id: string) => {
                return { url: `/wines/${id}`, credentials: "include" };
            }
        }),

        updateWine: builder.mutation({
            query: ({ id, body }: { id: string, body: NEW_WINE }) => ({
                url: `/wines/${id}`,
                method: 'PATCH',
                credentials: 'include',
                body: {
                    ...body,
                    temperature: body.temperature.toString()
                }
            }),
            invalidatesTags: ['ListWines'],
        }),

        deleteWine: builder.mutation({
            query: (id: string) => ({
                url: `/wines/${id}`,
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: ['ListWines'],
        }),

    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useGetWinesQuery, useGetWineByIdQuery, useAddWineMutation, useUpdateWineMutation, useDeleteWineMutation } = winesQWWApi;