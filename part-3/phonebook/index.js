require('dotenv').config();
const express = require('express');
const Person = require('./models/person');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use(express.static('dist'));


morgan.token('postData', (request) => {
    if (request.method === 'POST') return ' ' + JSON.stringify(request.body);
    else return ' ';
});

app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :postData'
));

const errorHandler = (err, req, res, next) => {
    console.error(err.message);

    if (err.name === 'CastError') {
        return res.status(400).send({ err: 'malformatted id'})
    }
    next(err)
}

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

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) res.json(person);
            else res.status(404).end();
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
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

app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

 
