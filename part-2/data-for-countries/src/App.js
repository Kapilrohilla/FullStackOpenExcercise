import { useEffect, useState } from 'react';
import './App.css';
import { ListOfCountry, SpecificData, Filter, TooManyData } from './component';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [countries, setCountries] = useState([]);
  const [regex, setRegex] = useState(new RegExp(''));
  const handleText = (e) => {
    setText(e.target.value);
    setRegex(new RegExp(e.target.value, "i"));
  };

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(r => setCountries(r.data));
  }, []);

  const countriesName = countries.map((aCountry => {
    return aCountry.name.common;
  }));
  let countries_name_after_search = countriesName.filter(aCountry => {
    return regex.test(aCountry);
  })
  let specificCountry;
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].name.common === countries_name_after_search[0]) {
      specificCountry = countries[i];
    }
  }
  if (countries_name_after_search.length > 10) {
    <TooManyData />
  }
  function switchCased() {
    // console.log(countries_name_after_search.length + ' data');
    if (countries_name_after_search.length === 1) {
      return <SpecificData specificCountry={specificCountry} />
    } else if (countries_name_after_search.length < 10) {
      return <ListOfCountry countries_name_after_search={countries_name_after_search} />
    } else {
      return <TooManyData />
    }
  }
  return (
    <>
      <Filter text={text} handleText={handleText} />
      {
        switchCased()
      }
    </>
  );
}

export default App;
