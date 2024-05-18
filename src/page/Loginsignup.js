/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./LoginSignup.css";
import username_icon from "../Components/Assets/username.png";
import email_icon from "../Components/Assets/email.png";
import password_icon from "../Components/Assets/username.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Loginsignup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [roleId, setRollId] = useState(null);
  const [phoneno, setPhoneno] = useState(null);
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/login?username=${email}&password=${password}`
      );

      const { access_token, refresh_token, role } = response.data;
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("refresh_token", refresh_token);
      sessionStorage.setItem("role", role);
      if (response.status === 200) {
        login();
        switch (role) {
          case "systemadmin":
            navigate("/sytemadminhome");
            break;
          case "admin":
            navigate("/admin");
            break;
          case "doctor":
            navigate("/doctor");
            break;
          case "patient":
            navigate("/patient");
            break;
          default:
            break;
        }
      }
    } catch (error) {
      // Handle login error (e.g., show an error message)
      toast.error("Login failed:", error);
    }
  };
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/user/register?roleId=${parseInt(roleId)}`,
        {
          name,
          username,
          email,
          password,
          gender,
          hospital_id: { id: hospitalId },
          phoneno,
        }
      );
      if (response.status === 200) {
        toast.success("SignUp Successfull");
        setAction("Login");
      }
    } catch (error) {
      // Handle login error (e.g., show an error message)
      toast.error("SignUp failed:", error);
    }
  };
  return (
    <div>
      <div
        className="maincontainer"
        style={{
          backgroundImage: "url(/docBg.jpg)",
          backgroundRepeat: "no-repeat",
          width: "100%",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="input">
                <img src={username_icon} alt="" />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            )}
            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="input">
                <img src={username_icon} alt="" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            )}

            <div className="input">
              <img src={email_icon} alt="" />
              <input
                value={email}
                type="email"
                placeholder="Email-id"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="input">
                <img src={username_icon} alt="" />

                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            )}
            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="input">
                <img src={username_icon} alt="" />

                <input
                  value={hospitalId}
                  type="text"
                  placeholder="Hospital Id"
                  onChange={(e) => {
                    setHospitalId(e.target.value);
                  }}
                />
              </div>
            )}

            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="input">
                <img src={username_icon} alt="" />
                <input
                  value={phoneno}
                  type="number"
                  placeholder="Phone Number"
                  onChange={(e) => {
                    setPhoneno(e.target.value);
                  }}
                />
              </div>
            )}

            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="input">
                <img src={username_icon} alt="" />
                <input
                  type="number"
                  placeholder="Role ID"
                  value={roleId}
                  onChange={(e) => {
                    setRollId(e.target.value);
                  }}
                />
               
              </div>
            )}
 {action === "Login" ? (
              <div></div>
            ) : (
<p className="rolesinfo"> 
                  1: Admin, 2: Doctor, 3: Patient
            </p>
            ) }
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          {/* {action === "Sign Up" ? <div></div> : <div className="forgotpassword">Lost Password? <span>Click Here...</span></div>} */}

          <div className="submit-container">
            {action === "Login" ? (
              <div>
                <a
                  style={{ fontWeight: "bold", textDecoration: "none" }}
                  href="#"
                  className="forgotpassword"
                  onClick={() => setAction("Sign Up")}
                >
                  Sign Up
                </a>
                <div className="submit" onClick={handleLogin}>
                  Login
                </div>
              </div>
            ) : (
              <div>
                <a
                  style={{ fontWeight: "bold", textDecoration: "none" }}
                  href="#"
                  className="forgotpassword"
                  onClick={() => setAction("Login")}
                >
                  Login
                </a>
                <div className="submit" onClick={handleSignUp}>
                  Sign Up
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Loginsignup;
