import './App.css';
import {useState} from "react";
import Button from './component/button';

const Stats = ({value,text,total}) => {
  if(total===0){
    return (
        <p>No feedback given</p>
    )
  }
  return (
    <>
      <p>{text} {value}</p>
    </> 
  )
}

function App() {
  const [good,setGood] = useState(0);
  const [neutral,setNeutral] = useState(0);
  const [bad,setBad] = useState(0);
  let total = good+neutral+bad;
  let average = (good-bad)/total;
  let positive = good/total*100;
  const handleGood = () => setGood(good+1);
  const handleBad= () => setBad(bad+1);
  const handleNeutal= () => setNeutral(neutral+1);
  
  return (
    <>
     <h1>Give Feedback</h1>
     <Button handleClick={handleGood} text="good"/>
     <Button handleClick={handleNeutal} text="neutral"/>
     <Button handleClick={handleBad} text="bad"/>
     <h2>Statistics</h2>
     <Stats text="good" value={good} total={total}/>
     <Stats text="neutral" value={neutral} total={total} />
     <Stats text="bad" value={bad} total={total} />
     <Stats text="average" value={average} total={total} />
     <Stats text="positive" value={positive} total={total} />


    
    </>
  );
}

export default App;
