const Filter = ({ filterState, handleChange }) => {
    return (
        <div>
            filter shown with <input value={filterState} onChange={handleChange} />
        </div>
    )
}

const PersonForm = ({ handleNameData, handlePhoneData, newName, newNumber, insertData }) => {

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div>
                name: <input value={newName} onChange={handleNameData} /> <br /><br />
            </div>
            <div>
                number: <input value={newNumber} onChange={handlePhoneData} />
            </div>
            <div>
                <button type="submit" onClick={() => insertData(newName, newNumber)}>add</button>
            </div>
        </form>
    )
}

const PersonData = ({ filterState, persons, handleDelete }) => {

    return (
        <div className="data">
            {persons.filter(person => {
                const regex = new RegExp(filterState, "i")
                return regex.test(person.name)
            }).map(person => {
                return <p key={person.id}> {person.name} {person.number} &nbsp;
                    <button onClick={() => handleDelete(person)}>delete</button></p>
            })}
        </div>
    )
}
const Notification = ({ message, status }) => {
    const fail = {
        fontSize: '30px',
        padding: '10px 5px',
        color: 'red',
        border: '5px solid red',
        marginInline: '5px',
        width: 'fit-content',
        backgroundColor: 'rgb(200,200,200)',
        fontFamily: 'monospace'
    }
    const success = {
        fontSize: '30px',
        padding: '10px 5px',
        color: 'green',
        border: '5px solid green',
        marginInline: '5px',
        width: 'fit-content',
        backgroundColor: 'rgb(200, 200, 200)',
        fontFamily: 'monospace'
    }
    if (message === null) return null
    return (
        <p style={status ? success : fail}>{message}</p>
    )
}
export default Filter;
export { PersonForm, PersonData, Notification };