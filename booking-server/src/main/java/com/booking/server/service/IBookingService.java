package com.booking.server.service;

import java.util.List;
import java.util.Optional;

import com.booking.server.model.Booking;

public interface IBookingService {

    Optional<Booking> findById(String id);
    List<Booking> findByUser(String user);
    List<Booking> findAll();

    Booking addBooking(Booking booking);
    void deleteById(String id);
}
