import React, { useState } from "react";
import { ParkingSpotType, ParkingSpot, Floor } from "../App";
import ParkingTicket from "../ParkingTicket";

type IProps = {
    setParkingGarageData: any;
    parkingGarageData: any;
};

const EnterParking = (props: IProps) => {
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [vehicleType, setVehicleType] = useState("compact");
    const [errorMessage, setErrorMessage] = useState("");
    const [isPrintTicket, setIsPrintTicket] = useState(false);
    const [parkingDetails, setParkingDetails] = useState<any>();

    const handleVehicleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehicleNumber(e.target.value);
    };

    const handleVehicleType = (e: any) => {
        setVehicleType(e.target.value);
    };

    const handleVehicleEntry = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let parkingSpotFound: Boolean = false;
        let parkingGarageData = props.parkingGarageData;
        let vehicleAlreadyParked: Boolean = false;

        //1. Check if vehicle id is already parked
        parkingGarageData.floors.map((floor: Floor) => {
            return floor.parkingSpots.map((parkingSpot: ParkingSpot) => {
                if (parkingSpot.vehicleNumber === vehicleNumber) {
                    vehicleAlreadyParked = true;
                }
                return vehicleAlreadyParked;
            });
        });

        if (vehicleAlreadyParked) {
            //Show error message
            setErrorMessage(
                "Vehicle is already parked. Check registration number"
            );
            setIsPrintTicket(false);
            console.log("Vehicle is already parked. Check registration number");
            return;
        }

        //Find the first free spot
        parkingGarageData.floors.forEach((floor: Floor) => {
            floor.parkingSpots.forEach((parkingSpot: ParkingSpot) => {
                if (
                    parkingSpot.type === vehicleType &&
                    parkingSpot.occupied === false &&
                    parkingSpotFound === false
                ) {
                    //Assign the parking spot
                    parkingSpotFound = true;
                    parkingSpot.vehicleNumber = vehicleNumber;
                    parkingSpot.startTime = new Date().getTime();
                    parkingSpot.occupied = true;

                    setParkingDetails({
                        parkingSpot: parkingSpot,
                        floorNumber: floor.floor_number,
                    });
                }
            });
        });

        if (parkingSpotFound) {
            props.setParkingGarageData(parkingGarageData);
            setIsPrintTicket(true);
        } else {
            setErrorMessage("No parking spots available");
            setIsPrintTicket(false);
            console.log("No parking spots available");
            //Show error message
        }
    };

    return (
        <>
            <form onSubmit={handleVehicleEntry} className="parkingForm">
                <label>
                    Vehicle Number:
                    <input
                        type="text"
                        name="vehicleNumber"
                        onChange={handleVehicleNumber}
                        value={vehicleNumber}
                    />
                </label>
                <label>
                    Vehicle Type:
                    <select onChange={handleVehicleType} value={vehicleType}>
                        {Object.keys(ParkingSpotType).map((spotType) => {
                            return <option value={spotType}>{spotType}</option>;
                        })}
                    </select>
                </label>
                <input type="submit" value="Enter" />
            </form>
            {isPrintTicket && <ParkingTicket parkingDetails={parkingDetails} />}
        </>
    );
};

export default EnterParking;
