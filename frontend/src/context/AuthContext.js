import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ContextApi = createContext();

export const AuthContext = ({ children }) => {
  const [currentUser, setCurrenUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(`/login`, inputs);
    setCurrenUser(res.data);
  };

  const logout = async () => {
    const res = await axios.post(`/logout`);
    console.log(res);
    setCurrenUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <ContextApi.Provider value={{ currentUser, login, logout }}>
      {children}
    </ContextApi.Provider>
  );
};
