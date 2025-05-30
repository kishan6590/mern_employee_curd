import React from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useContext } from "react";
import { authContext } from "../context/context";
import apiClient from "../../service/apiClient";
function Navigation() {
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const navigate = useNavigate();

  async function logoutHandle() {
    try {
      const data = await apiClient.logout();
      if (data.success) {
        localStorage.setItem("loginState", JSON.stringify(false));
        const loggedIn = JSON.parse(localStorage.getItem("loginState"));
        setIsLoggedIn(loggedIn);
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <div className="subHeader">
      <ul>
        <li>
          <Link to="/home" className="link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/employeelist" className="link">
            Employee List
          </Link>
        </li>
        <ul className="infoPart">
          <li>
            <Link to="/dashboard" className="link">
              Kishan
            </Link>
          </li>
          <li onClick={logoutHandle}>Logout</li>
        </ul>
      </ul>
    </div>
  );
}

export default Navigation;
