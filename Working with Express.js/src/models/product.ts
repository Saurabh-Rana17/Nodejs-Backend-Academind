import mongoose, { ObjectId, Schema, model } from "mongoose";
import { IpcNetConnectOpts } from "net";

export interface IProduct {
  title: string;
  price: string;
  description: string;
  imageUrl: string;
  userid: ObjectId;
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
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
