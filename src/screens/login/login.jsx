    import { useEffect, useRef, useState } from "react";
import "../register/style.css";
import axios from "axios"
import DB_URL from "../../db.url";
import Footer from "../../components/footer/footer";

export default function Login(){
    
    const [checkbox, setCheck] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [loader, setLoader] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [notification, setNotification] = useState(window.localStorage.getItem("message")?.toString() || "")

    const submitHandler = async() => {
        setLoader(true)
        try {
            const data = {
                username, password
            }
            const response = await axios.post(DB_URL + "/api.v1/auth/login", data);
            setNotification(response.data.data);
            console.log(response.data)
            window.localStorage.setItem("token", response.data.token);
            setTimeout(() => {
                window.location.href = response.data.redirect
            }, [1500])
        } catch (error) {
            setLoader(false)
            console.log(error)
            setNotification(error.response.data.data)
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setNotification("");
            window.localStorage.removeItem("message")
        }, 3000)
    },[])


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
                    <p className="title">Let's quickly sign in to your QuickStock account</p>
                    <div className="wrapper">
                        <label className="lab">Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Unique Username" name=""  className="inp" />
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
                            ) : "Login"
                        }
                    </button>
                    <button className="btn ot" onClick={() => window.location.href = "/register"}>Account doesn't exists? Register</button>
                </div>
                <Footer />
            </div>
        </div>
    )
}