export interface IProduct {
    _id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ISize[];
    slug: string;
    tags: string[];
    title: string;
    type: IType;
    mascot: 'dog'|'cat'|'birds'|'exotics'

    // TODO: agregar createdAt y updatedAt
    createdAt: string;
    updatedAt: string;

}

export type ISize = '5kg'|'10kg'|'15kg'|'20kg'|'25kg'|'30kg'|'35kg'|'40kg'|'45kg'|'50kg';
export type IType = 'alimento'|'juguete'|'accesorios';
