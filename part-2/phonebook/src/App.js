import { useEffect, useState } from 'react'
import Filter, { PersonData, PersonForm } from './component';
import connect from './connectBackend';

// base url for database is localhost:3001/persons

const App = () => {
  // states
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("")
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('')
  useEffect(() => {
    connect
      .getAll()
      .then(r => setPersons(r))
  }, []);
  const handleNameData = (e) => setNewName(e.target.value);
  const handlePhoneData = (e) => setNewNumber(e.target.value);
  const handleFilter = (e) => setFilter(e.target.value)

  const insertData = (newName, newNumber) => {
    const newData = {
      "name": newName,
      "number": newNumber
    }
    connect
      .create(newData)
      .catch('unable to insert data');
    // names will an array that collect name's from our previous array 'person'
    let names = persons.map(obj => obj.name);
    // alert condition
    if (names.includes(newName)) alert(`${newName} already added to phonebook`)
    else if (newName.length > 0) {
      let newObj = {
        name: newName,
        number: newNumber,
        id: persons[persons.length - 1].id + 1
      }
      setPersons([
        ...persons,
        newObj
      ]);
    }
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterState={filter} handleChange={handleFilter} />

      <h2>add a new</h2>
      <PersonForm handleNameData={handleNameData} handlePhoneData={handlePhoneData} newName={newName} newNumber={newNumber} insertData={insertData} />

      <h2>Numbers</h2>
      <PersonData filterState={filter} persons={persons} />

    </div>
  )
}

export default App;