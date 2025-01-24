const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_ADDRESS);
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

module.exports = connectDb;
