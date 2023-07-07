import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Provider } from '../../../models';
import { IProvider } from '../../../interfaces/provider';

type Data = IProvider[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    await db.connect();
    const providers = await Provider.find().lean();
    await db.disconnect();

    return res.status(200).json(providers);
  } catch (error) {
    return res.status(500).json([]);
  }
}
