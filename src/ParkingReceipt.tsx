import React from "react";
import { ParkingSpot, ParkingSpotType } from "./App";

type IProps = {
    parkingDetails: {
        parkingSpot: ParkingSpot;
        floorNumber: number;
    };
};

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

const formatTime = (timeStamp: number) => {
    return new Intl.DateTimeFormat("nb-NO", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    }).format(timeStamp);
};

const convertTo2Digits = (num: number) => {
    return num.toLocaleString("nb-NO", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
};

const convertHoursToTime = (hours: number) => {
    let calculatedHours = Math.floor(hours);
    let minutes = (hours - calculatedHours) * 60;
    let calculatedMinutes = Math.floor(minutes);
    let seconds = (minutes - calculatedMinutes) * 60;
    let calculatedSeconds = Math.round(seconds);
    let formattedTime = `${convertTo2Digits(
        calculatedHours
    )}:${convertTo2Digits(calculatedMinutes)}:${convertTo2Digits(
        calculatedSeconds
    )}`;
    return formattedTime;
};

const ParkingReceipt = (props: any) => {
    const { parkingDetails } = props;

    const startTime = parkingDetails.startTime;
    const endTime = new Date().getTime();
    const parkingTimeInHours = (endTime - startTime) / (1000 * 60 * 60);
    const totalCost = calculatePrice(parkingTimeInHours);
    return (
        <div className="parkingTicket">
            <p>
                <strong>Your parking receipt is here</strong>
            </p>
            <p>
                Parking spot id:{" "}
                <strong>{parkingDetails.parkingSpot.id}</strong>
            </p>
            <p>
                Floor number: <strong> {parkingDetails.floorNumber}</strong>
            </p>
            <p>
                Vehicle Number: <strong>{parkingDetails.vehicleNumber}</strong>
            </p>
            <p>
                Start time: <strong>{formatTime(startTime)}</strong>
            </p>
            <p>
                End time: <strong> {formatTime(endTime)}</strong>
            </p>
            <p>
                Parking time:{" "}
                <strong>{convertHoursToTime(parkingTimeInHours)}</strong>
            </p>
            <p>
                Total cost: <strong> NOK {totalCost}</strong>
            </p>
        </div>
    );
};

export default ParkingReceipt;
