import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('');

  const data = (e) => {
    setNewName(e.target.value);
  }

  const insertData = () => {
    // names will an array that collect name's from our previous array 'person'
    let names = persons.map(obj=>obj.name);
    // alert condition
    if(names.includes(newName)) alert(`${newName} already added to phonebook`)
    else if(newName.length > 0){
        setPersons([
          ...persons,
          {name: newName}
        ])
    }
    setNewName('');
  }
  
  const presentData = (e) => e.preventDefault();

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={presentData}>
        <div>
          name: <input value={newName} onChange={data}/>
        </div>
        <div>
          <button type="submit" onClick={insertData}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div className="data">
        {
          persons.map((data)=>{
             return <p key={data.name}>{data.name}</p> // use of name as key is suggested in quesion
          }) 
        }
      </div>
    </div>
  )
}

export default App;
