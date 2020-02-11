import { NextApiRequest, NextApiResponse } from 'next';
import { Db } from 'mongodb';

import { execute } from '../../data/mongodb/driver';

interface Location {
    name: string;
    value: number;
}

interface Response {
    locations?: Location[] | string;
}

export default async (_req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> => {
    await execute(async (db: Db): Promise<void> => {
        const locations = await db
            .collection('locations')
            .find({})
            .toArray();

        res.status(200).json({
            locations: locations,
        });
    }, res);
};
