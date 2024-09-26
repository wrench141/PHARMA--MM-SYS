import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import "./style.css";
import axios from "axios"
import DB_URL from "../../db.url";

//rows
function Row({ data, i, callback }) {
    const [selected, setSelected] = useState(false);
    const [quantity, setQuantity] = useState();
    const [warn, setWarn] = useState(false);
    return (
        <div className={selected ? "row sel" : "row"}>
            <p className="bdy">{i}</p>
            <p className="bdy">{data.name}</p>
            <div className="bdy">
                <input type="number" placeholder="enter quantity" className={warn ? "inp warn" : "inp"} value={quantity} onChange={(e) => {
                    setQuantity(e.target.value)
                    if (!quantity) {
                        setWarn(true)
                    } else { setWarn(false) }
                }} />
            </div>
            <div className="bdy">
                <button onClick={() => {
                    if (quantity) {
                        setSelected(!selected);
                        callback(!selected, data, quantity);
                        setWarn(false)
                    } else {
                        setWarn(true)
                    }
                }} className={selected ? "btn sel" : "btn"}>
                    {
                        selected ? "Remove" : "Add"
                    }
                </button>
            </div>
        </div>
    )
}

function TableRow({ lab, i }) {
    const [open, setOpen] = useState(false);
    const [labname, setLabname] = useState(lab.name);
    const [labid, setLabId] = useState(lab.name.toString().slice(0, 2).toUpperCase() + lab.roomNo)
    const [roomNo, setRoomNo] = useState(lab.roomNo);
    const [Incharge, setIncharge] = useState(lab.inChargeId);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(DB_URL + "/api.v1/auth/users", {
                    headers: {
                        token: window.localStorage.getItem("token")
                    }
                });
                setUsers(response.data.data)
            } catch (error) {
                console.log(error)
            }
        };
        fetchUsers();
        console.log(lab.chemicals)
    }, [])

    return (
        <div className={open ? "openWrap open" : "openWrap"}>
            <div className="ltrow" style={{ "--col": 5 }}>
                <p className="data">{i + 1}</p>
                <p className="data">{lab.name.toString().slice(0, 2).toUpperCase() + lab.roomNo}</p>
                <p className="data">{lab.name}</p>
                <p className="data">{lab.roomNo}</p>
                <p className="data">{lab.inChargeId}</p>
                <p className="data act" onClick={() => setOpen(!open)}>
                    <ion-icon name={open ? "caret-up" : "caret-down"}></ion-icon>
                </p>
            </div>
            <div className="group">
                <div className="section">
                    <p className="title">Lab Details</p>
                    <p className="sub">You  can edit the lab details from here</p>
                    <button className="btn" onClick={() => window.location.href = `/lab/${lab._id}`}>View Lab</button>
                </div>
                <div className="grid">
                    <div className="wrap">
                        <label className="lab">Lab Id</label>
                        <input type="text" value={labid} onChange={(e) => setLabId(e.target.value)} placeholder="Enter Lab Id" className="inp" />
                    </div>
                    <div className="wrap">
                        <label className="lab">Lab Name</label>
                        <input type="text" value={labname} onChange={(e) => setLabname(e.target.value)} placeholder="Enter Lab Id" className="inp" />
                    </div>
                    <div className="wrap">
                        <label className="lab">Room Number</label>
                        <input type="text" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} placeholder="Enter Lab Id" className="inp" />
                    </div>
                    <div className="wrap">
                        <label className="lab">Lab Incharge</label>
                        <select name="" className="inp" id="" value={Incharge} onChange={(e) => { setIncharge(e.target.value) }}>
                            <option value="">Select an option</option>
                            {
                                users?.map((user, i) => (
                                    <option value={user.employeeId} key={i} className="opt">{user.employeeId}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="wrap">
                        <div className="btn-row">
                            <button className="btn tr">Cancel</button>
                            <button className="btn">Save Details</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="group">
                <div className="section">
                    <p className="title">Stock Monitor</p>
                    <p className="sub">Stock Changes are being monitored here...</p>
                </div>
                <div className="tab" style={{padding: "20px"}}>
                    <div className="ltrow" style={{ "--col": 5, gridTemplateColumns: "repeat(5, 1fr)", height: "max-content" }}>
                        <p className="head">Code </p>
                        <p className="head">Name </p>
                        <p className="head">Expires At </p>
                        <p className="head">Manufactured </p>
                        <p className="head">Quantity </p>
                    </div>
                    {
                        lab.chemicals?.map((chemical) => (
                            <div className="ltrow" style={{ "--col": 5, background: "white", gridTemplateColumns: "repeat(5, 1fr)", height: "max-content" }}>
                                <p className="data">{chemical?.chemicalCode}</p>
                                <p className="data">{chemical?.name}</p>
                                <p className="data">{chemical?.expiresAt.split("T")[0]}</p>
                                <p className="data">{chemical?.manufacturedDate.split("T")[0]}</p>
                                <p className="data">{chemical?.quantity}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default function Labs() {
    const [showCreateModal, setShowCM] = useState(false);
    const [stepCount, setStepCount] = useState(1);

    const [labname, setLabname] = useState("");
    const [roomNo, setRoomNo] = useState("");
    const [Incharge, setIncharge] = useState("");
    const [users, setUsers] = useState([]);

    const [warn, setWarn] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");

    const [selChemicals, setSelChemicals] = useState([]);
    const [chemicals, setChemicals] = useState([]);
    const [backupChemicals, setBackup] = useState([])

    const [startIndex, setStart] = useState(0);
    const itemsPerPage = chemicals.length;
    const [endIndex, setEnd] = useState(itemsPerPage);
    const [totalLength, setTotalLength] = useState(0);

    const [response, setResponse] = useState({});
    const [labs, setLabs] = useState([])

    const fetchData = async () => {
        const response = await axios.get(DB_URL + "/api.v1/chemicals", {
            headers: {
                token: window.localStorage.getItem("token")
            }
        });
        setChemicals(response.data.data.sort((a, b) => {
            return a.id.localeCompare(b.id);
        }));
        setBackup(response.data.data.sort((a, b) => { return a.id.localeCompare(b.id) }))
        setTotalLength(response.data.data.length);
    };




    const search = (e) => {
        const query = e.target.value
        setSearchQuery(query);
        const results = query ? backupChemicals.filter((chemical) => chemical.name.includes(query)) : backupChemicals;
        setChemicals(results)
    };

    useEffect(() => {
        fetchData();
        const fetchUsers = async () => {
            try {
                const response = await axios.get(DB_URL + "/api.v1/auth/users", {
                    headers: {
                        token: window.localStorage.getItem("token")
                    }
                });
                setUsers(response.data.data)
            } catch (error) {
                console.log(error)
            }
        };

        const fetchLabs = async () => {
            try {
                const response = await axios.get(DB_URL + "/api.v1/labs/", {
                    headers: {
                        token: window.localStorage.getItem("token")
                    }
                });
                setLabs(response.data.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchUsers();
        fetchLabs();
    }, [])


    const setChemical = (state, chemical, quantity) => {
        console.log(state, chemical, quantity);
        if (state) {
            setSelChemicals([...selChemicals, { chemicalId: chemical._id, quantity }]);
        } else {
            const removedChems = selChemicals.filter((exist_chemical) => chemical._id != exist_chemical.chemicalId);
            setSelChemicals(removedChems);
        }
    };


    const createLab = async () => {
        try {
            const data = {
                name: labname, roomNo, inChargeId: Incharge, chemicals: selChemicals
            };
            const response = await axios.post(DB_URL + "/api.v1/labs/create", data, {
                headers: {
                    token: window.localStorage.getItem("token")
                }
            })
            setResponse(response.data);
            setStepCount(stepCount + 1);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="container">
            <Navbar />
            <div className="st-cont">
                <div className="trow">
                    <div className="wrap">
                        <p className="title">Laboratories</p>
                        <p className="sub">Easily manage and monitor all your materials from a single location!</p>
                    </div>
                    <button className="btn" onClick={() => {
                        setShowCM(true)
                    }}>
                        <ion-icon name="add-outline"></ion-icon>
                        New Laboratory
                    </button>
                </div>
                <div className="tab">
                    <div className="ltrow" style={{ "--col": 5 }}>
                        <p className="head">Sno <span>*</span></p>
                        <p className="head">Lab Id <span>*</span></p>
                        <p className="head">Name <span>*</span></p>
                        <p className="head">Room No <span>*</span></p>
                        <p className="head">Incharge <span>*</span></p>
                        <p className="head act">
                            <ion-icon name="add-outline"></ion-icon>
                        </p>
                    </div>
                    {
                        labs.length > 0 ? labs?.map((lab, i) => (
                            <TableRow lab={lab} i={i} />
                        )) : (
                            <div className="center">
                                <ion-icon name="warning-outline"></ion-icon>
                                <p className="nf">No Labs found! try adding one</p>
                            </div>
                        )
                    }
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
                                {
                                    stepCount != 3 ? (
                                        <>
                                            <p className="mtitle">Create New Laboratory</p>
                                            <p className="sub">Effortlessly Document and Organize Your Lab Records.</p>
                                        </>
                                    ) : null
                                }
                                {
                                    stepCount == 1 ? (
                                        <div className="warning">
                                            <ion-icon name="alert-circle"></ion-icon>
                                            Please double-check all entries for accuracy before saving. Incomplete or incorrect records may lead to data discrepancies.
                                        </div>
                                    ) : null
                                }

                                {
                                    stepCount == 1 ? (
                                        <>
                                            {/* /step 1 */}
                                            <div className="wrap">
                                                <label htmlFor="name" className="lab">Lab Name</label>
                                                <input type="text" placeholder="Enter Lab name" name="" value={labname} onChange={(e) => setLabname(e.target.value)} id="" className={!warn != "" ? "inp" : "inp warn"} />
                                            </div>
                                            <div className="wrap">
                                                <label htmlFor="name" className="lab">Room no</label>
                                                <input type="text" placeholder="Enter Lab Room Number" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} name="" id="" className={!warn != "" ? "inp" : "inp warn"} />
                                            </div>
                                            <div className="wrap">
                                                <label htmlFor="name" className="lab">Incharge Selection</label>
                                                <select name="" className={!warn != "" ? "inp" : "inp warn"} id="" value={Incharge} onChange={(e) => { setIncharge(e.target.value) }}>
                                                    <option value="">Select an option</option>
                                                    {
                                                        users?.map((user, i) => (
                                                            <option value={user.employeeId} key={i} className="opt">{user.employeeId}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            {/* step 1 end */}
                                        </>
                                    ) : stepCount == 2 ? (
                                        <>
                                            {/* /step 2 */}
                                            <div className="wrap">
                                                <label htmlFor="name" className="lab">Select Chemicals and Quantity</label>
                                                <div className="row" style={{
                                                    display: "flex",
                                                    gap: "10px"
                                                }}>
                                                    <input type="text" placeholder="Search chemicals.." className="inp" value={searchQuery} onChange={(e) => search(e)} />

                                                    <button className={startIndex == 0 ? "cbtn disabled" : "cbtn"} disabled={startIndex == 0 ? true : false} onClick={() => prevPage()}>
                                                        <ion-icon name="chevron-back-outline"></ion-icon>
                                                    </button>
                                                    <button className={endIndex >= totalLength ? "cbtn disabled" : "cbtn"} disabled={endIndex >= totalLength ? true : false} onClick={() => {
                                                        nextPage()
                                                    }}>
                                                        <ion-icon name="chevron-forward-outline"></ion-icon>
                                                    </button>
                                                </div>
                                                <div className="select">
                                                    <div className="row">
                                                        <p className="head">Sno</p>
                                                        <p className="head">Chemical Name</p>
                                                        <p className="head">Quantity</p>
                                                        <div className="head">
                                                            <div className="btn ot">Action</div>
                                                        </div>
                                                    </div>
                                                    {
                                                        chemicals.map((chemical, i) => (
                                                            <Row data={chemical} i={i + 1} callback={setChemical} />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            {/* step 2 end */}
                                        </>
                                    ) : (
                                        <div className="suc">
                                            {/* /step 3 */}
                                            <div className="logo">
                                                <ion-icon name="checkmark"></ion-icon>
                                            </div>
                                            <p className="title">New Lab Created!</p>
                                            <p className="sub">{response?.data}</p>
                                            <a href="/labs" className="view">View lab</a>
                                            {/* step 3 end */}
                                        </div>
                                    )
                                }
                                {
                                    stepCount == 1 ? (
                                        <div className="grow">
                                            <button className="obtn btn" onClick={() => {
                                                setShowCM(false)
                                            }}>Cancel</button>
                                            <button className="btn" onClick={() => {
                                                if (labname != "" && Incharge != "" && roomNo != "") {
                                                    setStepCount(stepCount + 1)
                                                    setWarn(false)
                                                } else {
                                                    setWarn(true)
                                                }
                                            }}>
                                                Select Chemicals
                                                <ion-icon name="arrow-forward-outline"></ion-icon>
                                            </button>
                                        </div>
                                    ) : stepCount == 2 ? (
                                        <div className="grow">
                                            <button className="obtn btn" onClick={() => {
                                                setStepCount(stepCount - 1)
                                            }}>Back</button>
                                            <button className="btn" onClick={() => { ; createLab() }}>
                                                Create Lab
                                                <ion-icon name="arrow-forward-outline"></ion-icon>
                                            </button>
                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}