import { useState } from "react";
import { ParkingSpot, Floor } from "./App";
import ParkingReceipt from "./ParkingReceipt";

const ExitParking = (props: any) => {
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [isPrintReceipt, setIsPrintReceipt] = useState(false);
    const [parkingDetails, setParkingDetails] = useState<any>();

    const handleVehicleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehicleNumber(e.target.value);
    };

    const handleVehicleExit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let parkingGarageData = props.parkingGarageData;
        let vehicleFound: Boolean = false;

        //Find the vehicle parking spot
        parkingGarageData.floors.forEach((floor: Floor) => {
            floor.parkingSpots.forEach((parkingSpot: any) => {
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
                    parkingSpot.vehicleNumber = null;
                    parkingSpot.startTime = null;
                    parkingSpot.occupied = false;
                }
            });
        });

        if (vehicleFound) {
            props.setParkingGarageData(parkingGarageData);
            setIsPrintReceipt(true);
        } else {
            console.log("No vehicle found. Can't generate a ticket");
            setIsPrintReceipt(false);
        }
    };

    return (
        <>
            <form onSubmit={handleVehicleExit}>
                <label>
                    Vehicle Number:
                    <input
                        type="text"
                        name="vehicleNumber"
                        onChange={handleVehicleNumber}
                        value={vehicleNumber}
                    />
                </label>
                <input type="submit" value="Exit" />
            </form>
            {isPrintReceipt && (
                <ParkingReceipt parkingDetails={parkingDetails} />
            )}
        </>
    );
};

export default ExitParking;
