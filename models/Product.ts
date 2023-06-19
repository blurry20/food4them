import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '../interfaces';


const productSchema = new Schema({
    description: { type: String, required: true, default: '' },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [{
        type: String,
        enum: {
            values: ['5kg','10kg','15kg','20kg','25kg','30kg','35kg','40kg','45kg','50kg'],
            message: '{VALUE} no es un tamaño válido'
        }
    }],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true, default: '' },
    type: {
        type: String,
        enum: {
            values: ['alimento','juguete','accesorios'],
            message: '{VALUE} no es un tipo válido'
        },
        default: 'alimento'
    },
    mascot: {
        type: String,
        enum: {
            values: ['dog','cat','birds','exotics'],
            message: '{VALUE} no es un genero válido'
        },
        default: 'dog'
    }
},{
    timestamps: true
});


productSchema.index({ title: 'text', tags: 'text' });


const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema );


export default Product;