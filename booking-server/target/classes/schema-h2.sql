CREATE TABLE bookings (
  id VARCHAR(250) NOT NULL  PRIMARY KEY,
  user VARCHAR(250) NOT NULL,
  start_date Date NOT NULL,
  end_date Date NOT NULL,
  booking_state VARCHAR(30) NOT NULL
);