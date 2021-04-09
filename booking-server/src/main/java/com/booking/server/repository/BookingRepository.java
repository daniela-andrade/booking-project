package com.booking.server.repository;

import com.booking.server.model.Booking;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends CrudRepository<Booking, String> {

}
