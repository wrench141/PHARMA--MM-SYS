import { useEffect, useState } from "react"
import "./style.css"

export default function Navbar(){
    const [selected, setSelected] = useState("dashboard");
    useEffect(() => {
        setSelected((new URL(window.location.href)).pathname.split("/")[1])
    }, [])
    return(
        <div className="nav">
            <p className="title">Material Management</p>
            <div className="wrap">
                <div className="tag">General</div>
                <div className={selected == "dashboard" ? "option sel" : "option"}>
                    <ion-icon name="grid"></ion-icon>
                    <p className="opt">Dashboard</p>
                </div>
                <div className={selected == "store" ? "option sel" : "option"} onClick={() => window.location.href = "/store"}>
                    <ion-icon name="storefront"></ion-icon>
                    <p className="opt">Store</p>
                </div>
                <div className={selected == "labs" ? "option sel" : "option"} onClick={() => window.location.href = "/labs"}>
                    <ion-icon name="sparkles"></ion-icon>
                    <p className="opt">Laboratories</p>
                </div>
            </div>
            <div className="wrap">
                <div className="tag">Stock</div>
                <div className={selected == "chemicals" ? "option sel" : "option"} onClick={() => window.location.href = "/chemicals"}>
                    <ion-icon name="flask"></ion-icon>
                    <p className="opt">Chemicals</p>
                </div>
                <div className={selected == "glassware" ? "option sel" : "option"}>
                    <ion-icon name="beaker"></ion-icon>
                    <p className="opt">Glassware</p>
                </div>
            </div>
            <div className="wrap">
                <div className="tag">User Actions</div>
                <div className={selected == "settings" ? "option sel" : "option"}>
                    <ion-icon name="cog"></ion-icon>
                    <p className="opt">Settings</p>
                </div>
                <div className={selected == "complaints" ? "option sel" : "option"}>
                    <ion-icon name="warning"></ion-icon>
                    <p className="opt">Complaints</p>
                </div>
                <div className="option">
                    <ion-icon name="log-out-outline"></ion-icon>
                    <p className="opt">Logout</p>
                </div>
            </div>
        </div>
    )
}