package src.main.java.com.carrental.controllers;


import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/webhook")
public class WebhookController {

    @PostMapping("/razorpay")
    public String razorpayWebhook(@RequestBody Map<String, Object> payload) {
        System.out.println("Webhook received: " + payload);
        return "Webhook received successfully";
    }
}

