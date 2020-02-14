import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    render() {
        return (
            <html lang="en">
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="theme-color" content="#72B340" />
                    <meta name="description" content="air q demo app" />
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
