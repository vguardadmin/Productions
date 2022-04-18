import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Login/Auth";
import { Navigate, } from "react-router-dom";
import Navbar from "../Others/Navbar";
import { db } from "../../config";
import { query, orderBy, getDocs, collection, } from "firebase/firestore";
import { ReactComponent as Downloadsvg } from '../../assets/download.svg';
import { ReactComponent as Resetsvg } from '../../assets/restart.svg';
import * as XLSX from 'xlsx';
import { TOTAL_COUNT, TOTAL_TIME, ACTUAL_COUNT, ACTUAL_TIME } from "../../constants/constants";
import { useNavigate } from 'react-router-dom';
import Loading from "../Others/loading";

var DateInfo;
var WorkStationInfo;
var WorkStationModelInfo;

const Completed = () => {

    const { currentUser } = useContext(AuthContext);
    const [info, setInfo] = useState([]);
    const [info1, setInfo1] = useState([]);
    const [workStation, setWorkStation] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        Get()
    }, []);
    const [loading, setloading] = useState(true);
    const Get = async () => {
        const docRef = collection(db, "total");
        const q = query(docRef, orderBy("date", "asc"));
        const docSnap = await getDocs(q);
        const res = [];
        docSnap.docChanges().forEach((element) => {
            var data = element.doc.data();
            res.push(data)
        })
        const res1 = [];
        for (let i = 0; i < res.length; i++) {
            res1.push(res[i].date.trim());
        };
        const res2 = [];
        for (let i = 0; i < res1.length; i++) {
            const element = res1[i];
            const docref = collection(db, element);
            const docsnap = await getDocs(docref);
            docsnap.docChanges().forEach((element) => {
                var data = element.doc.data();
                if (data.actualCount !== "") {
                    res2.push(data)
                }
            })
        }
        setInfo(res2.reverse());
        setInfo1(res2);
        const ws = [];
        const querySnapshot = await getDocs(collection(db, "workstation"));
        querySnapshot.forEach((doc) => {
            let s = doc.data();
            ws.push(s.workstation)
        });
        setloading(false);
        setWorkStation(ws);
    }
    const ExportToExcel = () => {
        let today = new Date();
        let counter = today.getTime() + "" + today.getDate() + "" + (today.getMonth() + 1) + "" + today.getFullYear();
        const data = info1;
        const fileName = counter+".xlsx";
        var worksheet = XLSX.utils.json_to_sheet(data);
        var new_workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(new_workbook, worksheet, fileName);
        XLSX.writeFileXLSX(new_workbook, fileName);
    }

    function Datarender(props) {
        function takenumber(num) {
            return num.charAt(num.length - 1)
        }
        return (
            <tr>
                <td>{props.id}</td>
                <td>{props.date}</td>
                <td>{takenumber(props.workstation)}</td>
                <td>{props.model}</td>
                <td>{props.count}</td>
                <td>{props.time}</td>
                <td>{props.actualCount}</td>
                <td>{props.actualTime}</td>
            </tr>
        )
    }

    if (!currentUser) {
        return <Navigate to="/LogIn" />;
    }

    const searcher = () => {
        var data = info;
        console.log(DateInfo);
        if (DateInfo) {
            const filteredData = data.filter(item => {
                return Object.keys(item).some(key =>

                    item[key].includes(DateInfo));
            });
            data = filteredData;
        }
        if (WorkStationInfo) {
            const filteredData = data.filter(item => {
                return Object.keys(item).some(key =>
                    item[key].includes(WorkStationInfo));
            });
            data = filteredData;
        }
        if (WorkStationModelInfo) {
            const filteredData = data.filter(item => {
                return Object.keys(item).some(key =>
                    item[key].includes(WorkStationModelInfo));
            });
            data = filteredData;
        }
        setInfo1(data);
    }
    const DateSort = (e) => {
        DateInfo = e.target.value;
        searcher()
    }
    const WorkStationSort = (e) => {
        WorkStationInfo = e.target.value
        searcher();
    }
    const WorkStationModelSort = (e) => {
        WorkStationModelInfo = e.target.value
        searcher();
    }
    const Reset = () => {
        DateInfo = "";
        WorkStationInfo = "";
        WorkStationModelInfo = "";
        setInfo1(info)
    }
    return (
        <div>
            <Navbar home={"btn btn-black text-white me-3"} report={"btn btn-warning me-3"} settings={"btn btn-black text-white me-3"} ></Navbar>

            <h2 className="ps-4 pt-1"> Reports</h2>
            <div className="m-4" style={{ borderRadius: "12px", overflow: "scroll", height: "600px", boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" }}>
                <ul className="nav nav-tabs p-3">

                    <li className="nav-item">
                        <p className="nav-link text-dark" onClick={() => navigate('/Report')}>All Task</p>
                    </li>
                    <li className="nav-item">
                        <p className="nav-link text-dark" onClick={() => navigate('/Pending')}> Pending</p>
                    </li>
                    <li className="nav-item">
                        <p className="nav-link active bg-warning rounded "> Completed</p>
                    </li>
                    <li className="nav-item">
                        <p className="btn btn-white " onClick={() => { Reset() }}> <Resetsvg></Resetsvg> Reset</p>
                    </li>
                    <li className="nav-item">
                        <p className="btn btn-white" onClick={() => { ExportToExcel() }}><Downloadsvg></Downloadsvg> Download Report</p>
                    </li>
                </ul>
                <div data-bs-spy="scroll" data-bs-offset="0" tabIndex="0" className="scrollspy-example border border-white">
                    <div className=" border border-white table-responsive border p-3" >
                        {loading ?
                            <center>
                                <Loading></Loading>
                            </center> :
                            <table className="table ">
                                <thead className="table">
                                    <tr>
                                        <th scope="col" style={{ width: "110px" }}>
                                            <input style={{ width: "110px" }} type="number" placeholder="id" className="form-control"></input>
                                        </th>
                                        <th scope="col" style={{ width: "150px" }}>
                                            <input style={{ width: "150px" }} type="date" value={DateInfo} onChange={e => DateSort(e)} className="form-control"></input>
                                        </th>
                                        <th scope="col" style={{ width: "160px" }}>
                                            <select style={{ width: "160px" }} className="form-select" value={WorkStationInfo} onChange={(e) => WorkStationSort(e)} aria-label="Default select example">
                                                <option value="">All WorkStation</option>
                                                {workStation.map((data) => (<option key={data} value={data}>{data}</option>))}
                                            </select></th>
                                        <th scope="col" style={{ width: "130px" }}>
                                            <select style={{ width: "130px" }} className="form-select" value={WorkStationModelInfo} onChange={(e) => WorkStationModelSort(e)} aria-label="Default select example">
                                                <option value="">All Model </option>
                                                <option value="small">small</option>
                                                <option value="medium">medium</option>
                                                <option value="large">large</option>
                                                <option value="verylarge">verylarge</option>
                                            </select>
                                        </th>
                                        <th scope="col">{TOTAL_COUNT}</th>
                                        <th scope="col">{TOTAL_TIME}</th>
                                        <th scope="col">{ACTUAL_COUNT}</th>
                                        <th scope="col">{ACTUAL_TIME}</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {info1.map((d) => (
                                        <Datarender
                                            key={d.id}
                                            id={d.id}
                                            date={d.date}
                                            workstation={d.workstation}
                                            model={d.substation}
                                            count={d.count}
                                            time={d.hr + ":" + d.min + " hrs"}
                                            actualTime={d.actualTime}
                                            actualCount={d.actualCount}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Completed;