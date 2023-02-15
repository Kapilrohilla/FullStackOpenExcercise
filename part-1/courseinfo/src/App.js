// header componenet 
const Header = (something) => {
  return (
  <h1>{something.course}</h1>
  )
} 

const Part = (prop) =>{
  return (
    <>
      <p>{prop[0].name} {prop[0].exercises}</p>
      <p>{prop[1].name} {prop[1].exercises}</p>
      <p>{prop[2].name} {prop[2].exercises}</p>
    </>
  )
}
const Total = (prop) =>{
 return (
   <p>Number of excercise {prop.exercises1 + prop.exercises2 + prop.exercises3}</p>
 )
}

function App() {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div>
      <Header course={course}/> 
      <Part {...[part1,part2,part3]} />
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} /> 
    </div>
  );
}

export default App;