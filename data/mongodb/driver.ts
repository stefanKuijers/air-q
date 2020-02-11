import { MongoClient, Db } from 'mongodb';
import { NextApiResponse } from 'next';

type Query = (db: Db) => Promise<void>;

interface Driver {
    execute(query: Query, res: NextApiResponse): Promise<void>;
}

const driver = (function(): Driver {
    let cachedDb: Db | null = null;

    function handleError(error: Error, res?: NextApiResponse): void {
        if (res) {
            res.status(500).json({
                error: error.message,
            });
        }

        throw error;
    }

    // TODO: what is two classes call it 1 ms after eachother. there will be two connections
    async function getDb(res?: NextApiResponse): Promise<Db | null> {
        if (cachedDb) {
            return cachedDb;
        }

        if (!process.env.MONGODB_URI || !process.env.MONGODB_NAME) {
            handleError(new Error('missing database connection vars from process.env'), res);

            return null;
        }

        const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
        const db = client.db(process.env.MONGODB_NAME);
        cachedDb = db;

        return db;
    }

    async function execute(query: Query, res?: NextApiResponse): Promise<void> {
        const db = await getDb(res);

        if (db) {
            await query(db);
        }
    }

    getDb(); // pre-fetching the database connection seems to speed up the api requests

    return {
        execute,
    };
})();

export default driver;
