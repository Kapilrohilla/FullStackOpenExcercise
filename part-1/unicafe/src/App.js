import './App.css';
import {useState} from "react";
import Button from './component/button';

const StatisticLine = ({value,text}) => {
  if(text==="positive"){
    return (
      <tr><td>{text}: </td><td>{value} %</td></tr>
    );
  }else{
    return (<tr><td>{text}: </td><td>{value}</td></tr>)
  }
}
const Stats = ({good,bad,neutral}) => {
  let total = good+bad+neutral;
  let average = (good - bad)/total;
  let positive = good/total*100;
  if(total>0){
    return (
     <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )}else{
    return <p>No feedback given</p>
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
     <Button handleClick={handleNeutal} text="neutral"/>
     <Button handleClick={handleBad} text="bad"/>
     <h2>Statistics</h2>
     <Stats good={good} neutral={neutral} bad={bad}/>
    </>
  );
}

export default App;
