import React from 'react';
import { IPost } from '@/models/IPost';
import style from './Post.module.scss';

interface PostProps {
    data: IPost;
}

const Post = (props: PostProps) => {
    return (
        <div className={style.post}>
            <h2>{props.data.title}</h2>
            <p>{props.data.body}</p>
        </div>
    );
};

export default Post;
