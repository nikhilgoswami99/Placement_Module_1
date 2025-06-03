import React, { useEffect, useState } from "react";
import "./details.css";
import { useParams } from "react-router-dom";

function Details() {
  const params = useParams();
  const [localData, setLocalData] = useState([]);
  const [warehouse, setWarehouse] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [text, setText] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    setLocalData(storedData);

    const foundWarehouse = storedData.find(
      (obj) => obj.id.toString() === params.id
    );
    setWarehouse(foundWarehouse);
    setText({ ...foundWarehouse });
  }, [params.id]);

  const handleText = (e) => {
    const { name, value } = e.target;
    setText((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditing = () => {
    setIsEditable((prev) => !prev);
  };

  const handleSave = () => {
    const index = localData.findIndex((obj) => obj.id.toString() === params.id);
    if (index !== -1) {
      const updatedData = [...localData];
      updatedData[index] = { ...text };
      localStorage.setItem("data", JSON.stringify(updatedData));
      setLocalData(updatedData);
      setWarehouse({ ...text });
      setIsEditable(false);
    }
  };

  // ✅ Avoid error by checking if warehouse exists
  if (!warehouse) {
    return <div className="detailsPage">Loading warehouse data...</div>;
  }

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
          Object.entries(text).map(([key, value], idx) => (
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
          ))
        ) : (
          Object.entries(warehouse).map(([key, value], idx) => (
            <p key={idx}>{`${key.toUpperCase()} :- ${value.toString()}`}</p>
          ))
        )}
      </div>
    </div>
  );
}

export default Details;
