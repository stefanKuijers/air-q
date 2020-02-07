import { NextPage } from 'next';

import Layout from '../components/Layout';

interface Props {
    userAgent: string | undefined;
}

const Home: NextPage<Props> = ({ userAgent }: Props) => {
    return (
        <Layout>
            <h1>Home</h1>
            <p>{userAgent}</p>
        </Layout>
    );
};

Home.getInitialProps = async ({ req }): Promise<Props> => {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    return { userAgent };
};

export default Home;
