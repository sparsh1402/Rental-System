package src.main.java.com.carrental.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.main.java.com.carrental.models.*;
import src.main.java.com.carrental.respositories.ReservationRepository;
import src.main.java.com.carrental.respositories.VehicleRepository;

@Service
public class PaymentService {

    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private VehicleRepository vehicleRepository;

    public String processPayment(Long reservationId, String status) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if ("SUCCESS".equalsIgnoreCase(status)) {
            reservation.setPaymentStatus(PaymentStatus.PAID);
            reservation.setStatus(ReservationStatus.COMPLETED);
            // ✅ Mark the vehicle as AVAILABLE again
            Vehicle vehicle = reservation.getVehicle();
            vehicle.setStatus(VehicleStatus.AVAILABLE);

            // ✅ Save changes to database
            reservationRepository.save(reservation);
            vehicleRepository.save(vehicle);

            return "Payment Successful!";
        } else {
            return "Payment Failed!";
        }
    }
}
