import { useState } from "react";
import EnterParking from "./EnterParking/EnterParking";
import ExitParking from "./ExitParking";
import { ParkingGarage } from "./App";
import { useNavigate } from "react-router-dom";
import FloorParkingSpotTable from "./FloorParkingSpotTable";
import "./App.css";

type IProps = {
    setParkingGarageData: (v: ParkingGarage) => void;
    parkingGarageData?: ParkingGarage;
};

const LandingPage = (props: IProps) => {
    const { setParkingGarageData, parkingGarageData } = props;
    const [isPrintTicket, setIsPrintTicket] = useState(false);
    const [isPrintReceipt, setIsPrintReceipt] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className="adminButton">
                <button onClick={(_) => navigate("/admin")}>Admin</button>
            </div>
            <FloorParkingSpotTable parkingGarageData={parkingGarageData} />
            <EnterParking
                setParkingGarageData={setParkingGarageData}
                parkingGarageData={parkingGarageData}
                isPrintTicket={isPrintTicket}
                setIsPrintTicket={setIsPrintTicket}
                setIsPrintReceipt={setIsPrintReceipt}
            />
            <ExitParking
                setParkingGarageData={setParkingGarageData}
                parkingGarageData={parkingGarageData}
                isPrintReceipt={isPrintReceipt}
                setIsPrintReceipt={setIsPrintReceipt}
                setIsPrintTicket={setIsPrintTicket}
            />
        </>
    );
};

export default LandingPage;
