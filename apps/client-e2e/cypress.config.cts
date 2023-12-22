import { nxE2EPreset } from "@nx/cypress/plugins/cypress-preset";
import { defineConfig } from "cypress";
import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb://e2e:DontTellAnyoneThisPassword@localhost:27017",
);

export const connectMongo = async () => {
  await client.connect();
  return client;
};

export const disconnectMongo = async () => {
  await client.close();
};

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    baseUrl: "http://localhost:4200/nl",
    setupNodeEvents(on) {
      on("task", {
        async clearDB() {
          const db = await connectMongo();
          await db.db("E2E-Deals-Auth").dropDatabase();
          await db.db("E2E-Deals-Session").dropDatabase();
          return null;
        },
      });
    },
    video: true,
  },
});
