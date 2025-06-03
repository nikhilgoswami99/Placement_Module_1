import { useState, useEffect } from "react";
import "./App.css";
import data from "./data.json";

import { useNavigate } from 'react-router-dom';

function App() {
  let [name, setName] = useState("");
  let [city, setCity] = useState("");
  let [cluster, setCluster] = useState("");
  let [space, setSpace] = useState("");
   const [localData, setLocalData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("data");

    if (storedData) {
      setLocalData(JSON.parse(storedData));
    } else {
      localStorage.setItem("data", JSON.stringify(data));
      setLocalData(data); // Update state with default data
    }
  }, []);

  // let Data = JSON.parse(localStorage.getItem('data'));

  const handleSearch = (e) => {
    setName(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleCluster = (e) => {
    setCluster(e.target.value);
  };

  const handleSpace = (e) => {
    setSpace(e.target.value);
  };


  return (
    <>
      <nav className="navbar">
        <div className="links">
          <p>Warehouse Finder</p>
        </div>
        <div className="search_bar">
          <input
            placeholder="Search Warehouse"
            value={name}
            onChange={handleSearch}
            id="name"
            type="text"
          />
        </div>

        <select onChange={handleCity} name="city" id="city">
          <option value="">City</option>
          <option value="Delhi">Delhi</option>
          <option value="Chennai">Chennai</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Indore">Indore</option>
          <option value="Banglore">Banglore</option>
          <option value="Guwahati">Guwahati</option>
        </select>

        <select onChange={handleCluster} name="cluster" id="cluster">
          <option value="">cluster</option>
          <option value="cluster-a-1">cluster-a-1</option>
          <option value="cluster-a-2">cluster-a-2</option>
          <option value="cluster-a-21">cluster-a-21</option>
          <option value="cluster-a-32">cluster-a-32</option>
          <option value="cluster-v-2">cluster-v-2</option>
        </select>

        <select onChange={handleSpace} name="space" id="space">
          <option value="">space</option>
          {localData.map((obj) => {
            return (
              <option key={obj.id} value={obj.space_available}>
                {obj.space_available}
              </option>
            );
          })}
        </select>
      </nav>
      <div className="list_container">
        {localData
          .filter((obj) => {
            return (
              obj.name.toLowerCase().includes(name.toLowerCase()) &&
              (city === "" || obj.city === city) &&
              (cluster === "" || obj.cluster === cluster) &&
              (space === "" || obj.space_available === parseInt(space))
            );
          })
          .map((obj, idx) => {
            return <Card key={idx} id={obj.id} obj={obj}></Card>;
          })}
      </div>
    </>
  );
}

function Card(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`details/${props.id}`);
    
  }



  return (
    <>
      <div onClick={handleClick} className="card">
        <p className="name">Name :- {props.obj.name}</p>
        <p className="city">City :- {props.obj.city}</p>
        <p className="cluster">Cluster :- {props.obj.cluster}</p>
        <p className="space">Space Available :- {props.obj.space_available}</p>
      </div>
    </>
  );
}

export default App;
