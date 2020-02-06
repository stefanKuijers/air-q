import { NextPage } from 'next';

import Header from '../components/Header';

interface Props {
    userAgent: string | undefined;
}

const Home: NextPage<Props> = ({ userAgent }: Props) => {
    return (
        <div>
            <Header />

            <h1>Home</h1>
            <p>{userAgent}</p>
        </div>
    );
};

Home.getInitialProps = async ({ req }): Promise<Props> => {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    return { userAgent };
};

export default Home;
