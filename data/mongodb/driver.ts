import { MongoClient, Db } from 'mongodb';

interface Driver {
    getDb(): Promise<Db>;
}

const driver = (function(): Driver {
    let cachedDb: Db | null = null;

    async function getDb(): Promise<Db> {
        if (cachedDb) {
            return cachedDb;
        }

        if (!process.env.MONGODB_URI || !process.env.MONGODB_NAME) {
            throw new Error('missing database connection vars from process.env');
        }

        // If no connection is cached, create a new one
        const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

        // Select the database through the connection,
        // using the database path of the connection string
        const db = await client.db(process.env.MONGODB_NAME);

        // Cache the database connection and return the connection
        cachedDb = db;
        return db;
    }

    return {
        getDb,
    };
})();

export default driver;
