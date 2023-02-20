
const Part = ({prop}) => {
    const parts = prop.map((element)=>
        <p key={element['id']}>{element['name']} {element['exercises']}</p>
    ); 
    return (
        <>
           {parts} 
        </>
    )

}

export const Total = ({prop}) => {
    const total = prop.reduce((sum,element)=> 
        sum+=element['exercises']
    ,0)
    return (
        <p style={{fontWeight: 600}}>total of {total} exercises</p>
    )
}
export default Part;