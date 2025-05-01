import { useEffect, useState } from "react";
import "./style.css";
import {useParams} from "react-router-dom";
import axios from "axios";
import DB_URL from "../../db.url";

function Record ({chemical, i, callback, chemicals}){
    const status = chemicals?.find(chem => chem.id == chemical._id) || false;
    const [state, setState] = useState();
    useEffect(() => {
        setState(parseInt(status.quantity))
    }, [])
    return(
        <div className="grid-wrapper">
            <input type="text" value={i}  disabled className="inp" />
            <input type="text" value={chemical.name}  disabled className="inp" />
            <input type="number" value={state} onChange={(e) => {
                setState(e.target.value);
                callback(chemical._id, e.target.value)
            }} placeholder={`Current Quantity: ${chemical.quantity}`} className="inp" />
            <input type="text" value={chemical.quantity.match(/^(\d+)(.*)$/)[2]}  disabled className="inp" />
        </div> 
    )
}

export default function Jobrecard({chemicals, setState, expId}){

    const [data, setData] = useState({});
    const {id} = useParams();
    const [changes, setChanges] = useState([]);
    const [expName, setExpName] = useState("");
    const [studentsLength, setStudentsLength] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("")

    useEffect(() => {
        const getLab = async() => {
            try {
                const response = await axios.get(DB_URL + "/api.v1/labs/experiment/" + expId, {
                    headers: {
                        token: window.localStorage.getItem("token")
                    }
                });
                let res = response.data.data;
                setData(response.data.data)
                setExpName(res.experiment);
                setStudentsLength(res.length);
            } catch (error) {
                console.log(error)
            }
        }
        if(expId){
            getLab()
        }
    }, [])

    


    const callback = (id, quantity) => {
        try {
            const chemicalRec = {
                id : id,
                quantity
            }
            const extChemicals = changes.filter((chemical) => {return chemical.id != id});
            setChanges([...extChemicals, chemicalRec]);
        } catch (error) {
            console.log(error)
        }
    }

 
    async function submitHandler (){
        try {
            setLoading(true)
            const data = {
                labId: id,
                experiment: expName,
                length: studentsLength,
                chemicals: changes
            };
            console.log(data)
            const response = await axios.post(DB_URL + "/api.v1/labs/changeStock/" + id, {data}, {
                headers: {
                    token: window.localStorage.getItem("token")
                }
            })
            setLoading(false);
            setResponse(response.data.data)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return(
        <div className="backdrop">
            <div className="job-container">
                <p className="title">Record Job Card</p>
                <p className="sub">Manage your job cards easily.</p>
                <div className="lgrid">
                    <div className="wrap">
                        <p className="lab">Experiment Name</p>
                        <input type="text" value={expName} onChange={(e) => {
                            setExpName(e.target.value)
                        }} placeholder="Enter Experiment name" name="" id="" className="inp" />
                    </div>
                    <div className="wrap">
                        <p className="lab">No of Present Students</p>
                        <input type="number" value={studentsLength} onChange={(e) => setStudentsLength(e.target.value)} placeholder="No of Students Present" name="" id="" className="inp" />
                    </div>
                </div>
                <div className="items">
                    <div className="wrap">
                        <p className="lab">Select Chemicals</p>
                        {
                            chemicals.map((chemical, i) => (
                                <Record key={i} chemical={chemical} i={i+1} callback={callback} chemicals={data.chemicals}/>
                            ))
                        }
                    </div>
                </div>
                {
                    expId != "" ? (
                        <div className="btnwrap">
                            <button className="btn ot" style={{color: "white"}} onClick={() => setState(false)}>
                                Close
                            </button>
                            <button className={
                                response != "" ? "btn ico check" : "btn ico"
                            } onClick={() => submitHandler()}>
                                {
                                    loading ? (
                                        <div className="loader" style={{"--bg-col": "black"}}></div>
                                    ) : (
                                        <>
                                            {
                                                response != "" ? (
                                                    <>
                                                        <ion-icon name="cloud-done-outline"></ion-icon>
                                                        {"Record Added"}
                                                    </>
                                                ) : (
                                                    <>
                                                        <ion-icon name="cloud-upload-outline"></ion-icon>
                                                        Create Record
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }
                            </button>
                        </div>
                    ) : (
                        <div className="btnwrap">
                            <button className="btn ot" style={{color: "white"}} onClick={() => setState(false)}>
                                Cancel
                            </button>
                            <button className={
                                response != "" ? "btn ico check" : "btn ico"
                            } onClick={() => submitHandler()}>
                                {
                                    loading ? (
                                        <div className="loader" style={{"--bg-col": "black"}}></div>
                                    ) : (
                                        <>
                                            {
                                                response != "" ? (
                                                    <>
                                                        <ion-icon name="cloud-done-outline"></ion-icon>
                                                        {response}
                                                    </>
                                                ) : (
                                                    <>
                                                        <ion-icon name="cloud-upload-outline"></ion-icon>
                                                        Record Data
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}