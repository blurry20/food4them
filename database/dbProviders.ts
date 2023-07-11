import { db } from '.';
import { IProvider } from '../interfaces/provider';
import Provider from '../models/Provider';


export const getAllProviders = async(): Promise<IProvider[]> => {

    await db.connect();
    const providers = await Provider.find().lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify( providers ) );

}

