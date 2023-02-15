import './App.css';
import {useState} from "react";
import Button from './component/button';

const Stats = ({good,bad,neutral}) => {
  let total = good + neutral + bad;
  let average = (good-bad)/total;
  let positive = good/total*100;
  if(total===0){
    return (
        <p>No feedback given</p>
    )
  }else{
    return (
     <>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>All {total}</p>
        <p>average {average}</p>
        <p>positive {positive}%</p>
     </> 
    )
  }
}

function App() {
  const [good,setGood] = useState(0);
  const [neutral,setNeutral] = useState(0);
  const [bad,setBad] = useState(0);

  const handleGood = () => setGood(good+1);
  const handleBad= () => setBad(bad+1);
  const handleNeutal= () => setNeutral(neutral+1);
  
  return (
    <>
     <h1>Give Feedback</h1>
     <Button handleClick={handleGood} text="good"/>
     <Button handleClick={handleNeutal}text="neutral"/>
     <Button handleClick={handleBad} text="bad"/>
     <h2>Statistics</h2>
     <Stats good={good} bad={bad} neutral={neutral}/>
    
    </>
  );
}

export default App;
