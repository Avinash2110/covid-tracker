import React, {useState, useEffect} from "react";
import {Select, MenuItem} from "@material-ui/core";
import "./App.css";
import LiveTable from "./Components/LiveTable";
import {fetchCountryData, fetchCountryStatus} from "./apiCalls";
import CountryCard from "./Components/CountryCard";
import Map from "./Components/Map";

const App = () =>{

  const [rankingBy, setRankingBy] = useState("cases");
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryStatus, setCountryStatus] = useState({
    totalCases: "",
    totalDeaths: "",
    totalRecovered: "",
    todayCases: "",
    todayDeaths: "",
    todayRecovered: ""
  })
  const [countryInfo, setCountryInfo] = useState({
    lat: 20,
    long: 77,
  })
  const [fullData, setFullData] = useState([]);

  const {lat, long} = countryInfo;

  const {totalCases, totalDeaths, totalRecovered, todayCases, todayDeaths, todayRecovered} = countryStatus;

  const handleChange = (event) =>{
    setRankingBy(event.target.value);
  }

  const handleCountryChange = (event) =>{
    setCountry(event.target.value);
  }

  const getCountries = () =>{
    fetchCountryData()
    .then(response =>{
      setFullData(response);
      const countries = [];
      response.forEach(country =>{
        countries.push(country.country);
      })
      setCountryList(countries);
    })
  }

  const getCountryStatus = () =>{
    var url = country === "worldwide" ? `https://disease.sh/v3/covid-19/all` : `https://disease.sh/v3/covid-19/countries/${country}`;
    fetchCountryStatus(url)
    .then(data =>{
      setCountryStatus({
        ...countryStatus,
        totalCases: data.cases,
        totalDeaths: data.deaths,
        totalRecovered: data.recovered,
        todayCases: data.todayCases,
        todayDeaths: data.todayDeaths,
        todayRecovered: data.todayRecovered
      })
      if(country!=="worldwide"){
        setCountryInfo({...countryInfo, lat: data.countryInfo.lat, long: data.countryInfo.long});
      }
    })
  }

  useEffect(()=>{
    getCountries();
  }, [])

  useEffect(() =>{
    getCountryStatus();
  }, [country])

  return(
    <>
      <div className="app-container">
        <div className="title-container">
          <h1 className="title">Covid Tracker</h1>
        </div>
        <div className="page-divider">
          <div className="left-container">
            <div className="country-dropdown-container">
              <select id="dropdown" value={country} onChange={handleCountryChange}>
                <option value="worldwide">Worldwide</option>
                {countryList.map((country, index) =>{
                  return <option value={country}>{country}</option>
                })}
              </select>
            </div>
            <div className="country-status-container">
                <CountryCard 
                  cases={totalCases}
                  deaths={totalDeaths}
                  recovered={totalRecovered}
                  title="Total"
                />
                <CountryCard 
                  cases={todayCases}
                  ceaths={todayDeaths}
                  recovered={todayRecovered}
                  title="Today"
                />
            </div>
            <Map lat={lat} long={long} cases={totalCases} complete={fullData}/>
          </div>
          <div className="right-container">
            <div className="right-container-title">
              <h3 className="ranking-title">Rankings by: </h3>
              <Select className="ranking-dropdown" variant="outlined" value={rankingBy} onChange={handleChange}>
                <MenuItem value="cases">Cases</MenuItem>
                <MenuItem value="deaths">Deaths</MenuItem>
                <MenuItem value="recovered">Recovered</MenuItem>
              </Select>
            </div>
            <LiveTable ranking={rankingBy}/>
          </div>
        </div>
      </div>
      <footer className="footer">
        <h3 className="footer-text">Made with <span className="heart">&#9829;</span> by Avinash Shukla</h3>
      </footer>
    </>
  )
}

export default App;