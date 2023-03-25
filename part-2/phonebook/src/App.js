import { useEffect, useState } from 'react'
import Filter, { PersonData, PersonForm, Notification } from './component';
import connect from './connectBackend';

// base url for database is localhost:3001/persons

const App = () => {
  // states
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("")
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    connect
      .getAll()
      .then(r => setPersons(r));
  }, []);
  const handleNameData = (e) => setNewName(e.target.value);
  const handlePhoneData = (e) => setNewNumber(e.target.value);
  const handleFilter = (e) => setFilter(e.target.value)

  const insertData = (newName, newNumber) => {
    const newData = {
      "name": newName,
      "number": newNumber
    }
    // names will an array that collect name's from our previous array 'person'
    let names = persons.map(obj => obj.name);
    if (names.includes(newName)) {
      const isReplace = window.confirm(`${newName} already added to phonebook, replace the old number with new one?`);
      if (isReplace) {
        let id;
        persons.forEach((obj) => {
          if (obj.name === newName) {
            id = obj.id;
          }
        });
        newData.id = id;
        connect.update(id, newData);
        setPersons(persons.map((obj) => obj.id === id ? newData : obj));
        setMsg(`Updated ${newName}`);
        setTimeout(() => setMsg(null), 3000);
      } else {
        console.log("request to update number is rejected");
      }
    }
    else {
      connect
        .create(newData)
        .catch('unable to insert data');
      let newObj = {
        name: newName,
        number: newNumber,
        id: persons[persons.length - 1].id + 1
      }
      setPersons([
        ...persons,
        newObj
      ]);
      setMsg(`Added ${newData.name}`);
      setTimeout(() => setMsg(null), 3000);
    }
    setNewName('');
    setNewNumber('');
  }
  const handleDelete = (person) => {
    const isDelete = window.confirm(`Delete ${person.name}`);
    if (isDelete) {
      connect
        .deleteObj(person.id)
        .then(() => {
          setMsg(`${person.name} contact is deleted`);
          setTimeout(() => setMsg(null), 3000);
        })
        .catch((error) => {
          console.log(error);
          setMsg('some error occurred check console for detail');
          setTimeout(() => {
            setMsg(null)
          }, 3000);
        });
      setPersons(persons.filter((obj) => {
        return obj.id !== person.id
      }));
    }

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={msg} />
      <Filter filterState={filter} handleChange={handleFilter} />

      <h2>add a new</h2>
      <PersonForm handleNameData={handleNameData} handlePhoneData={handlePhoneData} newName={newName} newNumber={newNumber} insertData={insertData} />

      <h2>Numbers</h2>
      <PersonData handleDelete={handleDelete} filterState={filter} persons={persons} />

    </div>
  )
}

export default App;