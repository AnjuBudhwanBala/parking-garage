import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import LandingPage from "./LandingPage";
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
    const [parkingGarageData, setParkingGarageData] = useState<ParkingGarage>();
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
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <LandingPage
                                setParkingGarageData={setParkingGarageData}
                                parkingGarageData={parkingGarageData}
                            />
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <Admin parkingGarageData={parkingGarageData} />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
