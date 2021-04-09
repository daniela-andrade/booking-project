# Booking Server

This booking server REST API provides a set of HTTP endpoints for the management of bookings for a unique resource.

## Installation and Setup Instructions

To be able to build and run this project from your machine, you will need `Java 11 or above`.

To start the server:
`npm start`

To query the h2 volatile database:
`localhost:8080/h2-console`

To see the api endpoints specification:
`localhost:8080/swagger-ui.html`

## Endpoints
GET     /booking/{id}
GET     /booking/user/{id}
GET     /booking/dates
POST    /booking
PUT     /booking
DELETE  /booking/{id}

### Endpoints Description

##### URL
/booking/{id}

##### Method:
GET

##### URL Params
Required:
id=[string]

##### Success Response:
Code: 200 Ok
Content: { 
    id : testId, 
    user: userName, 
    startDate: '2021-08-12', 
    endDate: '2021-08-13', 
    state: 'ACTIVE' 
}

##### Error Response:
Code: 404 Not Found
Content: {
    "timestamp": "2021-04-09T18:35:02.883+00:00",
    "status": 404,
    "error": "Not Found",
    "message": "",
    "path": "/booking/56"
}

----

##### URL
/booking/user/{user}

##### Method:
GET

##### URL Params
Required:
user=[string]

##### Success Response:
Code: 200 Ok
Content: [
    {
        "id": "1",
        "user": "Dangote",
        "startDate": "2021-04-05",
        "endDate": "2021-04-07",
        "bookingState": "ACTIVE"
    },
    {
        "id": "2",
        "user": "Dangote",
        "startDate": "2021-04-19",
        "endDate": "2021-04-21",
        "bookingState": "ACTIVE"
    }
]

When there are no bookings for such user:
Code: 200 OK
Content: []

#### Error Response:
When the user doesn't exist
Code: 404 Not found
Content: {
    "timestamp": "2021-04-09T18:37:53.594+00:00",
    "status": 404,
    "error": "Not Found",
    "message": "",
    "path": "/booking/user/lola"
}

----

#### URL
/booking/dates

#### Method:
GET

#### Success Response:
Code: 200 Ok
Content: [
    "2021-05-02",
    "2021-05-01"
]

OR, when there are no booked dates:

Code: 200 Ok
Content: []

----

#### URL
/booking/

#### Method:
POST

#### URL Params
Required:
id=[string]
user=[string]
startDate=[string] format: YYYY-MM-DD

Optional:
endDate=[string] format: YYYY-MM-DD

##### Success Response:
Code: 200 Ok
Content: {
    "id": "userId",
    "user": "Ana",
    "startDate": "2021-05-01",
    "endDate": "2021-05-02",
    "bookingState": "ACTIVE"
}

##### Error Response:
Code: 400 Bad Request
Content ={
    "timestamp": "2021-04-09T18:27:58.601+00:00",
    "status": 400,
    "error": "Bad Request",
    "message": "",
    "path": "/booking/"
}

----

#### URL
/booking/

#### Method:
PUT

#### URL Params
Required:
id=[string]
user=[string]
startDate=[string] format: YYYY-MM-DD

Optional:
endDate=[string] format: YYYY-MM-DD

##### Success Response:
Code: 200 Ok
Content: {
    "id": "userId",
    "user": "Ana",
    "startDate": "2021-05-01",
    "endDate": "2021-05-02",
    "bookingState": "ACTIVE"
}

##### Error Response:
Code: 400 Bad Request
Content: {
    "timestamp": "2021-04-09T18:53:01.481+00:00",
    "status": 400,
    "error": "Bad Request",
    "message": "",
    "path": "/booking/"
}

----

#### URL
/booking/{id}

#### Method:
DELETE

#### URL Params
Required:
id=[string]

##### Success Response:
Code: 200 Ok
Content: {
    "id": "userId",
    "user": "Ana",
    "startDate": "2021-05-01",
    "endDate": "2021-05-02",
    "bookingState": "ACTIVE"
}

##### Error Response:
Code: 404 Not Found
Content: {
    "timestamp": "2021-04-09T19:01:01.715+00:00",
    "status": 404,
    "error": "Not Found",
    "message": "",
    "path": "/booking/1"
}