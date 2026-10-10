import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const globalWithMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("MONGODB_URI is not set");
}

const client = globalWithMongo.mongoClient ?? new MongoClient(mongoUri);

// Reusing the client across dev reloads keeps connections from piling up.
if (process.env.NODE_ENV !== "production") {
  globalWithMongo.mongoClient = client;
}

export const auth = betterAuth({
  database: mongodbAdapter(client.db(), { client }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
