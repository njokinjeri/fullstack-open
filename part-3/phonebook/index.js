require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message)
        process.exit(1);
    });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);


app.use(express.static('dist'));
app.use(express.json());

morgan.token('postData', (request) => {
    if (request.method === 'POST') return ' ' + JSON.stringify(request.body);
    else return ' ';
});

app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :postData'
));

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    });
});

app.get('/info', (req, res) => {
    Person.countDocuments({}).then(count => {
        res.send(
            `Phonebook has info for ${count} people<br>${new Date()}`
        );
    });
});

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) res.json(person);
            else res.status(404).end();
        })
        .catch(() => res.status(400).send({ error: 'malformatted id'}));
});

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => res.status(204).end())
        .catch(() => res.status(400).send({error: 'malformatted id'}));
});

app.post('/api/persons', (req, res) => {
    const {name, number} = req.body;

    if (!name || !number) {
        return res.status(400).json({
            error: 'name or number is missing'
        });
    }
    
    Person.findOne({ name }).then(existing => {
        if (existing) {
            return res.status(400).json({ error: 'name must be unique' });
        }

        const person = new Person({ name, number });
        person.save().then(savedPerson => {
        res.json(savedPerson);
        }); 
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 
