import React, { useContext, useState } from "react";
import { Navigate, } from "react-router-dom";
import { AuthContext } from "./Auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../../config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import background from "../../assets/b.png";
toast.configure();

const LogIn = () => {
  const [showpasswordtype, setpasswordtype] = useState("password");
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    signInWithEmailAndPassword(Auth, email.value, password.value)
      .then(() => {
        toast.success("Logged in successfully");
    }).catch(error => {
        toast.error("Check email or password");
      })
  }

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/Assigntask"/>;
  }
//   header {
//   position: relative;
//   width: 100%;
//   height: 100%;
//   background-image: url(../img/BG.png);
//   background-repeat: no-repeat;
//   background-size: cover;
//   display: block;
// }
  return (
    <div>
  <div style={{position:"absolute",  width:"100%",height:"100%",backgroundImage: `url(${background})`,backgroundSize:"100% 100%", backgroundRepeat:"no-repeat" ,display:"block"}}>
    {/* <img src={Image} style={{ backgroundRepeat:"no-repeat",backgroundSize:"cover"}} alt="image"></img> */}
    <form onSubmit={handleSubmit}>
      <div className="continer-sm position-absolute top-50 start-0 translate-middle-y ms-5 shadow " style={{backgroundColor:"white", width: "23rem", borderRadius: "12px" }}>
        <div>
          <center>
            <h2 className="fw-bolder mt-3" style={{ fontSize: "20px" }}>Production Planning and Control</h2>
            <p className="text-muted mb-3" style={{ fontSize: "12px" }}>Enter your credentials to access your account.</p>
          </center>

          <div className="p-3 mt-3"  >
            <div className="mb-3">
              <label className="fw-bolder ">Email</label>
              <input name="email" type="email" className="form-control" placeholder="Enter your email"></input>
            </div>
            <div className="mb-3">
              <label className="fw-bolder ">Password</label>
              <input name="password" type={showpasswordtype} className="form-control" placeholder="Enter your password"></input>
            </div>
            <div className=" mb-1 text-muted">
              <input type="checkbox" onClick={(e) => {
                if (showpasswordtype === "password") {
                  setpasswordtype("text");
                } else if (showpasswordtype === "text") {
                  setpasswordtype("password");
                }
              }} /> Show Password</div>
            <div className="mb-4 d-grid gap-2">
              <button className="btn btn-warning" title="Log in" type="submit">Log in</button>
            </div>
          </div>
        </div></div></form>
  </div></div>);
}
export default LogIn;
