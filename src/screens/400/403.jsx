import Footer from "../../components/footer/footer";
import "./style.css";

export default function Forbidden(){
    return(
        <div className="center">
            <ion-icon name="warning-outline"></ion-icon>
            <p className="num">403</p>
            <p className="sub">Permission not granted!, Please kindly login again after some time</p>
            <a href="/login" className="lnk">Login</a>
            <Footer />
        </div>
    )
}