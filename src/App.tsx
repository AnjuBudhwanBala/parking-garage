import React, { useEffect } from "react";
import "./App.css";

function App() {
    const getData = () => {
        fetch("parking-garage.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
            });
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="App">
            <div>Hi</div>
        </div>
    );
}

export default App;
