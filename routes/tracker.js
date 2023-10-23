import express from "express";
import { getFlightDetails } from "../controllers/getFlightDetails.js";
import { DateTime } from "luxon";

export const tracker = express.Router();

tracker.get("/", (req, res) => {
    res.send("Lets find your FLIGHT!!");

    // HTML form to send from the user
    // res.send(`
    //     <html>
    //         <body>
    //             <h1>Let's find your FLIGHT!</h1>
    //             <form method="post" action="/flightTracker/v1/track">
    //                 <label for="flightNumber">Flight Number:</label>
    //                 <input type="text" id="flightNumber" name="flightNumber" required>
    //                 <button type="submit">Track Flight</button>
    //             </form>
    //         </body>
    //     </html>
    // `);
});

// POST Request for tracking details
tracker.post("/track", async (req, res) => {
    // Access the flight number from req.body
    const flightNumber = req.body.flightNumber;

    if (!flightNumber) {
        return res.status(400).json({
            error: "Flight number is required.!!",
        });
    }

    try {
        // You can now use 'flightNumber' to track flight details
        const flightDetails = await getFlightDetails(flightNumber);

        if (!flightDetails) {
            // Handle the case where the Upstream API response indicates an error
            console.error("No Flight Details for the given flight number!!");
            return res.status(404).json({
                error: "No Flight Details for the given flight number!!",
            });
        }

        // Send the response parsing relevant data after Upstream API was successful
        const trackingInformation = {
            flightNumber,
            flightStatus: flightDetails.flight_status,
            airlinesName: flightDetails.airline.name,
            departure: {
                airport: flightDetails.departure.airport + " Airport",
                dateTime: DateTime.fromISO(
                    flightDetails.departure.scheduled
                ).toFormat("ff"),
            },
            arrival: {
                airport: flightDetails.arrival.airport + " Airport",
                dateTime: DateTime.fromISO(
                    flightDetails.arrival.scheduled
                ).toFormat("ff"),
            },
        };

        // Send the tracking information as JSON
        res.json(trackingInformation);

        // Handle the flight details and send a response
        // res.send(`
        //     <html>
        //         <body>
        //             <h3>Flight Details</h3>
        //             <p><strong>Flight Number:</strong> ${flightNumber}</span></p>
        //             <p><strong>Flight Date:</strong> ${
        //                 flightDetails.flight_date
        //             }</span></p>
        //             <p><strong>Airline Name:</strong> ${
        //                 flightDetails.airline.name
        //             }</span></p>
        //             <p><strong>Departure Airport:</strong> ${
        //                 flightDetails.departure.airport
        //             } Airport</span></p>
        //             <p><strong>Departure Time:</strong> ${DateTime.fromISO(
        //                 flightDetails.departure.scheduled
        //             ).toFormat("ff")}</span></p>
        //             <p><strong>Arrival Airport:</strong> ${
        //                 flightDetails.arrival.airport
        //             } Airport</span></p>
        //             <p><strong>Arrival Time:</strong> ${DateTime.fromISO(
        //                 flightDetails.arrival.scheduled
        //             ).toFormat("ff")}</span></p>
        //         </body>
        //     </html>
        // `);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error tracking flight:", error);
        res.status(500).send("An error occurred while tracking the flight!!!");
    }
});
