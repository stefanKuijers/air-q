import Head from 'next/head';
import { ReactNode } from 'react';

import Header from './Header';

interface Props {
    children: ReactNode;
}

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD',
};

const Layout: React.FunctionComponent<Props> = (props: Props) => (
    <>
        <Head>
            <title>air-q</title>
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#72B340" />
            <meta name="description" content="air q demo app" />
        </Head>

        <main style={layoutStyle}>
            <Header />

            {props.children}
        </main>
    </>
);

export default Layout;
