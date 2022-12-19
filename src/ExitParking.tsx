import { useState } from "react";
import { ParkingSpot, Floor, ParkingGarage } from "./App";
import ParkingReceipt from "./ParkingReceipt";

type IProps = {
    setParkingGarageData: (v: ParkingGarage) => void;
    parkingGarageData?: ParkingGarage;
};

const ExitParking = (props: IProps) => {
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [isPrintReceipt, setIsPrintReceipt] = useState(false);
    const [parkingDetails, setParkingDetails] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const handleVehicleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehicleNumber(e.target.value);
    };

    const handleVehicleExit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const parkingGarageData = props.parkingGarageData;
        let vehicleFound: Boolean = false;

        //Find the vehicle parking spot
        parkingGarageData &&
            parkingGarageData.floors.forEach((floor: Floor) => {
                floor.parkingSpots.forEach((parkingSpot: ParkingSpot) => {
                    if (
                        parkingSpot.vehicleNumber === vehicleNumber &&
                        !vehicleFound
                    ) {
                        vehicleFound = true;

                        //Print receipt
                        setParkingDetails({
                            parkingSpot: parkingSpot,
                            vehicleNumber: parkingSpot.vehicleNumber,
                            startTime: parkingSpot.startTime,
                            floorNumber: floor.floor_number,
                        });

                        //Free up the parking spot
                        parkingSpot.vehicleNumber = "";
                        parkingSpot.startTime = 0;
                        parkingSpot.occupied = false;
                    }
                });
            });

        if (vehicleFound && parkingGarageData) {
            props.setParkingGarageData(parkingGarageData);
            setIsPrintReceipt(true);
        } else {
            setErrorMessage("No vehicle found. Can't generate a ticket");
            setIsPrintReceipt(false);
        }
    };

    return (
        <div className="parkingForm">
            <form onSubmit={handleVehicleExit}>
                <label>
                    <span>Vehicle Number:</span>
                    <input
                        type="text"
                        name="vehicleNumber"
                        onChange={handleVehicleNumber}
                        value={vehicleNumber}
                    />
                </label>

                <input type="submit" value="Exit" className="submit" />
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {isPrintReceipt && (
                <ParkingReceipt parkingDetails={parkingDetails} />
            )}
        </div>
    );
};

export default ExitParking;
