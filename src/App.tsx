import React, { useEffect, useState } from "react";
import ParkingSpots from "./ParkingSpots/ParkingSpots";
import "./App.css";

function App() {
    const [data, setData] = useState<any>([]);
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
            .then(function (myJson) {
                setData(myJson);
            });
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="App">
            <ParkingSpots data={data.floors} />{" "}
        </div>
    );
}

export default App;
