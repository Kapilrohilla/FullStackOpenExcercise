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
const ListOfCountry = ({ countries_name_after_search }) => {
    let key = 1;
    const list = countries_name_after_search.map(((aCountry) => {
        return <li key={key++}>{aCountry}</li>
    }));
    return (
        <ul>
            {list}
        </ul>
    )
}
const SpecificData = ({ specificCountry }) => {
    let key = 1;
    const { ...languages } = Object.values(specificCountry['languages']).map((aLanguage, arr) => {
        return <li key={key++}>{aLanguage}</li>
    });
    const country_name = specificCountry.name.common;
    const capital_of_country = specificCountry.capital[0];
    const area = specificCountry.area;
    const flag_img = specificCountry.flags.png;
    const flag_alt = specificCountry.flags.alt;
    const languages_of_country = Object.values(languages);
    return (
        <div>
            <h1>{country_name}</h1>
            <p>Capital: {capital_of_country}</p>
            <p>Area: {area}</p>
            <h2>Language: </h2>
            <ul>
                {languages_of_country}
            </ul>
            <img src={flag_img} alt={flag_alt} />

        </div>
    )

}

export { Filter, SpecificData, ListOfCountry, TooManyData }