import React,{useContext,useState,useEffect} from "react";
import { Auth,db } from "../../config";
import { Navigate, } from "react-router-dom";
import { AuthContext } from "../Login/Auth";
import { doc, setDoc,collection, getDocs  } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Navbar from "../Others/Navbar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WORK_STATION,WORK_STATION_MODEL } from "../../constants/constants";

import {ReactComponent as Accountsvg} from '../../assets/manage_account.svg';

toast.configure();


const Settings = () =>{

  const [addWorkStation,setAddWorkStation] = useState();
  const [workStation,setWorkStation] = useState();
  const [model,setModel] = useState();
  const [info, setInfo] = useState([]);
  useEffect(() => {
    Get()
  }, []);
  const Get = async () => {
    const res = [];
    const querySnapshot = await getDocs(collection(db, "workstation"));
querySnapshot.forEach((doc) => {
  let s = doc.data();
  res.push(s.workstation)
});
setInfo(res);
  }
  const logOut = () => {
      signOut(Auth).then(() => {
          toast.success("Logged out successfully");
    }).catch((error) => {
      });
  }
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/LogIn" />;
  }
  const appendChildData = async (e) => {
    e.preventDefault();
     let today = new Date();
     let counter = today.getTime() +""+ today.getDate() +""+ (today.getMonth()+1) +""+ today.getFullYear();
     if(addWorkStation in info){alert("workStation already Exists")}else{
     try{
     await setDoc(doc(db, "workstation", "#" + counter), {
       workstation: addWorkStation,
     });
     const res = info
     res.push(addWorkStation);
     setInfo(res);
     setAddWorkStation("");
     toast.success('Workstation Added successfully');
  }
     catch{
       setAddWorkStation("");
       toast.error('Error Occurred');
     }
   }}
   const appendModel = async (e) =>{
     console.log(workStation);
     console.log(model);
     e.preventDefault();
      let today = new Date();
      let counter = today.getTime() +""+ today.getDate() +""+ (today.getMonth()+1) +""+ today.getFullYear();
      try{
      await setDoc(doc(db, workStation, "#" + counter), {
        workstation: workStation,
        model:model,
      });
      setModel("");
      setWorkStation("");
      toast.success('Model Added successfully');
   }
      catch{
        setModel("");
        setWorkStation("");
        toast.error('Error Occurred');
      }
   }

    return(
        <div>
            <Navbar home={"btn btn-black text-white me-3"} report={"btn btn-black text-white me-3"} settings={"btn btn-warning me-3"} ></Navbar>
            <h2 className="ps-4 pt-1"> Settings</h2>
            <div class=" mt-5 container-sm">
                <div class="card mb-3">
                    <ul class="list-group list-group-flush">
                        <li class=" list-group-item d-flex justify-content-between align-items-start">
                            <div class="m-2  me-auto">
                                <div class="fw-bold">Add Workstation</div>
                                Create a Workstartion for assigning  task
                            </div>
                            <button type="button" class="m-2 btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#Workstationwindow">Add Workstartion</button>
                        </li>
                        {/* <li class=" list-group-item d-flex justify-content-between align-items-start">
                            <div class="m-2  me-auto">
                                <div class="fw-bold">Delete Workstartion</div>
                                Once you delete a Workstartion, there is no going back. Please be certain.
                            </div>
                            <button type="button" class="m-2 btn btn-outline-danger">Delete Workstartion</button>
                        </li> */}

                    </ul>
                </div>
                <div class="card  mb-3">
                    <ul class="list-group list-group-flush">

                        <li class=" list-group-item d-flex justify-content-between align-items-start">
                            <div class="m-2  me-auto">
                                <div class="fw-bold">Add Model</div>
                                Create a Model for assigning  task
                            </div>
                            <button type="button" class="m-2 btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#Modelwindow">Add Model</button>
                        </li>
                        {/* <li class=" list-group-item d-flex justify-content-between align-items-start">
                            <div class="m-2  me-auto">
                                <div class="fw-bold">Delete Model</div>
                                Once you delete a model, there is no going back. Please be certain.
                            </div>
                            <button type="button" class="m-2 btn btn-outline-danger">Delete Model</button>
                        </li> */}
                    </ul>
                </div>
                <div class="card  mb-3">
                    <ul class="list-group list-group-flush">

                        <li class=" list-group-item d-flex justify-content-between align-items-start">
                            <div class="m-2  me-auto">
                                <div class="fw-bold">Delete Task</div>
                                Once you delete a Task, there is no going back. Please be certain.
                            </div>
                            <button type="button" class="m-2 btn btn-outline-danger" disabled>Delete Task</button>
                        </li>

                    </ul>
                </div>
                <div class="card  mb-3">
                    <ul class="list-group list-group-flush">

                        <li class=" list-group-item d-flex justify-content-between align-items-start">
                            <div class="m-2  me-auto">
                                <div class="fw-bold">Change Password</div>
                                This will change Password for a current User
                            </div>
                            <button type="button" class="m-2 btn btn-outline-danger" disabled >Change Password</button>
                        </li>
                        <li class=" list-group-item d-flex justify-content-between align-items-start">
                            <div class="m-2  me-auto">
                                <div class="fw-bold">Logout</div>
                                Logout from the Applicaton
                            </div>
                            <button type="button" class="m-2 btn btn-outline-danger"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Logout</button>
                        </li>

                    </ul>
                </div>

            </div>

            <div className="modal fade" id="Workstationwindow" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="WorkstationwindowLable">Add {WORK_STATION}</h5>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Name</label>
                                <input required type="Name" value={addWorkStation} onChange={(e) => { setAddWorkStation(e.target.value) }} className="form-control" placeholder="Workstation Name"></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-warning" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-warning" onClick={appendChildData} data-bs-dismiss="modal">Add</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="Modelwindow" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModelwindowLable">Add {WORK_STATION_MODEL}</h5>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Select {WORK_STATION}</label>
                                <select className="form-select" value={workStation} onChange={(e) => { setWorkStation(e.target.value) }} aria-label="Default select example">
                                    <option selected>Select workstartion</option>
                                    {info.sort().map((data) => (<option key={data} value={data}>{data}</option>))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">{WORK_STATION_MODEL} Name</label>
                                <input type="Name" value={model} onChange={(e) => { setModel(e.target.value) }} className="form-control" placeholder="Name"></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-warning" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-warning" onClick={appendModel} data-bs-dismiss="modal">Add</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Confirm Logout</h5>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-outline-warning" onClick={logOut} data-bs-dismiss="modal" type="button">Yes</button>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-warning" data-bs-dismiss="modal" type="button">No</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Settings;
