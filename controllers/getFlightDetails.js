import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.API_KEY || "test";

export const getFlightDetails = async (flightNumber) => {
    const flightURL = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_number=${flightNumber}`;

    const flights = await axios.get(flightURL, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    // Just returning the first flight response for now
    return flights.data.data[0];
};
