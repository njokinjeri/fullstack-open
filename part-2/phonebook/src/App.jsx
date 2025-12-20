import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './service/persons';
import Notification from './components/Notification';

const App = () => {
    const [persons ,setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [number, setNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        console.log('effect')
        personService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          });
    },[])

    const handleNameChange = (e) => setNewName(e.target.value);
    const handleNumberChange = (e) => setNumber(e.target.value);
    const handleFilterChange = (e) => setFilter(e.target.value);
    const handleDelete = (id, name) => {
        if (window.confirm(`Delete ${name}`)) {
            personService
              .remove(id)
              .then(() => {
                setPersons(persons.filter(person => person.id !== id));
              })
              .catch(error => {
                alert(`The person ${name} was already removed from the server.` )
                setPersons(persons.filter(person => person.id !== id));
              });
        }
    };

    const addNewName = (e) => {
        e.preventDefault();

        const existingPerson = persons.find(person => person.name === newName);
        const newPerson = {
            name: newName,
            number: number,
        };

        if (existingPerson){
          const confirmUpdate = window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          );

          if (confirmUpdate) {
            personService
              .update(existingPerson.id, newPerson)
              .then(updatedPerson => {
                setPersons(persons.map(person =>
                  person.id !== existingPerson.id ? person : updatedPerson
                ));
                setNewName('');
                setNumber('');
                setSuccessMessage(`Updated ${newName}'s number`)
                setTimeout(() => {
                  setSuccessMessage(null)
                }, 5000)
              })
              .catch(error => {
                setErrorMessage(`Information of ${newName} has already been removed from the server.`);
                setPersons(persons.filter(p => p.id !== existingPerson.id));
                setTimeout(() => {
                  setErrorMessage(null);
                }, 5000);
              });
          }
          return;
        }
        
        personService
          .create(newPerson)
          .then(returnedPerson => {
            setPersons([...persons, returnedPerson]);
            setNewName('');
            setNumber('');
            setSuccessMessage(`Added '${returnedPerson.name}'`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000);
          })
          .catch(error => {
            setErrorMessage(error.response.data.error)
            console.log(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
    };

    const filteredPersons = persons.filter( person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />

            <h2>Add a new</h2>
            <Notification message={successMessage} type="success" />
            <Notification message={errorMessage} type="error" />

            <PersonForm 
              addNewName={addNewName}
              newName={newName}
              handleNameChange={handleNameChange}
              number={number}
              handleNumberChange={handleNumberChange}
            />

            <h2>Numbers</h2>
            <Persons persons={filteredPersons} handleDelete={handleDelete} />
        </div>
    )
}



export default App
