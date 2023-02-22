import { useState } from 'react'
const App = () => {
  // states
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456', id: 1 }])
  const [filter, setFilter] = useState("")
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('')

  const handleNameData = (e) => setNewName(e.target.value);
  const handlePhoneData = (e) => setNewNumber(e.target.value);
  const handleFilter = (e) => setFilter(e.target.value)

  const insertData = () => {
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

  const presentData = (e) => e.preventDefault();

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilter} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={presentData}>
        <div>
          name: <input value={newName} onChange={handleNameData} /> <br /><br />
        </div>
        <div>
          number: <input value={newNumber} onChange={handlePhoneData} />
        </div>
        <div>
          <button type="submit" onClick={() => insertData()}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div className="data">
        {persons.filter(person => {
          const regex = new RegExp(filter, "i")
          return regex.test(person.name)
        }).map(person => {
          return (<p key={person.id}>{person.name} {person.number}</p>)
        })}
      </div>
    </div>
  )
}

export default App;