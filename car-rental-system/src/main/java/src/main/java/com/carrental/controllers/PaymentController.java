package src.main.java.com.carrental.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import src.main.java.com.carrental.services.PaymentService;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/confirm")
    public ResponseEntity<Map<String, String>> confirmPayment(
            @RequestParam Long reservationId,
            @RequestParam String status) {

        String message = paymentService.processPayment(reservationId, status);
        return ResponseEntity.ok(Map.of("message", message));
    }
}
