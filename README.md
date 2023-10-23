# Flight Tracker API

The Flight Tracker API allows you to track flight details using a flight number. This version is currently used to call api endpoints from HTTP?API clients. This README provides information on how to use the API, including the required request format and endpoint, as well as details about the expected response format and status codes.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing Dependencies](#installing-dependencies)
  - [Setting Up Environment Variables](#setting-up-environment-variables)
- [Using the API](#using-the-api)
  - [Endpoint](#endpoint)
  - [Request Format](#request-format)
  - [Response Format](#response-format)
  - [Status Codes](#status-codes)
- [Running the API](#running-the-api)

## Getting Started

### Prerequisites

Before using the Flight Tracker API, you need to ensure that you have the following prerequisites:

- Node.js: Make sure you have latest version of Node.js installed on your system. You can download it from [https://nodejs.org/](https://nodejs.org/). You can verify the installation with the below command in your terminal:
```
node --version
```

### Installing Dependencies

After cloning the repository, navigate to the project directory in your terminal and follow below command to install required dependencies for the project:

```
cd <project_directory>
npm install
```

If you wish to manually install all the dependencies, you can try these:
```
npm install express
npm install dotenv
npm install axios
npm install luxon
npm install nodemon --save-dev
```

### Setting Up Environment Variables

The API uses an environment variable to store the AviationStack API key. To get your AviationStack API Key, you need to sign in into the AviationStack API website and you will get the access key or API key. Here's the link to avaition stack api: [AviationStack Documentation](https://aviationstack.com/documentation).


After you get the key, to set up the environment variable, follow these steps:

1. Create a `.env` file in the root directory of your project if it doesn't already exist.

2. Add your AviationStack API key to the `.env` file. Replace `YOUR_API_KEY_HERE` with your actual API key.

   ```plaintext
   API_KEY="YOUR_API_KEY_HERE"
   ```

2. Besides this, we are using https version for this particular express app, so we need to create private and public keys. So just open your terminal, go to the project's root folder and run these commands: 

   ```
    #Generate a private key
    openssl genrsa -out key.pem

    #Generate a Certificate Signing Request (CSR)
    openssl req -new -key key.pem -out csr.pem

    #Create a self-signed certificate
    openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
   ```

## Using the API

### Endpoint

The Flight Tracker API provides the following endpoint:

- `GET /flightTracker/v1/`: This endpoint is just a get request to test the api's response. Basically, it just says "Let's find your FLIGHT!".
- `POST /flightTracker/v1/track`: This endpoint is a post request which is used to track flight details where flight number is the parameter. 

### Request Format

To track flight details, make a POST request to the `/flightTracker/v1/track` endpoint with the following request format:

- Endpoint: `POST /flightTracker/v1/track`
- Headers:
  - `Content-Type: application/json`
- Request Body:
  - `flightNumber` (string, required): The flight number you want to track.

Example request:

```json
POST /flightTracker/v1/track

{
  "flightNumber": "5691"
}
```

### Response Format

The API responds with flight details in JSON format. The response includes the following fields:

- `flightNumber` (string): The flight number.
- `flightStatus` (string): The status of the flight. Available values: scheduled, active, landed, cancelled, incident, diverted
- `airlinesName` (string): The name of the airline.
- `departure` (object):
  - `airport` (string): The departure airport.
  - `dateTime` (string): The scheduled departure date and time.
- `arrival` (object):
  - `airport` (string): The arrival airport.
  - `dateTime` (string): The scheduled arrival date and time.

Example response:

```json
{
    "flightNumber": "5691",
    "flightStatus": "active",
    "airlineName": "flynas",
    "departure": {
        "airport": "King Khaled International Airport",
        "dateTime": "Oct 22, 2023, 10:10 PM"
    },
    "arrival": {
        "airport": "Sabiha Gokcen Airport",
        "dateTime": "Oct 23, 2023, 2:20 AM"
    }
}
```


### Status Codes

```markdown
### Status Codes

The API may return the following status codes:

- `200 OK`: The flight details were successfully retrieved.
- `400 Bad Request`: If the request format is invalid or the `flightNumber` is missing in the request body.
- `404 Not Found`: If no flight details were found for the provided flight number.
- `500 Internal Server Error`: If an error occurred while processing the request.
```


## Running the API

At this point, you can go to the terminal and do following command to run your api:
```
npm start
```

Open HTTP/API Client programs, I used postman so,
In Postman, create a new request by selecting 'POST' method from the dropdown list. Then specify the URL as https://localhost:8080.


Go to https://localhost:8080/flightTrackerAPI/v1/flights

In the body, set the value for flightNumber and hit the request.