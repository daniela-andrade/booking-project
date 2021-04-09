package com.booking.server.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/** Represents a Booking.
 * @author Daniela Andrade
 * @version 1.0
 * @since 1.0
*/
@Entity
@Table(name="bookings")
public class Booking {
	@Id
	private String id;
	private String user;
	/** Represents the booking's startDate.*/
	@Column(name = "start_date", columnDefinition = "DATE")
	private LocalDate startDate;
	/** Represents the booking's endDate.*/
	@Column(name = "end_date", columnDefinition = "DATE")
	private LocalDate endDate;
	/** Represents the booking's state (ACTIVE, EDITING, CANCEL_EDITING, ERROR_UPDATING).*/
	@Column(name = "booking_state", columnDefinition = "VARCHAR")
	private String bookingState; 
	
	public Booking() {}

	public Booking(String id, String user, LocalDate startDate, LocalDate endDate, String state) {
		this.id = id;
		this.user = user;
		this.startDate = startDate;
		this.endDate = endDate;
		this.bookingState = "ACTIVE";
	}

	public String getId() {
		return id;
	}

	public String getUser() {
		return user;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setUser(String user){
		this.user = user;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public String getBookingState() {
		return bookingState;
	}

	public void setBookingState(String state) {
		this.bookingState = state;
	}
}
