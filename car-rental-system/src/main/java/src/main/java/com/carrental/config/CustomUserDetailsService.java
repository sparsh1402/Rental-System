package src.main.java.com.carrental.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import src.main.java.com.carrental.respositories.UserRepository;
import src.main.java.com.carrental.models.User;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Assuming email is unique
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Create authorities based on your user's role (e.g., ROLE_USER, ROLE_ADMIN)
        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRole().toUpperCase());

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singleton(authority)
        );
    }
}