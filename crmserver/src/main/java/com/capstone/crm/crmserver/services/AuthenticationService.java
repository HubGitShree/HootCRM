// auth controller wil hanfle user login and registration 'reuest'
// for user login and registration we createa a auhthntication service

package com.capstone.crm.crmserver.services;

import com.capstone.crm.crmserver.entities.AuthenticationResponse;
import com.capstone.crm.crmserver.entities.User;
import com.capstone.crm.crmserver.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    // method for registration ; wll create the AuthenticationResponse class shortly
    public AuthenticationResponse register(User request) {
//        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
//            return new AuthenticationResponse(null, null, "User already exists");
//        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setActive(true);
        userRepository.save(user);  // save user using repoitory
        String token = jwtService.generateToken(user, user.getRole());
        return new AuthenticationResponse(token);
    }


    // method for authentication/login
    public AuthenticationResponse authenticate(@RequestBody User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(); // this orElseThrw is importnat when ide asks for optional type
        String token = jwtService.generateToken(user, user.getRole());
        return new AuthenticationResponse(token);
    }
}

// now methods done so go to AuthController.java

// can add msgs later for successfu login etc in line 43 55 and then send them with token to AuthenticationResponse class