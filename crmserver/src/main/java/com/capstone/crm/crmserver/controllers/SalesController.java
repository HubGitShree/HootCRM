package com.capstone.crm.crmserver.controllers;

// restricted with access only to  the people who have ROLE of SALES
// this is the controller for the sales routes
// in real world, personal routes for salespersons will be here

import com.capstone.crm.crmserver.entities.Salesperson;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sales")
public class SalesController {

    @GetMapping("/salesdashboard")
    public String addTask() {
        // Implement the logic to add a task to the salesperson
        // For now, returning the string
        return "Welcome to the Sales Dashboard";
    }
}
