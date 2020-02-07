import { NextApiRequest, NextApiResponse } from 'next';

import rawQuotes from '../../quotes.json';

interface Quote {
    quote: string;
    author: string;
}

export default (req: NextApiRequest, res: NextApiResponse<Quote>): void => {
    const query = req.query;
    let quotes = rawQuotes;

    if (query.author) {
        const author = query.author as string;
        quotes = quotes.filter(quote => quote.author.toLowerCase().includes(author.toLowerCase()));
    }
    if (!quotes.length) {
        quotes = rawQuotes.filter(quote => quote.author.toLowerCase() === 'unknown');
    }

    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    res.status(200).json(quote);
};
