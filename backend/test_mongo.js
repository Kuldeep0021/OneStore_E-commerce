import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://jew:q23mV-GjQeqpHXQ@cluster0.ulqx4iu.mongodb.net/jew?appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB');
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection failed:', err.message);
    process.exit(1);
  });
