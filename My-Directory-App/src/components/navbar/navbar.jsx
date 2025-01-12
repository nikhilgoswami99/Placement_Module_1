import "./navbar.css";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar">My Directory App</nav>
      <div className="btn-container">
        <button className="nav-btn" onClick={() => navigate("/")}>Add New Person</button>
        <button className="nav-btn" onClick={() => navigate("/database")}>Retrieve Information</button>
      </div>
    </>
  );
}

export default Navbar;
