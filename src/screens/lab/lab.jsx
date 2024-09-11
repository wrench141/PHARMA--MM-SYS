    import { useParams } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DB_URL from "../../db.url";
import Jobrecard from "./dataentry";

export default function Lab(){
    const {id} = useParams();
    const [show, setShow] = useState(false)
    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get(DB_URL + `/api.v1/labs/${id}`, {
                headers:{
                    token: window.localStorage.getItem("token")
                }
            });
            console.log(response.data)
        };
        fetchData()
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
                    <button className="btn" onClick={() => setShow(true)}>
                        <ion-icon name="add-outline"></ion-icon>
                        Create Job Record
                    </button>
                </div>
            </div>
            {
                show ? (
                    <Jobrecard />
                ) : null
            }
            <div className="cards">
                <p className="title">Job Cards</p>
                <div className="cards-wrap">
                    <div className="card">
                        <div className="sec">
                            <p className="date">02-09-2004</p>
                            <p className="name">Chemical Reaction</p>
                            <p className="sub">Click on this card to view more..</p>
                        </div>
                        <div className="row">
                            <div className="wrap">
                                <p className="num">14</p>
                                <p className="lab">Chemicals used</p>
                            </div>
                            <button className="btn">
                                <ion-icon name="arrow-forward-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}