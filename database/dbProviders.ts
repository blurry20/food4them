import { db } from '.';
import { Provider } from '../models';
import { IProvider } from '../interfaces';

export const getAllProviders = async(): Promise<IProvider[]> => {

    await db.connect();
    const providers = await Provider.find().lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify( providers ) );

}


