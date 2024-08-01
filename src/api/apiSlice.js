import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Heroes'], // какие метки существуют // их можно навесить на функцию и данные, чтобы типизировать, что и с кем работает
    endpoints: builder => ({
        getHeroes: builder.query({
            query: () => '/heroes',
            providesTags: ['Heroes'] // к какому тегу будут относиться полученные данные
        }),
        createHero: builder.mutation({
            query: hero => ({
                url: '/heroes', // где будет проводиться мутация
                method: 'POST',
                body: hero // тело запроса (и переданный в него объект сразу преврщается в json)
            }),
            invalidatesTags: ['Heroes'] // тег где будет происходить мутация и откуда придут актуальные данные
        }),
        deleteHero: builder.mutation({
            query: id => ({
                url: `/heroes/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Heroes']
        })
    })
})

export const {useGetHeroesQuery, useCreateHeroMutation, usedeleteHeroMutation} = apiSlice;