export default function Analytics(){
    return(
        <div className="row">
            <div className="card">
                <div className="icon">
                    <ion-icon name="flask"></ion-icon>
                </div>
                <div className="col">
                    <p className="label">Total Chemicals</p>
                    <p className="bld">238 Total Chemicals</p>
                </div>
            </div>
            <div className="card">
                <div className="icon">
                    <ion-icon name="flask"></ion-icon>
                </div>
                <div className="col">
                    <p className="label">Total Glass Equipment</p>
                    <p className="bld">120 Total Glassware</p>
                </div>
            </div>
            <div className="card">
                <div className="icon">
                    <ion-icon name="flask"></ion-icon>
                </div>
                <div className="col">
                    <p className="label">Expired Chemicals</p>
                    <p className="bld">20 Chemicals expired</p>
                </div>
            </div>
            <div className="card">
                <div className="icon">
                    <ion-icon name="flask"></ion-icon>
                </div>
                <div className="col">
                    <p className="label">Broken Equipment</p>
                    <p className="bld">30 glassware broken</p>
                </div>
            </div>
        </div>
    )
}