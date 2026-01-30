import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country/Country";
import Filter from "./components/Filter/Filter";
import CountryList from "./components/CountryList/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query) {
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((response) => {
          const shownCountries = response.data.filter((country) =>
            country.name.common.toLowerCase().includes(query.toLowerCase()),
          );

          setCountries(shownCountries);
        });
    }
  }, [query]);

  return (
    <>
      <Filter query={query} onChange={(e) => setQuery(e.target.value)} />

      {countries.length > 10 && <p>Too many matches, specify another filter</p>}

      {countries.length <= 10 && countries.length > 1 && (
        <CountryList countries={countries} />
      )}

      {countries.length === 1 && <Country country={countries[0]} />}
    </>
  );
}

export default App;
