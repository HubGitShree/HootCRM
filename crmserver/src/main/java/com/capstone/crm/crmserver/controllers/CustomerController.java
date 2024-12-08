package com.capstone.crm.crmserver.controllers;

import com.capstone.crm.crmserver.entities.Customer;
import com.capstone.crm.crmserver.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/customers")
//@CrossOrigin(origins = "*") // Already have a simple CORS filter in place
public class CustomerController {
    /*
    1. Add a new customer
    2. Get all customers
    3. Get customers by category
     */

    @Autowired
    private CustomerService customerService;

    // Add a new customer
    @PostMapping
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
        Customer addedCustomer = customerService.addCustomer(customer);
        return ResponseEntity.ok(addedCustomer);
    }

    @PostMapping("/bulkcreate")
    public ResponseEntity<List<Customer>> createCustomers(@RequestBody List<Customer> customers) {
         List<Customer> customers1 = customerService.createCustomers(customers);
        return ResponseEntity.ok(customers1);
    }

    // Get all customers
    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        return ResponseEntity.ok(customers);
    }

    // Get customers by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Customer>> getCustomersByCategory(@PathVariable Customer.Category category) {
        List<Customer> customers = customerService.getCustomersByCategory(category);
        return ResponseEntity.ok(customers);
    }

    // Get customers with no lead assigned
    @GetMapping("/unassigned")
    public ResponseEntity<List<Customer>> getCustomersWithNoSalesperson() {
        List<Customer> customers = customerService.getCustomersWithNoLeadsAssigned();
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/demography")
    public ResponseEntity<List<Map<String, Object>>> getCustomerSegmentation(){
        List<Map<String, Object>> customerSegmentation = customerService.getCustomersCountByState();
        return ResponseEntity.ok(customerSegmentation);
    }

}