package src.main.java.com.carrental.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.main.java.com.carrental.models.*;
import src.main.java.com.carrental.respositories.ReservationRepository;
import src.main.java.com.carrental.respositories.UserRepository;
import src.main.java.com.carrental.respositories.VehicleRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
//    @Autowired
//    private KafkaProducerService kafkaProducerService;
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    public List<Reservation> getUserReservations(Long userId) {
        return reservationRepository.findByUserId(userId);
    }

    public Reservation createReservation(Long userId, Long vehicleId, Date startDate, Date endDate) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        if (vehicle.getStatus() != VehicleStatus.AVAILABLE) {
            throw new RuntimeException("Vehicle is not available");
        }
        long durationInHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

        double totalCost = (durationInHours/24 * vehicle.getDailyRentalCost()) + (durationInHours%24 * vehicle.getHourlyRentalCost());



        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setVehicle(vehicle);
        reservation.setStartDate(startDate);
        reservation.setEndDate(endDate);
        reservation.setTotalCost(totalCost);
        reservation.setStatus(ReservationStatus.SCHEDULED);

        vehicle.setStatus(VehicleStatus.RENTED);
        vehicleRepository.save(vehicle);
        // Send reservation event to Kafka
//        kafkaProducerService.sendMessage("reservation_topic", "New reservation created: " + reservation.getId());
        return reservationRepository.save(reservation);
    }

    public Reservation updateReservationStatus(Long id, ReservationStatus status) {
        return reservationRepository.findById(id).map(reservation -> {
            reservation.setStatus(status);

            // ✅ Mark as PAID when reservation is completed
            if (status == ReservationStatus.COMPLETED) {
                reservation.setPaymentStatus(PaymentStatus.PAID);
            }

            return reservationRepository.save(reservation);
        }).orElseThrow(() -> new RuntimeException("Reservation not found"));
    }

    public void cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);

        Vehicle vehicle = reservation.getVehicle();
        vehicle.setStatus(VehicleStatus.AVAILABLE);
        vehicleRepository.save(vehicle);
    }


}

