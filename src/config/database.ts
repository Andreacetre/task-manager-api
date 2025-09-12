import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    const uri = process.env.MONGO_URI as string;
    if (!uri) {
      throw new Error('MONGO_URI no está definido en el archivo .env');
    }
    await mongoose.connect(uri);
    console.log('Conexión a MongoDB establecida');
  } catch (error) {
    console.error(' Error conectando a MongoDB:', error);
    process.exit(1); // detener la app si falla la DB
  }
}
