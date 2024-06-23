import { ObjectId, Schema, Document, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  cart: {
    items: [
      {
        productId: ObjectId;
        quantity: number;
      }
    ];
  };
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

const User = model<IUser>("User", userSchema);
export default User;
