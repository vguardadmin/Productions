import React from "react";
import Lottie from 'lottie-react-web'
import animation from "../../assets/notFound.json"
import Navbar from "./Navbar"

const NotFound = () =>{
  return(
    <>
    <Navbar home={"btn btn-light me-3"} report={"btn btn-light me-3"}></Navbar>
    <div className=" position-absolute top-50 start-50 translate-middle">
    <div class="card border border-white">
      <div class="card-body" style={{width:"22rem"}}>
      <Lottie
      options={{
        animationData: animation
      }}
    />
      </div>
    </div>
    </div>
    
  </>)
}
export default NotFound;
