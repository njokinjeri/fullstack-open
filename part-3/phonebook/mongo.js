const mongoose = require('mongoose');

if (process.argv.length < 5) {
  console.log('Usage: node mongo.js <password> <name> <number>');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.h7f8sce.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
    return new Person({ name, number }).save();
  })
  .then(() => {
    console.log(`Added ${name} ${number} to phonebook!`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('MongoDB error:', err.message);
    mongoose.connection.close();
  });
