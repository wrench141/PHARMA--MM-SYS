import "./style.css";

export default function Jobrecard(){
    return(
        <div className="backdrop">
            <div className="job-container">
                <p className="title">Record Job Card</p>
                <p className="sub">Manage your job cards easily.</p>
                <div className="lgrid">
                    <div className="wrap">
                        <p className="lab">Experiment Name</p>
                        <input type="text" placeholder="Enter Experiment name" name="" id="" className="inp" />
                    </div>
                    <div className="wrap">
                        <p className="lab">No of Present Students</p>
                        <input type="number" placeholder="No of Students Present" name="" id="" className="inp" />
                    </div>
                </div>
                <div className="items">
                    <div className="wrap">
                        <p className="lab">Select Chemicals</p>
                        <div className="grid-wrapper">
                            <input type="text" value={"1"}  disabled className="inp" />
                            <input type="text" value={"Sodium chloride"}  disabled className="inp" />
                            <input type="text" placeholder="Enter Quantity" className="inp" />
                            <button className="del">
                                <ion-icon name="close-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}