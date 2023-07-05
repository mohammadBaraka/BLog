import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Regester from "./pages/rejester/Regester";
import Write from "./pages/write/Write";
import Single from "./pages/single/Single";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import "./App.css";
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/post/:id", element: <Single /> },
        { path: "/write", element: <Write /> },
      ],
    },

    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/regester",
      element: <Regester />,
    },
  ]);
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
