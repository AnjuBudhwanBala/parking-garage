import EnterParking from "./EnterParking/EnterParking";
import ExitParking from "./ExitParking";
import { ParkingGarage } from "./App";
import { useNavigate } from "react-router-dom";
import "./App.css";

type IProps = {
    setParkingGarageData: (v: ParkingGarage) => void;
    parkingGarageData?: ParkingGarage;
};

const LandingPage = (props: IProps) => {
    const { setParkingGarageData, parkingGarageData } = props;
    const navigate = useNavigate();
    return (
        <>
            <div className="adminButton">
                <button onClick={(_) => navigate("/admin")}>Admin</button>
            </div>

            <EnterParking
                setParkingGarageData={setParkingGarageData}
                parkingGarageData={parkingGarageData}
            />
            <ExitParking
                setParkingGarageData={setParkingGarageData}
                parkingGarageData={parkingGarageData}
            />
        </>
    );
};

export default LandingPage;
