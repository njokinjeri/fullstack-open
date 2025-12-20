require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.use(express.static('dist'))


morgan.token('postData', (request) => {
    if (request.method === 'POST') return ' ' + JSON.stringify(request.body)
    else return ' '
})

app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :postData'
))

const errorHandler = (err, req, res, next) => {
    console.error(err.message)

    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    } 
    next(err)
}

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/info', (req, res) => {
    Person.countDocuments({}).then(count => {
        res.send(
            `Phonebook has info for ${count} people<br>${new Date()}`
        )
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) res.json(person)
            else res.status(404).end()
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const {name, number} = req.body

    if (!name || !number) {
        return res.status(400).json({
            error: 'name or number is missing'
        })
    }
    
    Person.findOne({ name })
        .then(existing => {
            if (existing) {
                return res.status(400).json({ error: 'name must be unique' });
            }

            const person = new Person({ name, number })
            return person.save()
        })
        .then(savedPerson => {
            if (savedPerson) { 
                res.json(savedPerson)
            }
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body

    console.log('PUT request received')
    console.log('ID:', req.params.id)
    console.log('Number:', number)

    Person.findById(req.params.id)
        .then(person => {
            if (!person) {
                console.log('Person is null - returning 404')
                return res.status(404).end()
            }
            
            person.name = name
            person.number = number

            return person.save()
        })
        .then((updatedPerson) => {
            if (updatedPerson) {
                console.log('Person saved:', updatedPerson)
                res.json(updatedPerson)
            }
        })
        .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

 
