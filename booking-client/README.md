# Booking Client

A web client used to manage the creation, update and cancelation of bookings for a unique resource.
The project as built with React, Redux, JavaScript, and CSS.


## Installation and Setup Instructions

To be able to build and run this project from your machine, you will need `node` and `npm` installed globally.

To install  dependencies:
`npm install`

To start the server:
`npm start`

To visit the app:
`localhost:3000/`


## Actions

#### Insert User
When visiting the app, you'll be prompted to add a username.
When using a username which was previously used, the bookings for that username will be retrived.

#### Create Booking
Add a start date no earlier than the current day.
End dates are optional.
If there is an overlap with an existing booking you'll be prompted to choose new dates.

#### Edit Booking
Edit a booking to change the start and end dates.
While editing, it is possible to cancel the editing and keep the previous dates.

#### Update Booking
After editing a booking, click update to try to persist the new dates.
If there is an overlap with an existing booking you'll be prompted to choose new dates.

#### Cancel Booking
It is possible to cancel bookings.
Cancelled bookings can't be recovered.
 