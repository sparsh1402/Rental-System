package src.main.java.com.carrental.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import src.main.java.com.carrental.config.JwtUtil;
import src.main.java.com.carrental.models.*;
import src.main.java.com.carrental.services.UserService;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/{email}")
    public ResponseEntity<Optional<User>> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    // 🔹 LOGIN API
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtil.generateToken(loginRequest.getEmail());
            UserResponse user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(new LoginResponse(jwt,user));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
//        try {
//            User user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
//            return ResponseEntity.ok(user);
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
    }

    // 🔹 UPDATE PASSWORD API
    @PostMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody PasswordUpdateRequest request) {
        try {
            userService.updateUserPassword(request.getEmail(), request.getNewPassword(), request.getConfirmPassword());
            return ResponseEntity.ok("Password updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}