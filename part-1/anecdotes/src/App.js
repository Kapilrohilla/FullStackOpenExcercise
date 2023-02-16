import './App.css';
import { useState } from 'react';
//component for heading
const Heading = (prop) => <h2>{prop.text}</h2>
//componenet for vote, next anecdotes button
const Button = ({text,handleClick}) => <button onClick={handleClick}>{text}</button>
// component to show anecdotes with most votes
const WithMostVotes = ({anecdotes,vote}) => {
  let maxVote = Math.max(...vote);
  let result;
  // calculating the array index with most votes
  for(let i=0;i<anecdotes.length;i++){
      if(vote[i] === maxVote){
        result = i;
      }
  }
  return (
    <>
      <p>{anecdotes[result]}</p>
      <p>has {maxVote} votes</p>
    </>
    
  )
}
function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  const [selected,setSelected] = useState(0);
  const [vote,setVote] = useState([0,0,0,0,0,0,0,0]);

  const random = () =>{
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }
  // function to increase vote number to a anecdote
  const handleVote = () => {
    let newVote = vote.map((element,i)=>{ 
      if(i===selected){
        return element+1;
      }else{
        return element;
      }
    });
    setVote(newVote);
  }
  return (
    <div>
      <Heading text="Anecdotes of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button text="Vote" handleClick={handleVote} />
      <Button text="next anecdotes" handleClick={random} />

      <Heading text="Anecdotes with most Votes" />
      <WithMostVotes anecdotes={anecdotes} vote={vote} />
    </div>
  );
}

export default App;