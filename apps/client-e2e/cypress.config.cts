import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';
import { connectMongo } from './src/support/mongo.cts';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on) {
      on('task', {
        async clearDB() {
          const db = await connectMongo();
          await db.db('Deals-Auth').dropDatabase();
          await db.db('Deals-Session').dropDatabase();
          return null;
        },
      });
    },
  },
});
