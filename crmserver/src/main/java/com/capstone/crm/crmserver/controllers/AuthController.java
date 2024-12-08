package com.capstone.crm.crmserver.controllers;


import com.capstone.crm.crmserver.entities.AuthenticationResponse;
import com.capstone.crm.crmserver.entities.User;
import com.capstone.crm.crmserver.services.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {



    // inject AuthService
    private final AuthenticationService authService;

    public AuthController(AuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register ( @RequestBody User request ) {
        return ResponseEntity.ok(authService.register(request));
    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login (
            @RequestBody User request
    ) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
}