import useSWR from 'swr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';

interface Quote {
    quote: string;
    author: string;
}

function fetcher(url: string): Promise<Quote> {
    return fetch(url).then(r => r.json());
}

const Inspiration: NextPage = () => {
    const { query } = useRouter();
    const { data, error } = useSWR(`/api/quote${query.author ? '?author=' + query.author : ''}`, fetcher);
    // The following line has optional chaining, added in Next.js v9.1.5,
    // is the same as `data && data.author`
    const author = data?.author;
    let quote = data?.quote;

    if (!data) quote = 'Loading...';
    if (error) quote = 'Failed to fetch the quote.';

    return (
        <Layout>
            <h1>Inspiration</h1>

            <main className="center">
                <div className="quote">{quote}</div>
                {author && <span className="author">- {author}</span>}

                <style jsx>{`
                    main {
                        width: 90%;
                        max-width: 900px;
                        margin: 300px auto;
                        text-align: center;
                    }
                    .quote {
                        font-family: cursive;
                        font-size: 24px;
                        padding-bottom: 10px;
                    }
                    .author {
                        font-family: sans-serif;
                        font-size: 20px;
                    }
                `}</style>
            </main>
        </Layout>
    );
};

export default Inspiration;
