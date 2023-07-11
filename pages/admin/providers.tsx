import { NextApiRequest, NextApiResponse } from 'next';
import { Types } from 'mongoose';
import { IProvider } from '../../interfaces';
import { db } from '../../database';
import { Provider } from '../../models';

type Data = {
  providers?: IProvider[];
  error?: string;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    await db.connect();

    if (req.method === 'GET') {
      // Retrieve all providers
      const providers = await Provider.find().lean() as IProvider[];
      await db.disconnect();

      return res.status(200).json({ providers });
    } else if (req.method === 'POST') {
      // Create a new provider
      const newProvider = req.body; // Assuming the request body contains the new provider data
      const provider = await createProvider(newProvider);
      await db.disconnect();

      return res.status(201).json({ providers: [provider] });
    } else if (req.method === 'PUT') {
      // Update an existing provider
      const providerId = req.query.id; // Assuming the provider ID is passed as a query parameter

      if (typeof providerId !== 'string' || !Types.ObjectId.isValid(providerId)) {
        return res.status(400).json({ error: 'Invalid provider ID' });
      }

      const updatedProvider = req.body; // Assuming the request body contains the updated provider data
      const provider = await Provider.findByIdAndUpdate(providerId, updatedProvider, { new: true }).lean() as IProvider;
      await db.disconnect();

      if (provider) {
        return res.status(200).json({ providers: [provider] });
      } else {
        return res.status(404).json({ error: 'Provider not found' });
      }
    } else if (req.method === 'DELETE') {
      // Delete multiple existing providers
      const { selectedRows } = req.body; // Assuming selectedRows is an array of provider IDs

      if (!Array.isArray(selectedRows)) {
        return res.status(400).json({ error: 'Invalid request' });
      }

      const deleteResult = await Provider.deleteMany({ _id: { $in: selectedRows } });
      await db.disconnect();

      if (deleteResult.deletedCount > 0) {
        return res.status(200).json({ message: 'Providers deleted successfully' });
      } else {
        return res.status(404).json({ error: 'Providers not found' });
      }
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error); // Log the error
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const createProvider = async (providerData: IProvider): Promise<IProvider> => {
  try {
    // Exclude the _id field from the providerData
    const { _id, ...dataWithoutId } = providerData;

    const provider = new Provider(dataWithoutId); // Create a new instance of the Provider model
    await provider.save(); // Save the provider to the database

    return provider;
  } catch (error) {
    console.error(error); // Log the error
    throw new Error('Error creating provider');
  }
};