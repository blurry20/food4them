import { ISize } from './';

export interface ICartProduct {
    _id: string;
    image: string;
    price: number;
    size?: ISize;
    slug: string;
    title: string;
    mascot: 'dog'|'cat'|'birds'|'exotics'
    quantity: number;
}
