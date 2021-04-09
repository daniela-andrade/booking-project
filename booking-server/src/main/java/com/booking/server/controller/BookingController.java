package com.booking.server.controller;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Optional;

import com.booking.server.model.Booking;
import com.booking.server.service.BookingService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import static com.booking.server.LogMessages.*;

/** * 
 * @author Daniela Andrade
 * @version 1.0
 * @since 1.0
 */
@RestController
@RequestMapping("/")
@CrossOrigin
public class BookingController {

    private static final Logger log = LoggerFactory.getLogger(BookingController.class);

    @Autowired
    private BookingService bookingService;
    private final String ACTIVE = "ACTIVE";

    private Set<LocalDate> bookedDates = ConcurrentHashMap.newKeySet();

    @GetMapping("booking/{id}")
    public synchronized Booking getBookingById(@PathVariable String id) {
        Optional<Booking> booking = bookingService.findById(id);
        if (booking.isPresent()) {
            log.info(BOOKING_GET_SUCCESS);
            return booking.get();
        } else {
            log.warn(BOOKING_GET_FAILURE);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, BOOKING_GET_FAILURE);
    }

    @GetMapping("booking/user/{user}")
    public synchronized List<Booking> getBookingByUser(@PathVariable String user) {
        return bookingService.findByUser(user);
    }

    @GetMapping("booking/dates")
    public synchronized List<LocalDate> getBookedDates() {
        return bookedDates.stream().collect(Collectors.toList());
    }

    @PostMapping("booking/")
    public synchronized Booking addBooking(@RequestParam(name = "id") String id,
            @RequestParam(name = "user") String user, @RequestParam(name = "startDate") String startDate,
            @RequestParam(name = "endDate", required = false) String endDate) {
        Booking booking = createBooking(id, user, startDate, endDate);
        if (booking != null) {
            log.info(BOOKING_POST_SUCCESS, booking);
            return bookingService.addBooking(booking);
        }
        log.warn(BOOKING_POST_FAILURE, booking);
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, BOOKING_POST_FAILURE);
    }

    @DeleteMapping("booking/{id}")
    public synchronized Booking deleteBookingById(@PathVariable String id) {
        Optional<Booking> optionalBooking = bookingService.findById(id);
        if (optionalBooking.isPresent()) {
            Booking booking = optionalBooking.get();
            if (booking.getEndDate() != null) {
                bookedDates.removeAll(getLocalDatesBewteen(booking.getStartDate(), booking.getEndDate()));
            } else {
                bookedDates.remove(booking.getStartDate());
            }
            bookingService.deleteById(id);
            log.info(BOOKING_DELETE_SUCCESS);
            return booking;
        }
        log.warn(BOOKING_DELETE_FAILURE, id);
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, BOOKING_GET_FAILURE);
    }

    @PutMapping("booking/")
    public synchronized Booking updateBooking(@RequestParam(name = "id") String id,
            @RequestParam(name = "user") String user, @RequestParam(name = "startDate") String startDate,
            @RequestParam(name = "endDate", required = false) String endDate) {

        Optional<Booking> optionalBooking = bookingService.findById(id);
        if (optionalBooking.isPresent()) {
            Booking booking = optionalBooking.get();
            removeBookedDates(booking);
            Booking newBooking = createBooking(id, user, startDate, endDate);
            if (newBooking != null) {
                log.info(BOOKING_PUT_SUCCESS, booking);
                return bookingService.addBooking(newBooking);
            } else {
                addBookedDates(booking);
                log.warn(BOOKING_PUT_FAILURE, booking);
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, BOOKING_PUT_FAILURE);
    }

    private LocalDate parseDate(String date) {
        LocalDate localDate = null;
        try {
            localDate = LocalDate.parse(date);
        } catch (DateTimeParseException exception) {
            log.warn(PARSING_DATE_FAILURE, date);
        }
        return localDate;
    }

    private Booking createBooking(String id, String user, String startDate, String endDate) {

        LocalDate start = parseDate(startDate);
        LocalDate end = null;

        if (start != null) {
            end = parseDate(endDate);
            if (end == null) {
                end = start;
            }
            if (isValidBooking(start, end)) {
                bookedDates.addAll(getLocalDatesBewteen(start, end));
                return new Booking(id, user, start, end, ACTIVE);
            }
        }
        return null;
    }

    private boolean isValidBooking(LocalDate start, LocalDate end) {
        return (start.isBefore(end) || start.isEqual(end))
                && start.datesUntil(end.plusDays(1)).noneMatch(bookedDates::contains);
    }

    private List<LocalDate> getLocalDatesBewteen(LocalDate start, LocalDate end) {
        return start.datesUntil(end.plusDays(1)).collect(Collectors.toList());
    }

    private void removeBookedDates(Booking booking) {
        if (booking.getEndDate() != null) {
            bookedDates.removeAll(getLocalDatesBewteen(booking.getStartDate(), booking.getEndDate()));
        } else {
            bookedDates.remove(booking.getStartDate());
        }
    }

    private void addBookedDates(Booking booking) {
        if (booking.getEndDate() != null) {
            bookedDates.addAll(getLocalDatesBewteen(booking.getStartDate(), booking.getEndDate()));
        } else {
            bookedDates.add(booking.getStartDate());
        }
    }
}
