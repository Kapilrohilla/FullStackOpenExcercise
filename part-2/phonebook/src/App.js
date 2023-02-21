import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 }
  ]) 

  const [newName, setNewName] = useState('');
  const [newNumber,setNewNumber] = useState('')
  const nameData = (e) => {
    setNewName(e.target.value);
  }
  const phoneData = (e) => {
    setNewNumber(e.target.value);
  }

  const insertData = () => {
    // names will an array that collect name's from our previous array 'person'
    let names = persons.map(obj=>obj.name);
    // alert condition
    if(names.includes(newName)) alert(`${newName} already added to phonebook`)
    else if(newName.length > 0){
      let newObj = {
        name: newName,
        number: newNumber,
        id: persons[persons.length-1].id+1
      }
        setPersons([
          ...persons,
          newObj
        ])
    }
    setNewName('');
    setNewNumber('');
  }

  const presentData = (e) => e.preventDefault();

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={presentData}>
        <div>
          name: <input value={newName} onChange={nameData}/> <br /><br />
        </div>
        <div>
          number: <input value={newNumber} onChange={phoneData}/> 
        </div>
        <div>
          <button type="submit" onClick={insertData}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div className="data">
        {
          persons.map((data)=>{
             return <p key={data.id}>{data.name}  {data.number}</p> // use of name as key is suggested in quesion
          }) 
        }
      </div>
    </div>
  )
}

export default App;
