import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek');
    console.log(
      'Datebase connected: ',
      connect.connection.host,
      connect.connection.name,
    );
  } catch {
    console.log('Ошибка подключения базы');
    process.exit(1);
  }
};

export default connectDb;
