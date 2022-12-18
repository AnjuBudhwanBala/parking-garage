import { useEffect, useState } from "react";
import ParkingSpots from "./ParkingSpots/ParkingSpots";
import EnterParking from "./EnterParking/EnterParking";
import ExitParking from "./ExitParking";
import "./App.css";

export enum ParkingSpotType {
    compact = "compact",
    large = "large",
    handicapped = "handicapped",
    motorcycle = "motorcycle",
}

export interface ParkingSpot {
    id: String;
    type: ParkingSpotType;
    occupied: Boolean;
    vehicleNumber?: String;
    startTime?: number;
}

export interface Floor {
    floor_number: number;
    parkingSpots: [ParkingSpot];
}

export interface ParkingGarage {
    floors: [Floor];
}

function App() {
    const [parkingGarageData, setParkingGarageData] = useState<any>([]);
    const getData = () => {
        fetch("parking-garage.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (parkingJson) {
                setParkingGarageData(parkingJson);
            });
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="App">
            <ParkingSpots floorData={parkingGarageData.floors} />
            <EnterParking
                setParkingGarageData={setParkingGarageData}
                parkingGarageData={parkingGarageData}
            />
            <ExitParking
                setParkingGarageData={setParkingGarageData}
                parkingGarageData={parkingGarageData}
            />
        </div>
    );
}

export default App;
