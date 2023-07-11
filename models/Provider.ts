import mongoose, { Schema, model, Model } from 'mongoose';
import { IProvider } from '../interfaces/provider';


const providerSchema = new Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String },

},{
    timestamps: true
});

const Provider:Model<IProvider> = mongoose.models.Provider || model('Provider',providerSchema);

export default Provider;