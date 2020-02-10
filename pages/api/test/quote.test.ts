import { getQuote } from '../quote';

const rawQuotes = [
    {
        quote: 'Write tests, not too many, mostly integration',
        author: 'Guillermo Rauch',
    },
    {
        quote: 'The future is serverless',
        author: 'Guillermo Rauch',
    },
    {
        quote: 'Where there is a will, there is a way',
        author: 'Unknown',
    },
    {
        quote: 'You Learn More From Failure Than From Success. Don’t Let It Stop You. Failure Builds Character.',
        author: 'Unknown',
    },
    {
        quote: 'Every passing moment, we are nearing death and a new Javascript framework',
        author: 'Amandeep Singh',
    },
];

describe('api/quote', () => {
    it('should return a random quote without params', () => {
        const quote = getQuote(rawQuotes);
        expect(quote).toHaveProperty('quote');
        expect(quote).toHaveProperty('author');
    });

    it('should return a quote of unknown author when querying for an author which there is not quote from', () => {
        const quote = getQuote(rawQuotes, {
            author: 'Rauch',
        });
        expect(quote.author).toBe('Guillermo Rauch');
    });

    it('should return a quote of unknown author when querying for an author which there is not quote from', () => {
        const quote = getQuote(rawQuotes, {
            author: 'Mute Wise Man',
        });
        expect(quote.author).toBe('Unknown');
    });
});
