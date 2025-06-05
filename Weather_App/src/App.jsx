import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const cities = ["London", "New York", "Los Angeles", "Las Vegas"];
  const [selectedCity, setSelectedCity] = useState(null);
  const [detailsList, setDetailsList] = useState([]);
  const [cityIndex, setCityIndex] = useState(0);
  const [highlightedCity, setHighlightedCity] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const fetchCityDetails = async () => {
    if (cityIndex >= cities.length) {
      alert("All cities have been fetched.");
      return;
    }

    const city = cities[cityIndex];
    setSelectedCity(city);

    const response = await fetch(
      `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${city}`
    );
    const data = await response.json();
    

    const dataAge = calculateDataAge(data.date_and_time);
    

    const weatherDetails = {
      city: city,
      description: data.description,
      temperature: data.temp_in_celsius,
      pressure: data.pressure_in_hPa
,
      dataAge: dataAge
,
    };

    setDetailsList((prev) => [...prev, weatherDetails]);
    setCityIndex((prev) => prev + 1);
  };
  

  const calculateDataAge = (datetimeStr) => {
    const dataDate = new Date(datetimeStr);
    const now = new Date();
    const diffMs = now - dataDate;
    return Math.floor(diffMs / (1000 * 60 * 60));
  };

  const handleDelete = (index) => {
    setDetailsList((prev) => prev.filter((_, i) => i !== index));
    setCityIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleDescriptionChange = (e, index) => {
    const newDesc = e.target.value;
    setDetailsList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, description: newDesc } : item
      )
    );
  };

  const handleSearch = () => {
    const found = detailsList.find(
      (item) => item.city.toLowerCase() === searchInput.trim().toLowerCase()
    );
    if (found) {
      setHighlightedCity(found.city);
      setTimeout(() => setHighlightedCity(null), 3000);
    } else {
      alert("City not found in details table.");
    }
  };

  return (
    <>
      <nav className="navbar">Nikhil Goswami's Weather App</nav>
      <section>
        <aside className="sidebar">
          <button onClick={fetchCityDetails} className="getBtn">
            Get Weather
          </button>
          <table className="sideTable">
            <thead>
              <tr>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city, idx) => {
                const style = {
                  border: city === selectedCity ? "5px solid green" : "2px solid black",
                  color: "#000000"
                };
                return (
                  <tr key={idx} onClick={() => setSelectedCity(city)}>
                    <td style={style}>{city}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </aside>
        <main>
          <section>
            <input
              placeholder="City Name"
              id="cityName"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="searchBtn" onClick={handleSearch}>
              Search
            </button>
          </section>
          <table className="mainTable">
            <thead>
              <tr>
                <th>City</th>
                <th>Description</th>
                <th>Temperature</th>
                <th>Pressure</th>
                <th>Data age (hrs)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {detailsList.length > 0 ? (
                detailsList.map((detail, idx) => (
                  <tr
                    key={idx}
                    style={{
                      backgroundColor:
                        highlightedCity === detail.city ? "yellow" : "transparent",
                      color: "#000000",
                    }}
                  >
                    <td>{detail.city}</td>
                    <td>
                      <input
                        value={detail.description}
                        onChange={(e) => handleDescriptionChange(e, idx)}
                      />
                    </td>
                    <td>{detail.temperature}</td>
                    <td>{detail.pressure}</td>
                    <td>{detail.dataAge}</td>
                    <td>
                      <button onClick={() => handleDelete(idx)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr style={{ height: "70vh", textAlign: "center", color: "#000000" }}>
                  <td colSpan={6}>No Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </section>
    </>
  );
}

export default App;
