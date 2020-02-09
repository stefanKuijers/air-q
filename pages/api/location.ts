import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';

interface Location {
    name: string;
    value: number;
}

interface Response {
    data?: string;
    locations?: Location[];
    error?: string;
    env?: {
        uri: string | undefined;
        name: string | undefined;
    };
}

// Create cached connection variable
let cachedDb: Db | null = null;

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
async function connectToDatabase(uri: string, databaseName: string): Promise<Db> {
    // If the database connection is cached,
    // use it instead of creating a new connection
    if (cachedDb) {
        return cachedDb;
    }

    // If no connection is cached, create a new one
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });

    // Select the database through the connection,
    // using the database path of the connection string
    const db = await client.db(databaseName);

    // Cache the database connection and return the connection
    cachedDb = db;
    return db;
}

export default async (req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> => {
    if (!process.env.MONGODB_URI || !process.env.MONGODB_NAME) {
        res.status(200).json({
            error: 'missing database connection vars from process.env',
            env: {
                uri: process.env.MONGODB_URI,
                name: process.env.MONGODB_NAME,
            },
        });

        return;
    }
    // Get a database connection, cached or otherwise,
    // using the connection string environment variable as the argument
    const db = await connectToDatabase(process.env.MONGODB_URI, process.env.MONGODB_NAME);

    // Select the "users" collection from the database
    const collection = await db.collection('locations');

    // Select the users collection from the database
    const locations = await collection.find({}).toArray();
    // await collection.insert({
    //     name: 'home',
    //     value: Math.random(),
    // });
    // const count = await collection.count();

    res.status(200).json({
        locations: locations,
    });
};
