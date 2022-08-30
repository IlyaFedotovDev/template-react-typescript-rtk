import React from 'react';
import { useGetPostsQuery } from '@/services/post';
import Post from './Post';

const PostList = () => {
    const { data: posts, isLoading } = useGetPostsQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {posts?.map((item) => (
                <Post key={item.id} data={item} />
            ))}
        </div>
    );
};

export default PostList;
