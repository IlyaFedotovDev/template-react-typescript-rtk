import React from 'react';
import Container from '@/components/UI/container/Container';
import PostList from '@/components/PostList';

const Home = (): JSX.Element => {
    return (
        <>
            <Container>
                <h1>Home Page</h1>
                <PostList />
            </Container>
        </>
    );
};

export default Home;
