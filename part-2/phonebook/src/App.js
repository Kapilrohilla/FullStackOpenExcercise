import { useState } from 'react'
/*
  error in inserting data 
  now inserting require 2 add Btn click while i want only one
*/
const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456', id: 1 }]) 

  const [newName, setNewName] = useState('');
  const [newNumber,setNewNumber] = useState('')
  const [dataToShow,setDataToShow] = useState( 
    persons.map(data=> <p key={data.id}>{data.name}  {data.number}</p>) 
  )
  const nameData = (e) => setNewName(e.target.value);
  const phoneData = (e) => setNewNumber(e.target.value);
  const filterData = (e) => {
    let regex = new RegExp(e.target.value,'gi');
    setDataToShow(
      persons.map((obj)=>{
        if(regex.test(obj.name)){
          return <p key={obj.id}>{obj.name} {obj.number}</p>
        }
        return null;
      })
    )
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
      ]);
    }
    setDataToShow(
      persons.map(data=> <p key={data.id}>{data.name} {data.number}</p>)
    )
    setNewName('');
    setNewNumber('');
    console.log('data displayed');
  }

  const presentData = (e) => e.preventDefault();

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={filterData}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={presentData}>
        <div>
          name: <input value={newName} onChange={nameData}/> <br /><br />
        </div>
        <div>
          number: <input value={newNumber} onChange={phoneData}/> 
        </div>
        <div>
          <button type="submit" onClick={()=>insertData()}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div className="data">
        {dataToShow}
      </div>
    </div>
  )
}

export default App;