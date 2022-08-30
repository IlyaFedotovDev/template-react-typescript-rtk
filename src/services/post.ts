import { IPost } from '@/models/IPost';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
    endpoints: (builder) => ({
        getPosts: builder.query<IPost[], void>({
            query: () => `/posts`,
        }),
    }),
});

export const { useGetPostsQuery } = postAPI;
