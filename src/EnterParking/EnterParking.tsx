import React, { useState } from "react";
import { ParkingSpotType, ParkingSpot, Floor, ParkingGarage } from "../App";
import ParkingTicket from "../ParkingTicket";

type IProps = {
    setParkingGarageData: any;
    parkingGarageData?: ParkingGarage;
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
        setErrorMessage("");
        let parkingSpotFound: Boolean = false;
        let parkingGarageData = props.parkingGarageData;
        let vehicleAlreadyParked: Boolean = false;

        //1. Check if vehicle id is already parked
        parkingGarageData &&
            parkingGarageData.floors.map((floor: Floor) => {
                return floor.parkingSpots.map((parkingSpot: ParkingSpot) => {
                    if (
                        parkingSpot.vehicleNumber === vehicleNumber &&
                        vehicleNumber !== ""
                    ) {
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
            return;
        }

        //Find the first free spot
        parkingGarageData &&
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

        if (parkingSpotFound && parkingGarageData && vehicleNumber) {
            props.setParkingGarageData((prevState: ParkingGarage) => {
                return {
                    ...prevState,
                    parkingGarageData,
                };
            });
            setIsPrintTicket(true);
            setErrorMessage("");
        } else if (vehicleNumber === "") {
            setErrorMessage("Enter vehicle number");
        } else {
            //Show error message
            setErrorMessage("No parking spots available");
            setIsPrintTicket(false);
        }
    };

    return (
        <>
            <div className="parkingForm">
                <form onSubmit={handleVehicleEntry}>
                    <label>
                        <span>Vehicle Number:</span>
                        <input
                            type="text"
                            name="vehicleNumber"
                            onChange={handleVehicleNumber}
                            value={vehicleNumber}
                        />
                    </label>
                    <label>
                        <span>Vehicle Type:</span>
                        <select
                            onChange={handleVehicleType}
                            value={vehicleType}
                        >
                            {Object.keys(ParkingSpotType).map((spotType) => {
                                return (
                                    <option value={spotType} key={spotType}>
                                        {spotType}
                                    </option>
                                );
                            })}
                        </select>
                    </label>

                    <input type="submit" value="Enter" className="submit" />
                </form>
                {errorMessage && <p className="error">{errorMessage}</p>}
                {isPrintTicket && (
                    <ParkingTicket parkingDetails={parkingDetails} />
                )}
            </div>
        </>
    );
};

export default EnterParking;
