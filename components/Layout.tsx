import Head from 'next/head';
import { ReactNode } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header';

interface Props {
    children: ReactNode;
}

const Layout: React.FunctionComponent<Props> = (props: Props) => (
    <>
        <Head>
            <title>air-q</title>
        </Head>
        <CssBaseline />

        <main>
            <Header />
            <Container fixed>{props.children}</Container>
        </main>

        <style jsx global>{`
            @font-face {
                font-family: 'Roboto';
                src: url('/fonts/Roboto-Regular.ttf');
            }
        `}</style>
    </>
);

export default Layout;
