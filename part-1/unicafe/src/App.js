import './App.css';
import {useState} from "react";
import Button from './component/button';
function App() {
  const [good,setGood] = useState(0);
  const [neutral,setNeutral] = useState(0);
  const [bad,setBad] = useState(0);

  const handleGood = () => setGood(good+1);
  const handleBad= () => setBad(bad+1);
  const handleNeutal= () => setNeutral(neutral+1);
  
  let total = good + neutral + bad;
  let average = (good-bad)/total;
  let positive = good/total*100;
  console.log(total,average,positive);
  return (
    <>
     <h1>Give Feedback</h1>
     <Button handleClick={handleGood} text="good"/>
     <Button handleClick={handleNeutal}text="neutral"/>
     <Button handleClick={handleBad} text="bad"/>
     <h2>Statistics</h2>
     <p>good {good}</p>
     <p>neutral {neutral}</p>
     <p>bad {bad}</p>
     <p>All {total}</p>
     <p>average {average}</p>
     <p>positive {positive}%</p>
    </>
  );
}

export default App;
