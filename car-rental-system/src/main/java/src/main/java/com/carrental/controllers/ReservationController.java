//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package src.main.java.com.carrental.controllers;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import src.main.java.com.carrental.models.Reservation;
import src.main.java.com.carrental.models.ReservationStatus;
import src.main.java.com.carrental.services.ReservationService;
@CrossOrigin(
        origins = {"http://localhost:3000"}
)
@RestController
@RequestMapping({"/api/reservations"})
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    public ReservationController() {
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(this.reservationService.getAllReservations());
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<Optional<Reservation>> getReservationById(@PathVariable Long id) {
        return ResponseEntity.ok(this.reservationService.getReservationById(id));
    }
    @GetMapping({"/user/{userId}"})
    public ResponseEntity<List<Reservation>> getUserReservations(@PathVariable Long userId , @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        System.out.println("Authenticated user: " + username);
        return ResponseEntity.ok(this.reservationService.getUserReservations(userId));
    }

    @PostMapping({"/book"})
    public ResponseEntity<Reservation> createReservation(@RequestParam Long userId, @RequestParam Long vehicleId, @RequestParam String startDate, @RequestParam String endDate) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
        Date parsedStartDate = dateFormat.parse(startDate);
        Date parsedEndDate = dateFormat.parse(endDate);
        return ResponseEntity.ok(this.reservationService.createReservation(userId, vehicleId, parsedStartDate, parsedEndDate));
    }

    @PutMapping({"/{id}/status"})
    public ResponseEntity<Reservation> updateReservationStatus(@PathVariable Long id, @RequestParam ReservationStatus status) {
        return ResponseEntity.ok(this.reservationService.updateReservationStatus(id, status));
    }

    @DeleteMapping({"/{id}/cancel"})
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
        this.reservationService.cancelReservation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping({"/{id}/pay"})
    public void redirectToPayment(@PathVariable Long id, HttpServletResponse response) throws IOException {
        Reservation reservation = (Reservation)this.reservationService.getReservationById(id).orElseThrow(() -> {
            return new RuntimeException("Reservation not found");
        });
        double amount = reservation.getTotalCost();
        String paymentUrl = "http://localhost:8080/dummy-payment.html?reservationId=" + id + "&amount=" + amount;
        response.sendRedirect(paymentUrl);
    }
}
