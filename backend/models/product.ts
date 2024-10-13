import mongoose, { Document, Schema } from "mongoose";



export interface IProduct extends Document {
    title: string;
    description: string;
    product_img: String,
  


}

const ProductSchema: Schema<IProduct> = new mongoose.Schema({
    title: {
        type: String,

    },
    description: {
        type: String,

    },
    product_img: {
        required: false,
        type: String,
    },


});

// Encrypting password before saving the user


export default mongoose.models.Product ||
    mongoose.model<IProduct>("Product", ProductSchema);
