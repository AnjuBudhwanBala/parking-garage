import { useState } from "react";
import { ParkingSpot, Floor } from "./App";

const initialRatesPerHour = [50, 30, 30];
const fixedHourlyRateBeyondInitialRate = 10;

const calculatePrice = (parkingTime: number) => {
    let totalCost = 0;
    let ratesPerHour = [...initialRatesPerHour];
    let chargableParkingTime = Math.ceil(parkingTime);
    while (chargableParkingTime > 0) {
        chargableParkingTime -= 1;
        let hourCost: any = fixedHourlyRateBeyondInitialRate;
        if (ratesPerHour && ratesPerHour.length > 0) {
            hourCost = ratesPerHour.shift();
        }
        totalCost += hourCost;
    }

    return totalCost;
};

const ExitParking = (props: any) => {
    const [vehicleNumber, setVehicleNumber] = useState("");

    const handleVehicleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehicleNumber(e.target.value);
    };

    const handleVehicleExit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let parkingGarageData = props.parkingGarageData;
        let vehicleFound: Boolean = false;
        let totalParkingTimeInHours: any = null;

        //Find the vehicle parking spot
        parkingGarageData.floors.forEach((floor: Floor) => {
            floor.parkingSpots.forEach((parkingSpot: any) => {
                if (
                    parkingSpot.vehicleNumber === vehicleNumber &&
                    !vehicleFound
                ) {
                    //Free up the parking spot
                    vehicleFound = true;
                    totalParkingTimeInHours =
                        (new Date().getTime() - parkingSpot.startTime) /
                        (1000 * 60 * 60);
                    parkingSpot.vehicleNumber = null;
                    parkingSpot.startTime = null;
                    parkingSpot.occupied = false;
                }
            });
        });

        if (vehicleFound) {
            props.setParkingGarageData(parkingGarageData);
            console.log(
                `Total time elapsed (in hours) is ${totalParkingTimeInHours}`
            );

            console.log(
                `Total cost generated is NOK ${calculatePrice(
                    totalParkingTimeInHours
                )}`
            );
            //Print ticket
        } else {
            console.log("No vehicle found. Can't generate a ticket");
            //Show error message
        }
    };

    return (
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
    );
};

export default ExitParking;
