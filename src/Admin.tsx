import { useCallback, useEffect, useState } from "react";
import { ParkingGarage, Floor, ParkingSpot } from "./App";
import { useNavigate } from "react-router-dom";
import "./App.css";

type IProps = {
    parkingGarageData?: ParkingGarage;
};

const Admin = (props: IProps) => {
    const { parkingGarageData } = props;
    const [totalAvailable, setTotalAvailable] = useState(0);
    const [totalOccupied, setTotalOccupied] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let totalAvailableParkingSpots = 0;
        let totalOccupiedParkingSpots = 0;
        parkingGarageData &&
            parkingGarageData.floors &&
            parkingGarageData.floors.map((floor: Floor, index: number) => {
                floor.parkingSpots.map(
                    (parkingSpot: ParkingSpot, index: number) => {
                        if (parkingSpot.occupied) {
                            totalOccupiedParkingSpots += 1;
                        } else {
                            totalAvailableParkingSpots += 1;
                        }
                    }
                );
            });
        setTotalAvailable(totalAvailableParkingSpots);
        setTotalOccupied(totalOccupiedParkingSpots);
    }, [parkingGarageData]);

    const renderData = useCallback(() => {
        return (
            parkingGarageData &&
            parkingGarageData.floors &&
            parkingGarageData.floors.map((floor: Floor, index: number) => {
                let floorAvailableParkingSpots = 0;
                let floorOccupiedParkingSpots = 0;
                return (
                    <>
                        <div className="floorItems" key={index}>
                            <div className="floorNumber">
                                <strong>Floor: </strong>
                                {floor.floor_number}
                            </div>

                            <div className="floorSpots">
                                {floor.parkingSpots.map(
                                    (
                                        parkingSpot: ParkingSpot,
                                        index: number
                                    ) => {
                                        if (parkingSpot.occupied === false) {
                                            floorAvailableParkingSpots += 1;
                                        } else {
                                            floorOccupiedParkingSpots += 1;
                                        }

                                        return (
                                            <div
                                                key={index}
                                                className={
                                                    parkingSpot.occupied
                                                        ? "red"
                                                        : "green"
                                                }
                                            >
                                                {parkingSpot.id}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                            <p>
                                Available Slots on floor:
                                <span className="slotsNumber">
                                    <strong>
                                        {floorAvailableParkingSpots}
                                    </strong>
                                </span>
                            </p>
                            <p>
                                Occupied Slots on floor:
                                <span className="slotsNumber">
                                    <strong>
                                        {floorOccupiedParkingSpots}{" "}
                                    </strong>
                                </span>
                            </p>
                        </div>
                    </>
                );
            })
        );
    }, [parkingGarageData]);

    return (
        <>
            <div className="adminButton">
                <button onClick={(_) => navigate("/")}>Back</button>
            </div>
            <div>
                <div>
                    <p>
                        Total Available Slots:
                        <span className="slotsNumber">
                            <strong>{totalAvailable}</strong>
                        </span>
                    </p>
                    <p>
                        Total Occupied Slots:
                        <span className="slotsNumber">
                            <strong>{totalOccupied}</strong>
                        </span>
                    </p>
                </div>
                <div className="floor">{renderData()}</div>
            </div>
        </>
    );
};

export default Admin;
