import { useContext } from "react";
import "./Navbar.css";
import Logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { ContextApi } from "../../context/AuthContext";
// "ART", "SCINCE","TECKNELOGY" "CINEMA", "DESIGN", "FOOD"
function Navbar() {
  const { currentUser, logout } = useContext(ContextApi);

  return (
    <div className="navbar">
      <div className="container">
        <Link className="logo" to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <div className="links">
          <Link to="/?cat=art">
            <h6>ART</h6>
          </Link>

          <Link to="/?cat=scince">
            <h6>SCINCE</h6>
          </Link>

          <Link to="/?cat=technology">
            <h6>TECKNELOGY</h6>
          </Link>

          <Link to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>

          <Link to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>

          <Link to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span style={{ textTransform: "capitalize" }}>
            {currentUser?.username}
          </span>
          {currentUser ? (
            <span
              onClick={logout}
              className="logout"
              style={{ cursor: "pointer" }}
            >
              Logout
            </span>
          ) : (
            <Link to="/login" className="login">
              Login
            </Link>
          )}
          <span style={{ color: "#fff" }} className="Write">
            <Link to="/write">
              <h5>Write</h5>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
