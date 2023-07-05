import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Regester.css";
function Regester() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/regester`, inputs);

      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
      setErr(error.response.data);
    }
  };
  return (
    <div className="reg">
      <h2>Regester</h2>
      <form>
        <input
          required
          type="text"
          placeholder="User Name..."
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="Email..."
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password..."
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Regester</button>
        {err && <p>{err}</p>}
        <span>
          Have An Accout
          <Link className="link" to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Regester;
