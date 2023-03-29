import axios from "axios"
import { useEffect, useState } from "react"
const api_key = process.env.REACT_APP_API_KEY;

const Filter = ({ text, handleText }) => {

    return (
        <div>
            find countries &nbsp;
            <input type="text" value={text} onChange={handleText} />
        </div>
    )
}
const TooManyData = () => {
    return <p>Too many matches, specific another filter</p>
}
const ListOfCountry = ({ countries_name_after_search, handleShowBtn }) => {
    let key = 1;
    const list = countries_name_after_search.map(((aCountry) => {
        return <li key={key++}>{aCountry} <button onClick={(e) => handleShowBtn(e, aCountry)}>Show</button></li>
    }));
    return (
        <ul>
            {list}
        </ul>
    )
}
const SpecificData = ({ prop }) => {
    const [weatherInfo, setWeatherInfo] = useState('nothing');

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${prop.coordinates[0]}&lon=${prop.coordinates[1]}&appid=${api_key}&units=metric`)
            .then(r =>
                setWeatherInfo(r.data)
            )
    }, [prop]);

    let temp, windSpeed, imgSrc;
    if (weatherInfo.hasOwnProperty('main')) {
        temp = weatherInfo.main.temp;
        windSpeed = weatherInfo.wind.speed;
        imgSrc = `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`;
    }
    return (
        <div>
            <h1>{prop.country_name}</h1>
            <p>Capital: {prop.capital_of_country}</p>
            <p>Area: {prop.area}</p>
            <h2>Language: </h2>
            <ul>
                {prop.languages_of_country}
            </ul>
            <img src={prop.flag_img} alt={prop.flag_alt} />
            <hr />
            <h2>Weather in {prop.capital_of_country}</h2>
            <p>temperature: {temp}</p>
            <img src={imgSrc} alt="" />
            <p>wind: {windSpeed}</p>
        </div>
    )

}

export { Filter, SpecificData, ListOfCountry, TooManyData }