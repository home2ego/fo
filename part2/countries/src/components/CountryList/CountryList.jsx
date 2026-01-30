import { useState } from "react";
import Country from "../Country/Country";

const CountryList = ({ countries }) => {
  const [shownCountry, setShownCountry] = useState(null);

  return (
    <>
      {!shownCountry ? (
        <ul>
          {countries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => setShownCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      ) : (
        <Country country={shownCountry} />
      )}
    </>
  );
};

export default CountryList;
