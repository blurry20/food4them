export interface IProvider {
    _id: string;
    name: string;
    email: string;
    contact: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    createdAt?: string;
    updatedAt?: string;
}