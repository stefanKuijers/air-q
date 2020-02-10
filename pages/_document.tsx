import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    render() {
        return (
            <html lang="en">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
