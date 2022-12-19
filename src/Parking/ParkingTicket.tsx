import { ParkingSpot } from "../App";

type IProps = {
    parkingDetails: {
        parkingSpot: ParkingSpot;
        floorNumber: number;
    };
};

const ParkingTicket = (props: IProps) => {
    const { parkingDetails } = props;

    return (
        <div className="parkingTicket">
            <p>
                <strong>Your parking ticket is here</strong>
            </p>
            <p>
                Parking spot id:
                <strong>{parkingDetails.parkingSpot.id}</strong>
            </p>
            <p>
                Floor number: <strong>{parkingDetails.floorNumber}</strong>
            </p>
            <p>
                Vehicle Number:
                <strong>{parkingDetails.parkingSpot.vehicleNumber}</strong>
            </p>
            <p>
                Start time:
                <strong>
                    {new Intl.DateTimeFormat("nb-NO", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                    }).format(parkingDetails.parkingSpot.startTime)}
                </strong>
            </p>
        </div>
    );
};

export default ParkingTicket;
