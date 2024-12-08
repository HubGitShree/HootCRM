package com.capstone.crm.crmserver.controllers;




import com.capstone.crm.crmserver.entities.User;
import com.capstone.crm.crmserver.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin") // this means all the routes in this controller will be prefixed with /admin
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

//    @GetMapping("/demo")
//    public ResponseEntity<String> demo() {
//        return ResponseEntity.ok("Hello from secured url");
//    }

    @GetMapping("/dashboard")
    public ResponseEntity<String> getAdminDashboard() {
        return ResponseEntity.ok("Welocme to Admin Dashboard");
    }

    @PostMapping("/createuser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }
}