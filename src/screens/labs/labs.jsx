import { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import "./style.css";


//steps
function Step1(){
    return(
        <>
            
        </>
    )
}

export default function Labs(){
    const [showCreateModal, setShowCM] = useState(false);
    const [stepCount, setStepCount] = useState(1);

    const [labname, setLabname] = useState("");
    const [roomNo, setRoomNo] = useState("");
    const [Incharge, setIncharge] = useState(" ");


    return(
        <div className="container">
            <Navbar />
            <div className="st-cont">
                <p className="title">Laboratories</p>
                <p className="sub">Easily manage and monitor all your materials from a single location!</p>
                <div className="tab">
                    <div className="trow" style={{"--col": 5}}>
                        <p className="head">Sno <span>*</span></p>
                        <p className="head">Lab Id <span>*</span></p>
                        <p className="head">Name <span>*</span></p>
                        <p className="head">Room No <span>*</span></p>
                        <p className="head">Incharge <span>*</span></p>
                        <p className="head act" onClick={() => {
                            setShowCM(true)
                        }}>
                            <ion-icon name="add-outline"></ion-icon>
                        </p>
                    </div>
                    <div className="trow" style={{"--col": 5}}>
                        <p className="data">01</p>
                        <p className="data">PH01</p>
                        <p className="data">Pharmacology</p>
                        <p className="data">B-32</p>
                        <p className="data">Sidhardha</p>
                        <p className="data act">
                            <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                        </p>
                    </div>
                </div>
                {
                    showCreateModal ? (
                        <div className="backface">
                            <div className="steps">
                                <div className={stepCount == 1 || 2 || 3 ? "circle sel" : "circle"}>
                                    <ion-icon name="document-text-outline"></ion-icon>
                                </div>
                                <div className="line">
                                    <div className={stepCount == 2 || 3 ? "progress sel" : "progress"}></div>
                                </div>
                                <div className={stepCount == 2 || 3 ? "circle sel" : "circle"}>
                                    <ion-icon name="duplicate-outline"></ion-icon>
                                </div>
                                <div className="line">
                                    <div className={stepCount == 3 ? "progress sel" : "progress"}></div>
                                </div>
                                <div className={stepCount == 3 ? "circle sel" : "circle"}>
                                    <ion-icon name="checkmark-circle-outline"></ion-icon>
                                </div>
                            </div>
                            <div className="modal">
                                <p className="mtitle">Create New Laboratory</p>
                                <p className="sub">Effortlessly Document and Organize Your Lab Records.</p>
                                <div className="warning">
                                    <ion-icon name="alert-circle"></ion-icon>
                                    Please double-check all entries for accuracy before saving. Incomplete or incorrect records may lead to data discrepancies.
                                </div>
                                
                                {
                                    stepCount == 1 ? (
                                        <>
                                            {/* /step 1 */}
                                            <div className="wrap">
                                                <label htmlFor="name" className="lab">Lab Name</label>
                                                <input type="text" placeholder="Enter Lab name" name="" id="" className="inp" />
                                            </div>
                                            <div className="wrap">
                                                <label htmlFor="name" className="lab">Room no</label>
                                                <input type="text" placeholder="Enter Lab Room Number" name="" id="" className="inp" />
                                            </div>
                                            <div className="wrap">
                                                <label htmlFor="name" className="lab">Incharge Selection</label>
                                                <select name="" className="inp" id="">
                                                    <option value="" className="opt">Sidhardha</option>
                                                    <option value="" className="opt">Not Available</option>
                                                </select>
                                            </div>
                                            {/* step 1 end */}
                                        </>
                                    ) : (
                                        <>
                                            {/* /step 1 */}
                                            <div className="wrap">
                                                <label htmlFor="name" className="lab">Select Chemicals and Quantity</label>
                                                <div className="select">
                                                    <div className="header">
                                                        <div className="head">
                                                            <input type="checkbox" className="cb" />
                                                        </div>
                                                        <p className="head">Sno</p>
                                                        <p className="head">Chemical Name</p>
                                                        <p className="head">Quantity</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* step 1 end */}
                                        </>
                                    )
                                }
                                
                                <div className="grow">
                                    <button className="obtn btn" onClick={() => {
                                        setShowCM(false)
                                    }}>Cancel</button>
                                    <button className="btn" onClick={() => setStepCount(stepCount+1)}>
                                        Select Chemicals
                                        <ion-icon name="arrow-forward-outline"></ion-icon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}