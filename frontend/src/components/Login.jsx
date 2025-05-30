import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import apiClient from "../../service/apiClient.js";
import { useContext } from "react";
import { authContext } from "../context/context.js";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async function (e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await apiClient.login(userName, password);

      if (data.success) {
        localStorage.setItem("loginState", JSON.stringify(true));

        const loggedIn = JSON.parse(localStorage.getItem("loginState"));
        setIsLoggedIn(loggedIn);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
    const togglePassword = (e) => {
      e.preventDefault()
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <header>Logo</header>
      <div className="pageStatus">Login Page</div>
      <div className="formDiv">
        {error && <h1>Error:{error?.message || "Unknown error"}</h1>}

        <form className="formSection" onSubmit={handleFormSubmit}>
          <label className="userNameLabel" htmlFor="userName">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />

          <br />
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button onClick={togglePassword}>
            {showPassword ? "Hide" : "Show"}
          </button>
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Logging.." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
