import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { ContextApi } from "../../context/AuthContext";
// import axios from "axios";

function Login() {
  const { login } = useContext(ContextApi);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      setErr(error.response.data);
    }
  };
  return (
    <div className="auth">
      <h2>Login</h2>
      <form>
        <input
          required
          type="text"
          name="username"
          placeholder="User Name..."
          onChange={handleChange}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="password..."
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't Have An Accout
          <Link className="link" to="/regester">
            Regester
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
