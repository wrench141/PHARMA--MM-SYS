    import { useParams } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DB_URL from "../../db.url";
import Jobrecard from "./dataentry";

export default function Lab(){
    const {id} = useParams();
    const [show, setShow] = useState(false);
    const [chemicals, setChemicals] = useState([]);
    const [experiments, setExperiments] = useState([]);
    const [experiment, setExperiment] = useState("");


    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(DB_URL + `/api.v1/labs/${id}`, {
                    headers:{
                        token: window.localStorage.getItem("token")
                    }
                });
                setChemicals(response.data.chemicals)
                console.log(response.data.chemicals)
            } catch (error) {
                console.log(error)
            }
        };

        const fetchExperiments = async() => {
            try {
                const response = await axios.get(DB_URL + "/api.v1/labs/experiments/" + id, {
                    headers: {
                        token: window.localStorage.getItem("token")
                    }
                });
                setExperiments(
                    response.data
                );
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
        fetchExperiments();
    }, [])
    return(
        <div className="lcontainer">
            <div className="topbar">
                <div className="wrap">
                    <div className="logo-wrap">
                        <img src="/assets/logo2.png" alt="" className="lg" />
                    </div>
                    <p className="logo">QuickStock</p>
                </div>
                <button className="btn">Logout</button>
            </div>
            <div className="lab-center">
                <p className="tag">Welcome {experiments?.username}, {experiments?.lab}</p>
                <p className="title">
                    Detailed Consumption Report of Chemicals and Lab Equipment
                </p>
                <p className="sub">
                    This report analyzes the usage patterns of chemicals and lab equipment to optimize inventory and resource management.
                </p>
                <div className="btn-wrap">
                    <button className="btn ot">
                        <ion-icon name="warning-outline"></ion-icon>
                        Raise Breakage
                    </button>
                    <button className="btn" onClick={() => {setShow(true); setExperiment("")}}>
                        <ion-icon name="add-outline"></ion-icon>
                        Create Job Record
                    </button>
                </div>
            </div>
            <div className="cards" style={{height: "max-content", paddingBottom: "50px"}}>
                <p className="title">Job Cards</p>
                <div className="cards-wrap">
                    {
                        experiments?.data?.map((exp, i) => (
                            <div className="card" key={i} onClick={() => { setExperiment(exp._id)}}>
                                {
                                    show ? (
                                        <Jobrecard chemicals={chemicals} setState={setShow} expId={experiment}/>
                                    ) : null
                                }
                                <div className="sec">
                                    <p className="date">{exp.createdAt.split("T")[0]}</p>
                                    <p className="name">{exp.experiment}</p>
                                    <p className="sub">Click on this card to view more..</p>
                                </div>
                                <div className="row">
                                    <div className="wrap">
                                        <p className="num">{exp.chemicals.length}</p>
                                        <p className="lab">Chemicals used</p>
                                    </div>
                                    <button className="btn" onClick={() => {setShow(true); setExperiment(exp._id)}}>
                                        <ion-icon name="arrow-forward-outline"></ion-icon>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="cards" style={{height: "max-content", paddingBottom: "50px"}}>
                <p className="title">Stock Information</p>
                <table className="table">
                    <tr className="row">
                        <th className="head">Sno</th>
                        <th className="head">Code </th>
                        <th className="head">Name </th>
                        <th className="head">Expires At </th>
                        <th className="head">Manufactured </th>
                        <th className="head">Quantity </th>
                    </tr>
                    {
                        chemicals.length > 0 ? chemicals.map((chemical, i) => (
                            <tr className="row">
                                <td className="data">{i+1}</td>
                                <td className="data">{chemical?.chemicalCode}</td>
                                <td className="data">{chemical?.name}</td>
                                <td className="data">{chemical?.expiresAt.split("T")[0]}</td>
                                <td className="data">{chemical?.manufacturedDate.split("T")[0]}</td>
                                <td className="data">{chemical?.quantity}</td>
                            </tr>
                        )) : null
                    }
                </table>
            </div>
        </div>
    )
}