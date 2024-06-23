import { Request } from "express";
import { Document } from "mongoose";

// export interface ICart {
//   items: cartItem[];
// }

// interface cartItem {
//   productId: string | ObjectId;
//   quantity: number;
// }

// export interface Iuser {
//   name: string;
//   email: string;
//   cart: ICart;
//   userId: ObjectId;
//   addToCart(product: IProduct): Promise<void>;
//   getCart(): any;
//   deleteItemFromCart(id: string): any;
//   addOrder(): any;
//   getOrders(): any;
// }

export interface userReq extends Request {
  user?: Document;
}
