import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import "./style.css";
import axios from "axios"
import DB_URL from "../../db.url";

function Row({ chemical, i }) {
    const [expired, setExpired] = useState(false);
    const [warn, setWarn] = useState(false);
    const [showMenu, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [load, setLoader] = useState(false);
    const [response, setResponse] = useState("")

    const removeRecord = async (id) => {
        console.log(id);
        setLoader(true)
        const response = await axios.delete(DB_URL + "/api.v1/chemicals/remove/" + chemical.chemicalCode, {
            headers: {
                token: window.localStorage.getItem("token")
            }
        })
        setResponse(response.data.data);
        setLoader(false);
        setShowModal(false);
        setTimeout(() => {
            window.location.reload();
        }, [1000])
    }

    useEffect(() => {
        const currentDate = new Date().toISOString();
        const expDate = (new Date(chemical.expiresAt)).toISOString();
        if (expDate.split("T")[0] < currentDate.split("T")[0]) {
            setExpired(true)
            console.log("case1")
        } else if (expDate.split("T")[0] == currentDate.split("T")[0]) {
            setWarn(true)
            console.log("case2")
        }
    }, [])
    return (
        <div className={expired ? "trow warn" : "trow"} key={i} style={{ "--col": 5 }}>
            {
                response != "" ? (
                    <div className="notification">
                        {response}
                    </div>
                ) : null
            }
            {
                showModal ? (
                    <div className="backdrop">
                        <div className="modal">
                            <p className="title">Delete Record</p>
                            <p className="sub">Are you sure, you want to delete this record?</p>
                            <p className="sub op">"Chemical Name: {chemical.name}"</p>
                            <div className="btnwrap">
                                <button className="dbtn ot" onClick={() => { setShowModal(false) }}>Cancel</button>
                                <button className="dbtn" style={{"--bg-col": "#f93737"}} onClick={() => removeRecord(chemical.chemicalCode)}>
                                    {
                                        load ? (
                                            <div className="loader" style={{ "--bg-col": "#f93737" }}></div>
                                        ) : "Delete"
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            <p className="data" style={{ userSelect: "none" }}>{i+1}</p>
            <p className="data">{chemical.chemicalCode}</p>
            <p className="data">{chemical.name}</p>
            <div className="data">
                <p>{(chemical.expiresAt).split("T")[0]}</p>
                {
                    expired ? (
                        <p className="tag">Expired</p>
                    ) : warn ? (
                        <p className="tag warn">Expiring</p>
                    ) : null
                }
            </div>
            <p className="data">{(chemical.manufacturedDate).split("T")[0]}</p>
            <p className="data">{chemical.quantity}</p>
            <p className="data act" onClick={() => setShow(!showMenu)}>
                <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                {
                    showMenu ? (
                        <div className="options">
                            <p className="opt" onClick={() => { setShow(!showMenu); setShowModal(true) }}>Remove</p>
                            <p className="opt" onClick={() => setShow(!showMenu)}>Restock</p>
                            <p className="opt" onClick={() => setShow(!showMenu)}>Update</p>
                        </div>
                    ) : null
                }
            </p>
        </div>
    )
}

function checkExt (filename) {
    const regex = /\.xlsx$/i;
    return regex.test(filename);
}

function NewChemical({ callback, cancel, response }) {
    const [file, setFile] = useState(null);
    const uploadRef = useRef();
    const [load, setLoad] = useState(false);
    const [warn, setWarn] = useState("")

    const handleFileChange = (e) => {
        if(checkExt(e.target.files[0]?.name)){
            setWarn("")
            setFile(e.target.files[0]);
        }else{
            console.log("Invalid File, please upload a proper excel!")
            setWarn("Invalid File, please upload a proper excel!")
        }
    };
    const handleSave = () => {
        if (file) {
            callback(file, setLoad, setWarn);
            setWarn("")
        } else {
            console.log("No file selected")
            setWarn("No file selected");
        }
    };

    return (
        <div className="backdrop">
            <div className="modal">
                <p className="mtitle">Bulk uploads</p>
                <p className="sub">Effortlessly Document and Organize Your Lab Records.</p>
                {
                    response == "" ? (
                        <>
                            <div className="upload" onClick={() => uploadRef.current.click()}>
                                <ion-icon name="cloud-upload-outline"></ion-icon>
                                <p className="usub">Drag and Drop to create new chemicals</p>
                                <p className="subtag">For Maximum browser support, use excel file format</p>
                                <button className="upl">Upload File</button>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    ref={uploadRef}
                                    hidden
                                />
                            </div>
                            {
                                file ? (
                                    <div className="row">
                                        <div className="wr">
                                            <ion-icon name="document"></ion-icon>
                                            {file.name}
                                        </div>
                                        <div className="wr" onClick={() => setFile(null)}>
                                            <p>{Math.round((parseInt(file.size) / 1024))}KB</p>
                                            <ion-icon name="trash"></ion-icon>
                                        </div>
                                    </div>
                                ) : null
                            }
                            {
                                warn != "" ? (
                                    <p className="warn">
                                        <ion-icon name="warning"></ion-icon>
                                        {warn}
                                    </p>
                                ) : null
                            }
                            <div className="btnwrap">
                                <button onClick={cancel} className="dbtn ot">
                                    Cancel
                                </button>
                                <button className="dbtn" style={{ background: "#000" }} onClick={handleSave}>
                                    {
                                        load ? (
                                            <div className="loader" style={{"--bg-col": "#000"}}></div>
                                        ) : "Generate"
                                    }
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="upload file" style={{height: "150px", padding: "15px"}}>
                            <ion-icon name="cloud-done"></ion-icon>
                            <p className="utit">File Uploaded</p>
                            <p className="sub">{response}</p>
                            <a href="/chemicals" className="btn">View Chemicals</a>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default function Chemicals() {
    const [chemicals, setChemicals] = useState([]);

    const [startIndex, setStart] = useState(0);
    const itemsPerPage = 15;
    const [endIndex, setEnd] = useState(itemsPerPage);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalLength, setTotalLength] = useState(0);
    const [showAdd, setShow] = useState(false);
    const [response, setResponse] = useState("")

    const fetchChemicals = async (start, end) => {
        const response = await axios.get(DB_URL + "/api.v1/chemicals", {
            headers: {
                token: window.localStorage.getItem("token")
            }
        });
        setChemicals(response.data.data.slice(start, end));
        setTotalLength(response.data.data.length)
    };

    const nextPage = () => {
        setPageIndex(pageIndex + 1);
        const newStart = pageIndex * itemsPerPage;
        const newEnd = newStart + itemsPerPage;
        setStart(newStart);
        setEnd(newEnd);
        if ((newEnd - totalLength) < itemsPerPage) {
            fetchChemicals(newStart, newEnd);
        }
    };

    const prevPage = () => {
        setPageIndex(pageIndex - 1);
        const newStart = pageIndex * itemsPerPage;
        const newEnd = newStart + itemsPerPage;
        setStart(newStart);
        setEnd(newEnd);
        if ((newEnd - totalLength) < itemsPerPage) {
            fetchChemicals(newStart, newEnd);
        }
    };

    //modal
    const modalCallback = async (file, setState, warn) => {
        try {
            setState(true)
            const formData = new FormData();
            formData.append("file", file)
            const resp = await axios.post(DB_URL + "/api.v1/chemicals/preRecordData", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "token": window.localStorage.getItem("token")
                }
            });
            setResponse(resp.data.data)
            setState(false)
        } catch (error) {
            setState(false)
            warn(error.response.data.data);
        }
    };
    const closeModal = () => {
        setShow(false)
    }

    useEffect(() => {
        fetchChemicals(startIndex, endIndex);
        console.log(chemicals.length)
    }, []);

    // db1b32
    return (
        <div className="container">
            <Navbar />
            {
                showAdd ? (
                    <NewChemical callback={modalCallback} cancel={closeModal} response={response} />
                ) : null
            }
            <div className="st-cont">
                <div className="trow">
                    <div className="wrap">
                        <p className="title">Chemicals</p>
                        <p className="sub">Easily manage and monitor all your materials from a single location!</p>
                    </div>
                    <button className="btn" onClick={() => setShow(true)}>
                        <ion-icon name="add-outline"></ion-icon>
                        Add Chemicals
                    </button>
                </div>
                <div className="tab">
                    <div className="trow" style={{ "--col": 5 }}>
                        <p className="head">Sno <span>*</span></p>
                        <p className="head">Chemical Code <span>*</span></p>
                        <p className="head">Name <span>*</span></p>
                        <p className="head">Expires At <span>*</span></p>
                        <p className="head">Manufatured Date <span>*</span></p>
                        <p className="head">Quantity <span>*</span></p>
                        <p className="head act" onClick={() => nextPage()}>
                            <ion-icon name="add-outline"></ion-icon>
                        </p>
                    </div>
                    {
                        chemicals.length > 0 ? chemicals?.map((chemical, i) => (
                            <Row chemical={chemical} i={i} key={i} />
                        )) : (
                            <div className="center">
                                <ion-icon name="warning-outline"></ion-icon>
                                <p className="nf">Oops! No chemicals found</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}