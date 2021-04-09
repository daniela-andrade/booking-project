package com.booking.server.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.booking.server.model.Booking;
import com.booking.server.repository.BookingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/** Provides methods to get, create, update and delete bookings.
 * @author Daniela Andrade
 * @version 1.0
 * @since 1.0
*/
@Service
public class BookingService implements IBookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository){
        this.bookingRepository = bookingRepository;
    }

    @Override
    public Optional<Booking> findById(String id) {
        return bookingRepository.findById(id);
    }

    @Override
    public List<Booking> findAll() {
        return (List<Booking>) bookingRepository.findAll();
    }

    @Override
    public void deleteById(String id) {
        bookingRepository.deleteById(id);
    }

    @Override
    public Booking addBooking(Booking booking) {
       return bookingRepository.save(booking);
        
    }

    public List<Booking> findByUser(String user) {
        List<Booking> all = findAll();
        return all.stream()
                .filter(booking -> user.equals(booking.getUser()))
                .collect(Collectors.toList());
    }

}
