import React,  { useState, useRef } from 'react'
import "./database.css";
function Database() {
    const [retrieveUserData, setRetrieveUserData] = useState([]);
  const findRef = useRef();
  function handleFind(e) {
    e.preventDefault();
    const findinput = findRef.current.value;
    const sessionData = JSON.parse(localStorage.getItem("user"));
    if(sessionData===null){
        setRetrieveUserData([]);
    }
    else{
        const searchedResult = sessionData.filter(
            (item) => item.Name === findinput
          );
          if (searchedResult.length > 0) {
            setRetrieveUserData(searchedResult);
          } else {
            setRetrieveUserData("");
          }
    }
  }
  return (
    <div className="Retrieve">
  
    <div className="find">
      <form className="find-form" onSubmit={(e) => handleFind(e)}>
        <input
          className="search-aadhar"
          type="text"
          ref={findRef}
          required
        />
        <input type="submit" className="find-btn" value="Find" />
      </form>
    </div>
    <div className="result">
      {retrieveUserData === "" ? (
        <h1 style={{ textAlign: "center" }}>No Data Found</h1>
      ) : retrieveUserData.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>No Data</h1>
      ) : (
        retrieveUserData.map((item) => {
          return (
            <div
              style={{ border: "1px solid black" }}
              key={item.Aadhar_Number}
            >
              <p>Name :{item.Name}</p>
              <p>DOB :{item.Date_of_birth}</p>
              <p>Aadhar :{item.Aadhar_Number} </p>
              <p>Mobile no. :{item.Mobile_Number}</p>
              <p>Age :{item.Age}</p>
            </div>
          );
        })
      )}
    </div>
  </div>
  )
}

export default Database;
