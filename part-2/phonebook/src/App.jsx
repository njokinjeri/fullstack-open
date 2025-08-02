import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'

const App = () => {
    const [persons ,setPersons] = useState([]);
    
    const [newName, setNewName] = useState('')
    const [number, setNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
          })
    },[])

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
