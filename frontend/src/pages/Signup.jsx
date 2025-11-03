import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Signup.css";
import { handleError, handleSuccess } from "../util/util.js";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };
  // console.log("loginInfo :", signupInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email, password are required!");
    }
    try {
      const url = "http://localhost:5003/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
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
      <h2>Sign Up</h2>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            value={signupInfo.name}
            type="text"
            name="name"
            autoFocus
            placeholder="enter your name"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            value={signupInfo.email}
            type="email"
            name="email"
            placeholder="enter your email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            value={signupInfo.password}
            type="password"
            name="password"
            placeholder="enter your password"
          />
        </div>
        <button type="submit">Sign Up</button>
        <span>
          Already have an Account ?
          <Link className="link" to="/login">
            Log In
          </Link>
        </span>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Signup;
