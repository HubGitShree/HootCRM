package com.capstone.crm.crmserver.config;

import com.capstone.crm.crmserver.entities.User;
import com.capstone.crm.crmserver.entities.Role;
import com.capstone.crm.crmserver.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


import java.util.Optional;

@Component
public class AdminAccountInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminAccountInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void createAnAdminAccount() {
        Optional<User> optionalAdmin = userRepository.findByUsername("admin");
        if (optionalAdmin.isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@test.com");
            admin.setRole(Role.ADMIN); // Role is an enum
            admin.setPassword(passwordEncoder.encode("adminpassword123"));
            userRepository.save(admin);
            System.out.println("Admin account created successfully!");
        } else {
            System.out.println("Admin account already exists!");
        }
    }
}