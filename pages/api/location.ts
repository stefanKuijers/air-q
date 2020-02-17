import { NextApiRequest, NextApiResponse } from 'next';
import { Db } from 'mongodb';

import { execute } from '../../data/mongodb/driver';

interface Location {
    name: string;
    value: number;
}

interface Response {
    locations?: Location[] | string;
    message?: string;
}

async function get(res: NextApiResponse<Response>): Promise<void> {
    await execute(async (db: Db): Promise<void> => {
        const locations = await db
            .collection('locations')
            .find({})
            .toArray();

        res.status(200).json({
            locations: locations,
        });
    }, res);
}

async function post(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
    console.log(req.body);
    await execute(
        async (db: Db): Promise<void> => {
            const action = req.body.id ? 'update' : 'insert';
            await db.collection('locations').insert(req.body);

            res.status(200).json({
                message: action,
            });
        },
    );
}

export default async (req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> => {
    switch (req.method) {
        case 'GET':
            await get(res);
            break;
        case 'POST':
            post(req, res);
            break;
        default:
            res.status(405).end(); //Method Not Allowed
            break;
    }
};
