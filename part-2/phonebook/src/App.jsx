import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'

const App = () => {
    const [persons ,setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]);
    
    const [newName, setNewName] = useState('')
    const [number, setNumber] = useState('')
    const [filter, setFilter] = useState('')

    const handleNameChange = (e) => setNewName(e.target.value);
    const handleNumberChange = (e) => setNumber(e.target.value);
    const handleFilterChange = (e) => setFilter(e.target.value);

    const addNewName = (e) => {
        e.preventDefault();

        const nameExists = persons.some(person => person.name === newName);
        if (nameExists) {
            alert(`${newName} is already added to phonebook`);
            return;
        }
        const newPerson = {
            name: newName,
            number: number,
            id: persons.length + 1
        };

        setPersons([...persons, newPerson]);
        setNewName('');
        setNumber('');
    };

    const filteredPersons = persons.filter( person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />

            <h2>Add a new</h2>
            <PersonForm 
              addNewName={addNewName}
              newName={newName}
              handleNameChange={handleNameChange}
              number={number}
              handleNumberChange={handleNumberChange}
            />

            <h2>Numbers</h2>
            <Persons persons={filteredPersons} />
        </div>
    )
}



export default App
