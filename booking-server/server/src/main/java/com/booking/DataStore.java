import java.util.*;

/**
 * DataStore class that provides access to the booking data.
 */
public class DataStore {

	private ConcurrentMap<String, ConcurrentMap<String, Booking>> bookings = new ConcurrentHashMap<>();
	
	private static DataStore instance = new DataStore();
	public static DataStore getInstance(){
		return instance;
	}
	private DataStore(){
		//dummy data
	}

	public Booking getBooking(String user, String id) {
		return bookings.get(user).get(id);
	}

    public List<Booking> getBookings(String user) {
        return bookings.get(user);
    }

	public void putBooking(String user, Booking booking) {
		bookings.get(user).put(booking);
	}
}

