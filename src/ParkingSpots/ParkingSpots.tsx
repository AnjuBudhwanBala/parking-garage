import React, { useEffect, useState } from "react";
import { ParkingGarage, ParkingSpotType, ParkingSpot, Floor } from "../App";
import "./Style.css";

type IProps = {
    parkingGarageData: ParkingGarage;
};

function ParkingSpots(props: IProps) {
    const floorData = props.parkingGarageData.floors;
    const [totalParkingSpots, setTotalParkingSpots] = useState(0);
    const [totalAvailableParkingSpots, setTotalAvailableParkingSpots] =
        useState(0);
    const [floorAvailableSpots, setFloorAvailableSpots] = useState<any>([]);
    const [floorOccupiedSpots, setFloorOccupiedSpots] = useState<any>([]);

    useEffect(() => {
        let totalParkingSpotsOfGarage = 0;
        let totalAvailableParkingSpotsOfGarage = 0;
        floorData &&
            floorData.map((floor: Floor) => {
                let floorAvailableParkingSpots = 0;
                let floorOccupiedParkingSpots = 0;
                floor.parkingSpots &&
                    floor.parkingSpots.map((parkingSpot: ParkingSpot) => {
                        totalParkingSpotsOfGarage += 1;
                        if (parkingSpot.occupied === false) {
                            totalAvailableParkingSpotsOfGarage += 1;
                            floorAvailableParkingSpots += 1;
                        } else {
                            floorOccupiedParkingSpots += 1;
                        }
                    });
                setTotalParkingSpots(totalParkingSpotsOfGarage);
                setTotalAvailableParkingSpots(
                    totalAvailableParkingSpotsOfGarage
                );
                setFloorOccupiedSpots((prevState: any) => [
                    ...prevState,
                    {
                        floorNumber: floor.floor_number,
                        floorOccupiedParkingSpots: floorOccupiedParkingSpots,
                    },
                ]);
                setFloorAvailableSpots((prevState: any) => [
                    ...prevState,
                    {
                        floorNumber: floor.floor_number,
                        floorAvailableParkingSpots: floorAvailableParkingSpots,
                    },
                ]);
            });
    }, [floorData]);

    return (
        <>
            <div className="border">
                <p>
                    Available slots for the whole garage:
                    <span>{totalAvailableParkingSpots}</span>
                </p>
                <p>
                    {" "}
                    Occupied slots for the whole garage:
                    <span>
                        {totalParkingSpots - totalAvailableParkingSpots}
                    </span>
                </p>
            </div>
            <div className="border">
                <p>Available slots for each floor of the garage:</p>
                {floorAvailableSpots &&
                    floorAvailableSpots.map(
                        (floorAvailableSpot: any, index: number) => {
                            return (
                                <p key={index}>
                                    Free parking spots on floor{" "}
                                    {floorAvailableSpot.floorNumber}
                                    are{" "}
                                    {
                                        floorAvailableSpot.floorAvailableParkingSpots
                                    }
                                    ;
                                </p>
                            );
                        }
                    )}
            </div>
            <div className="border">
                <p> Occupied slots for each floor of the garage:</p>
                {floorOccupiedSpots &&
                    floorOccupiedSpots.map(
                        (floorOccupiedSpot: any, index: number) => {
                            return (
                                <p key={index}>
                                    Free parking spots on floor{" "}
                                    {floorOccupiedSpot.floorNumber}
                                    are{" "}
                                    {
                                        floorOccupiedSpot.floorOccupiedParkingSpots
                                    }
                                    ;
                                </p>
                            );
                        }
                    )}
            </div>
        </>
    );
}

export default ParkingSpots;
