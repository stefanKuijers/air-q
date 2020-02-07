import { NextPage } from 'next';
import Link from 'next/link';

import Layout from '../components/Layout';

interface PostProps {
    id: string;
}

const PostLink: React.FunctionComponent<PostProps> = ({ id }: PostProps) => {
    return (
        <li>
            <Link href={`/dynamic/[id]`} as={`/dynamic/${id}`}>
                <a>{id}</a>
            </Link>
        </li>
    );
};

const Blog: NextPage = () => (
    <Layout>
        <h1>Blog</h1>
        <ul>
            <PostLink id="hello-nextjs" />
            <PostLink id="learn-nextjs" />
            <PostLink id="deploy-nextjs" />
        </ul>
    </Layout>
);

export default Blog;
