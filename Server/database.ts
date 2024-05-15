import mongoose from "mongoose";

export async function connectToDatabase() {
  await mongoose.connect("mongodb://localhost/weather");
}

export function setDatabaseDefaults() {
  mongoose.set({
    toObject: {
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  });
}

// export function connectMongoSession() {
//   const MongoDBStore = connectMongoSession();
//   const store = new MongoDBStore({
//     url: "mongodb://localhost/weather",
//     collections: "sessions",
//   });
//   return store;
// }
