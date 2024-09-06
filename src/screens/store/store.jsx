import { useState } from "react";
import Analytics from "../../components/analytics/component";
import Navbar from "../../components/navbar/navbar";
import "./store.css";

export default function Store(){
    const [renderedComponent, setRenderComponent] = useState("analytics")
    return(
        <div className="container">
            <Navbar />
            <div className="st-cont">
                <p className="title">Central Store</p>
                <p className="sub">Easily manage and monitor all your materials from a single location!</p>
                <div className="subnav">
                    <p className={renderedComponent == "analytics" ? "btn sel" : "btn"} onClick={() => setRenderComponent("analytics")}>Analytics</p>
                    <p className={renderedComponent == "chemicals" ? "btn sel" : "btn"} onClick={() => setRenderComponent("chemicals")}>Chemicals</p>
                    <p className={renderedComponent == "glassware" ? "btn sel" : "btn"} onClick={() => setRenderComponent("glassware")}>Glassware</p>
                </div>
                {
                    renderedComponent == "analytics" ? (
                        <Analytics />
                    ) : null
                }
            </div>
        </div>
    )
}