import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Signup.css";
import { handleError, handleSuccess } from "../util/util.js";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  // console.log("loginInfo :", loginInfo);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email or password are required!");
    }
    try {
      const url = "https://mern-auth-project-f4as.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("Token", jwtToken);
        localStorage.setItem("LoggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <section className="container">
      <h2>Log In</h2>
      <form method="post" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            value={loginInfo.email}
            type="email"
            name="email"
            placeholder="enter your email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            value={loginInfo.password}
            type="password"
            name="password"
            placeholder="enter your password"
          />
        </div>
        <button type="submit">Log In</button>
        <span>
          Haven't Account ? Register Here
          <Link className="link" to="/signup">
            Sign Up
          </Link>
        </span>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Login;
