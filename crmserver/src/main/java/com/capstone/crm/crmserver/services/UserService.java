package com.capstone.crm.crmserver.services;

import com.capstone.crm.crmserver.entities.Role;
import com.capstone.crm.crmserver.entities.User;
import com.capstone.crm.crmserver.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.SALES);
        user.setActive(true);
        user.setLastLogin(new Date());

        return userRepository.save(user);
    }


}
