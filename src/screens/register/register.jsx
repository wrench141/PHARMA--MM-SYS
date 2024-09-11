import { useRef, useState } from "react";
import "./style.css";
import axios from "axios"
import DB_URL from "../../db.url";
import Footer from "../../components/footer/footer";

export default function Register(){
    
    const [checkbox, setCheck] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [loader, setLoader] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [password, setPassword] = useState("");

    const [notification, setNotification] = useState("")

    const submitHandler = async() => {
        console.log("heelo")
        setLoader(true)
        try {
            const data = {
                username, email, eid: employeeId, password
            }
            const response = await axios.post(DB_URL + "/api.v1/auth/register", data);
            setNotification(response.data.data);
            window.localStorage.setItem("token", response.data.token);
            setTimeout(() => {
                window.location.href = "/"
            }, [1500])
        } catch (error) {
            setLoader(false)
            setNotification(error.response.data.data)
            console.log(error)
        }
    }


    return(
        <div className="register">
            {
                notification != "" ? (
                    <div className="notification">{notification}</div>
                ) : null
            }
            <div className="img-container">
                <img src="/assets/register.png" alt="" className="img" />
                <div className="txt">
                    <div className="row">
                        <img src="/assets/logo2.png" alt="" className="img-logo"/>
                        <p className="logo">QuickStock</p>
                    </div>
                    <p className="title">Material Management System for Efficient Lab Operations</p>
                    <p className="sub">A solution for streamlined management and efficient use of materials across multiple college labs</p>
                </div>
            </div>
            <div className="section">
                <div className="wrap">
                    <p className="title">Let's Create a QuickStock account First.</p>
                    <div className="wrapper">
                        <label className="lab">Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Unique Username" name=""  className="inp" />
                    </div>
                    <div className="wrapper">
                        <label className="lab">Emplyee Id</label>
                        <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="Your employee id" name=""  className="inp" />
                    </div>
                    <div className="wrapper">
                        <label className="lab">Email</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Professional email id" name=""  className="inp" />
                    </div>
                    <div className="wrapper">
                        <label className="lab">Password</label>
                        <div className="row">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPass ? "text" : "password"} placeholder="Enter strong password" name="" className="inp" />
                            <button className="btn vm" onClick={() => setShowPass(!showPass)}>
                                {
                                    showPass ? (
                                        <ion-icon name="eye-outline"></ion-icon>
                                    ) : (
                                        <ion-icon name="eye-off-outline"></ion-icon>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className={checkbox ? "custombox sel" : "custombox" } onClick={() => setCheck(!checkbox)}>
                            <ion-icon name="checkmark-outline"></ion-icon>      
                        </div>
                        <input type="checkbox" value={checkbox} onChange={(e) => setCheck(e.target.value)} name="" id="" className="ckb" hidden />
                        <p className="lab" onClick={() => setCheck(!checkbox)}>Remember me</p>
                    </div>
                    <button className="btn" onClick={submitHandler} disabled={loader}>
                        {
                            loader ? (
                                <div className="loader" style={{"--bg-col": "#1a1c1e"}}></div>
                            ) : "Register"
                        }
                    </button>
                    <button className="btn ot" onClick={() => window.location.href = "/login"}>Already account exists? Login</button>
                </div>
            </div>
        </div>
    )
}