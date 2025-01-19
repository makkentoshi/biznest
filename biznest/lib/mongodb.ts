import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

declare global {
  var mongoClient: MongoClient | undefined;
}

let cachedClient: MongoClient | undefined;

async function connectToDatabase() {
  // Если соединение уже есть, используем его
  if (cachedClient) {
    console.log('Using cached MongoDB connection');
    return cachedClient;
  }

  // Если глобального клиента нет, создаем новый
  if (!global.mongoClient) {
    console.log('Creating new MongoDB connection');
    global.mongoClient = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Таймаут подключения 30 секунд
      socketTimeoutMS: 45000, // Таймаут сокета 45 секунд
    });
  }

  try {
    cachedClient = global.mongoClient;
    console.log('Connecting to MongoDB...');
    await cachedClient.connect(); // Подключаемся к MongoDB
    console.log('Successfully connected to MongoDB!');

    // Проверка подключения
    await cachedClient.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');

    return cachedClient;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export default connectToDatabase;