import {MongoClient} from 'mongodb';

const client = new MongoClient('mongodb://e2e:whatever@localhost:27017');

export const connectMongo = async () => {
  await client.connect();
  return client;
}

export const disconnectMongo = async () => {
  await client.close();
}
