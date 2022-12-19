import { Floor, ParkingSpot, ParkingGarage } from "./App";
import "./App.css";

type Props = {
    parkingGarageData?: ParkingGarage;
};
const FloorParkingSpotTable = (props: Props) => {
    const renderData = () => {
        return (
            props.parkingGarageData &&
            props.parkingGarageData.floors.map(
                (floor: Floor, index: number) => {
                    let floorAvailableParkingSpots = 0;

                    floor.parkingSpots.map((parkingSpot: ParkingSpot) => {
                        if (parkingSpot.occupied === false) {
                            floorAvailableParkingSpots += 1;
                        }
                        return floorAvailableParkingSpots;
                    });

                    return (
                        <li key={index}>
                            <span>Floor {floor.floor_number}</span>
                            <span>{floorAvailableParkingSpots}</span>
                        </li>
                    );
                }
            )
        );
    };

    return (
        <div className="floorTable">
            <p>Available Parkings Spots</p>

            <ul>{renderData()}</ul>
        </div>
    );
};

export default FloorParkingSpotTable;
