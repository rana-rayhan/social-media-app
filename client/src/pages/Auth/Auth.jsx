import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Auth.css";
import Logo from "../../img/logo.png";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../fetures/profileSlice";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const registerUser = async () => {
    await axios
      .post("http://localhost:4000/auth/register", {
        firstname,
        lastname,
        username,
        password,
      })
      .then((user) => {
        console.log(user.data);
        dispatch(fetchUser());
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const loginUser = async () => {
    await axios
      .post("http://localhost:4000/auth/login", {
        username,
        password,
      })
      .then(async (user) => {
        localStorage.setItem("token", user.data.token);
        dispatch(fetchUser(user.data.token));
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setFirstName("");
        setLastName("");
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    loginUser();
  }, []);

  // if signup page
  const [isSignUp, setSignUp] = useState(false);
  // for password not mathcing error
  const [confirmPass, setConfirmPass] = useState(true);

  // handlling signup and login message
  const handleSignUp = () => {
    setSignUp((prevState) => !prevState);
    setFirstName("");
    setLastName("");
    setUserName("");
    setPassword("");
    setCpassword("");
    setConfirmPass(true);
  };

  // handle form submit in data base
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && password !== cpassword) {
      setConfirmPass(false);
      return;
    } else {
      setConfirmPass(true);
    }
    if (isSignUp) {
      registerUser();
    } else {
      loginUser();
    }
    setUserName("");
    setPassword("");
    setCpassword("");
  };

  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Social Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* right side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "LOG IN"}</h3>

          {isSignUp && (
            <div>
              <input
                value={firstname}
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                value={lastname}
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          )}

          <div>
            <input
              value={username}
              type="text"
              className="infoInput"
              name="username"
              placeholder="Usernames"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isSignUp && (
              <input
                type="text"
                className="infoInput"
                name="confirmpass"
                value={cpassword}
                placeholder="Confirm Password"
                onChange={(e) => setCpassword(e.target.value)}
              />
            )}
          </div>
          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>

          <div>
            <span
              onClick={handleSignUp}
              style={{ fontSize: "12px", cursor: "pointer" }}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Don't have and account? Sing Up"}
            </span>
          </div>
          <button className="button infoButton" type="submit">
            {isSignUp ? "Signup" : "LOG IN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
