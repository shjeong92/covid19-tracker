import { 
  FormControl,
  MenuItem,
  Select,  
  Card,
  CardContent,
} from "@material-ui/core";
import React, {useState,useEffect,} from "react";
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import './App.css';
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import LineGraph2 from "./LineGraph2";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([])
  // USEREFFECT = Runs a piece of code
  // boased on a givin condition
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then((data) => {
      setCountryInfo(data);
    });
  }, []);
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
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries)
      });
    };
    //run Function! boom.
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
     countryCode === 'worldwide' 
      ? 'https://disease.sh/v3/covid-19/all' 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode)
      setCountryInfo(data)
    })

  };
  console.log("COUNTRY INFO >>>", countryInfo)
  return (
    <div className="app">
      <div className="app__left">
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
          <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases}  total={countryInfo.cases}></InfoBox>
          <InfoBox title="Recovored" cases={countryInfo.todayRecovered} total={countryInfo.recovered}></InfoBox>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}></InfoBox>
        </div>
        <Map/>
      </div>  
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Countries</h3>
          <Table countries={tableData}></Table>
          <h3>Worldwide new cases</h3>
          <LineGraph/>
        </CardContent>
      </Card>
      {/* Map */}

      
    </div>
  );
}

export default App;
