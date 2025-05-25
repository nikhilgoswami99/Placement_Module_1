import React, { useEffect, useState } from "react";
import "./details.css";
import { useParams } from "react-router-dom";
import data from "../data.json";

function Details() {
  let params = useParams();
  useEffect(() => {
      if (!localStorage.getItem("data")) {
    localStorage.setItem("data", JSON.stringify(data));
  }
  }, []);

  let localData = JSON.parse(localStorage.getItem('data'));
  

  let warehouse = localData.find((obj) => {
    return obj.id.toString() === params.id;
  });

  let [isEditable, setIsEditable] = useState(false);
  let [text, setText] = useState({ ...warehouse });

  const handleText = (e) => {
    const { name, value } = e.target;

    setText((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleEditing = () => {
    setIsEditable((prev) => !prev);
  };

  const handleSave = () => {
 const index = localData.findIndex((obj) => obj.id.toString() === params.id);
  if (index !== -1) {
    localData[index] = { ...text };
    localStorage.setItem('data', JSON.stringify(localData));
    setIsEditable(false); 
  }
  };

  return (
    <div className="detailsPage">
      <div className="details_container">
        <button onClick={handleEditing} className="editBtn">
          {isEditable ? "Cancel" : "Edit"}
        </button>
        {isEditable && (
          <button onClick={handleSave} className="saveBtn">
            Save
          </button>
        )}

        {isEditable ? (
          Object.entries(text).map(([key, value], idx) => {
            return (
              <div key={idx} className="editable_Box">
                <label htmlFor={key}>{key.toUpperCase()} :- </label>

                <input
                  className="values"
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleText}
                  type="text"
                />
              </div>
            );
          })
        ) : (
          <>
            {Object.entries(warehouse).map(([key, value], idx) => {
              return (
                <p key={idx}>{`${key.toUpperCase()} :- ${value.toString()}`}</p>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default Details;
