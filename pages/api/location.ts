import { NextApiRequest, NextApiResponse } from 'next';
import driver from '../../data/mongodb/driver';

interface Location {
    name: string;
    value: number;
}

interface Response {
    locations: Location[];
}

export default async (_req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> => {
    const db = await driver.getDb();

    const collection = await db.collection('locations');
    const locations = await collection.find({}).toArray();

    res.status(200).json({
        locations: locations,
    });
};
