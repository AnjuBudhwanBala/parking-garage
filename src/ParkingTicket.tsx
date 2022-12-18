import React from "react";
import { ParkingSpot, ParkingSpotType } from "./App";

type IProps = {
    parkingDetails: {
        parkingSpot: ParkingSpot;
        floorNumber: number;
    };
};

const ParkingTicket = (props: any) => {
    const { parkingDetails } = props;

    return (
        <div>
            <p>Parking spot id: {parkingDetails.parkingSpot.id}</p>
            <p>Floor number: {parkingDetails.floorNumber}</p>
            <p>Vehicle Number: {parkingDetails.parkingSpot.vehicleNumber}</p>
            <p>
                Start time:{" "}
                {new Intl.DateTimeFormat("nb-NO", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                }).format(parkingDetails.parkingSpot.startTime)}
            </p>
        </div>
    );
};

export default ParkingTicket;
