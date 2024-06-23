import mongoose, { Schema, model } from "mongoose";
import { IpcNetConnectOpts } from "net";

export interface IProduct {
  title: string;
  price: string;
  description: string;
  imageUrl: string;
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
