import { ObjectId, Schema, model } from "mongoose";
import { IProduct } from "./product";

export interface IOrder {
  products: {
    product: IProduct;
    quantity: number;
  }[];
  user: {
    name: string;
    userId: ObjectId;
  };
}

const orderSchema = new Schema<IOrder>({
  products: [
    {
      product: {
        type: Object,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
});

const Order = model<IOrder>("Order", orderSchema);

export default Order;
