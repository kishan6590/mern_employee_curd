import { useState } from "react";
import Login from "./components/Login.jsx";
import { authContext, allemployee, filteredEmployees } from "./context/context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import Dashboard from "./components/Dashboard.jsx";
import Home from "./components/Home.jsx";
import EmployeeList from "./components/employeelist.jsx";
import CreateEmployee from "./components/CreateEmployee.jsx";
import EditEmployee from "./components/EditEmployee.jsx";
function App() {
  const loggedIn = JSON.parse(localStorage.getItem("loginState"));

  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
  const [allEmployee, setAllemployee] = useState([]);
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  return (
    <>
      <authContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <allemployee.Provider value={{ allEmployee, setAllemployee }}>
          <filteredEmployees.Provider
            value={{ filteredEmployee, setFilteredEmployee }}
          >
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={isLoggedIn ? <Dashboard /> : <Login />}
                />
                <Route
                  path="/home"
                  element={isLoggedIn ? <Home /> : <Login />}
                />
                <Route
                  path="/employeelist"
                  element={isLoggedIn ? <EmployeeList /> : <Login />}
                />
                <Route
                  path="/createemployee"
                  element={isLoggedIn ? <CreateEmployee /> : <Login />}
                />
                <Route
                  path="/editemployee/:id"
                  element={isLoggedIn ? <EditEmployee /> : <Login />}
                />
                <Route
                  path="/dashboard"
                  element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
                />
              </Routes>
            </BrowserRouter>
          </filteredEmployees.Provider>
        </allemployee.Provider>
      </authContext.Provider>
    </>
  );
}

export default App;

// Login Page
// welcome page
// dashbord page with data nd create button |if no data then show Add employee
// edit page
//
