//  This class will contain all the business logic for the customer entity; managing the customers, adding them, filtering them by categ etc
package com.capstone.crm.crmserver.services;

import com.capstone.crm.crmserver.entities.Customer;
import com.capstone.crm.crmserver.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    // Add a new customer
    public Customer addCustomer(Customer customer) {
        customer.setDateAdded(java.time.LocalDate.now()); // Set the current date
        return customerRepository.save(customer);
    }

    // Get all customers
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Get customers by category
    public List<Customer> getCustomersByCategory(Customer.Category category) {
        return customerRepository.findByCategory(category);
    }

    // to be used in the bulk create method of cotroller
    public List<Customer> createCustomers(List<Customer> customers) {
        return customerRepository.saveAll(customers);
    }

    // Get customers with no lead  assigned
    public List<Customer> getCustomersWithNoLeadsAssigned() {
        return customerRepository.findByLeadIsNull();
    }

    // to fetch customer entity by identity
    public Customer getCustomerById(Long customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    //    update customer
    public Customer updateCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    //
    public List<Map<String, Object>> getCustomersCountByState() {
        return customerRepository.findCustomersCountByState();  // now controller
    }


}