import { 
  FormControl,
  MenuItem,
  Select,  
} from "@material-ui/core";
import React, {useState,useEffect,} from "react";
import InfoBox from './InfoBox';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  // USEREFFECT = Runs a piece of code
  // boased on a givin condition

  useEffect(() => {
    //useEffect -> Need to be run only one time  when function is called
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      //after get data from the server
      .then((response) => response.json())
      //change it to json format
      .then((data) => {
      //then put the desired values in to countries!
        const countries = data.map((country) => (
          {
            name: country.country, //United Stats, United Kingdom ...
            value: country.countryInfo.iso2 // US, UK ...
          }));
          setCountries(countries)
      });
    };
    //run Function! boom.
    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    console.log('YO' , countryCode);

    setCountry(countryCode)
  };

  return (
    <div className="app">  
      <div class="app__header">      
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select 
          variant="outlined"
          onChange={onCountryChange}
          value={country}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map(country =>(
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus cases" cases = {123}  total="2000"></InfoBox>
        <InfoBox title="Recovored" cases = {1243} total="3000"></InfoBox>
        <InfoBox title="Deaths" cases = {1213} total="4000"></InfoBox>
      </div>
      {/* InfoBoxes */}

      {/* InfoBoxes */}
      {/* InfoBoxes */}
      
      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
