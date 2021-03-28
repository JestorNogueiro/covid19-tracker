import React, { useState, useEffect } from "react";
import "./App.css";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Maps from "./components/Map";
import Table from "./components/Table";
import { SortData, PrintStats } from "./utilities";
import LineGraph from "./components/LineGraph";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [center, setCenter] = useState({ lat: 39.588, lng: 2.935 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((request) => request.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = SortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
          // console.log(data);
        });
    };
    getCountriesData();
  }, []);

  const countryChange = async (e) => {
    setLoading(true);
    const valueCountryCode = e.target.value;
    //ternary operator
    const url =
      valueCountryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${valueCountryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(valueCountryCode);
        setCountryInfo(data);
        setMapZoom(4);
        setCenter([data.countryInfo.lat, data.countryInfo.long]); //sets the Lat && Long value
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>

          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={countryChange}>
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((country) => {
                return (
                  <MenuItem key={country.id} value={country.value}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">

          {/* Info box of Total cases Recovered And deaths */}
          
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="CoronaVirus Cases"
            cases={PrintStats(countryInfo.todayCases)}
            totalCases={PrintStats(countryInfo.cases)}
            isloading={isLoading}
          />
          <InfoBox
            cases={PrintStats(countryInfo.todayRecovered)}
            totalCases={PrintStats(countryInfo.recovered)}
            isloading={isLoading}
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={PrintStats(countryInfo.todayDeaths)}
            totalCases={PrintStats(countryInfo.deaths)}
            isloading={isLoading}
          />
        </div>

       
        <Maps
          center={center}
          zoom={mapZoom}
          countries={mapCountries}
          casesType={casesType}
        />
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live Cases By Country</h3>
            <Table countriesTable={tableData} />

            <h3 className="app__title">New Worldwide {casesType}</h3>

            <LineGraph className="app__graph" casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
