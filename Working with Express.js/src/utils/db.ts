// import { Db, MongoClient } from "mongodb";

// let _db: Db;

// export const mongoConnect = async () => {
//   if (!process.env.MONGO_URL) {
//     return null;
//   }
//   try {
//     const client = await MongoClient.connect(process.env.MONGO_URL);
//     console.log("connected to db");
//     _db = client.db("shop");
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to connect db");
//   }
// };

// export const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw "No Database Found";
// };
