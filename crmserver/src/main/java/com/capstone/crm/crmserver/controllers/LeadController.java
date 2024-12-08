package com.capstone.crm.crmserver.controllers;

import com.capstone.crm.crmserver.entities.Customer;
import com.capstone.crm.crmserver.entities.Lead;
import com.capstone.crm.crmserver.entities.Salesperson;
import com.capstone.crm.crmserver.services.CustomerService;
import com.capstone.crm.crmserver.services.EmailService;
import com.capstone.crm.crmserver.services.LeadService;
import com.capstone.crm.crmserver.services.SalespersonService;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/leads")
public class LeadController {

    private final LeadService leadService;
    private final CustomerService customerService;
    private final SalespersonService salespersonService;
    //FOR EMAIL
    private final EmailService emailService;
    //    FOR LOGGING
//    private static final Logger EMAIL_LOGGER = LoggerFactory.getLogger("EMAIL_LOGGER");


    public LeadController(LeadService leadService, CustomerService customerService, SalespersonService salespersonService, EmailService emailService) {
        this.leadService = leadService;
        this.customerService = customerService;
        this.salespersonService = salespersonService;
        this.emailService = emailService;
    }

    @GetMapping
    public List<Lead> getAllLeads() {
        return leadService.getAllLeads();
    }

    @GetMapping("/{id}")
    public Lead getLeadById(@PathVariable Long id) {
        return leadService.getLeadById(id);
    }

//    @PostMapping
//    public Lead createLead(@RequestBody Lead leadRequest) {
//        // Fetch Customer and Salesperson
//         Customer customer = customerService.getCustomerById(leadRequest.getCustomer().getCustomerId());
//        Salesperson salesperson = salespersonService.getSalespersonById(leadRequest.getSalesperson().getSalespersonId());
//
//        // Check if the customer is already associated with a lead
//        if (customer.getLead() != null) {
//            throw new RuntimeException("Customer is already associated with a lead.");
//        }
//
//        // Check if the salesperson is already associated with a lead
//        if (salesperson.getLead() != null) {
//            throw new RuntimeException("Salesperson is already associated with a lead.");
//        }
//
//        // Set the customer and salesperson in the lead
//        leadRequest.setCustomer(customer);
//        leadRequest.setSalesperson(salesperson);
//
//        // Save the lead
//        return leadService.createLead(leadRequest);
//
//    }


    // new structure of post reqeust to create lead aligning with frontend
    @PostMapping
    public Lead createLead(@RequestBody Map<String, Object> leadRequest) {

        // Convert to long since in the entity these two are in long
        Long customerId = Long.valueOf(leadRequest.get("customerId").toString());
        Long salespersonId = Long.valueOf(leadRequest.get("salespersonId").toString());
        String status = leadRequest.get("status").toString();
        String pipelineStage = leadRequest.get("pipelineStage").toString();

        // fetch Customer and Salesperson enities/objects
        Customer customer = customerService.getCustomerById(customerId);
        Salesperson salesperson = salespersonService.getSalespersonById(salespersonId);

        // validate that they are not already assigned
        if (customer.getLead() != null) {
            throw new RuntimeException("Customer is already associated with a lead.");
        }
        if (salesperson.getLead() != null) {
            throw new RuntimeException("Salesperson is already associated with a lead.");
        }

        // create a new Lead
        Lead lead = new Lead();
        lead.setCustomer(customer);
        lead.setSalesperson(salesperson);
        lead.setStatus(status);
        lead.setPipelineStage(pipelineStage);
        lead.setDateCreated(LocalDateTime.now());

        Lead savedLead = leadService.createLead(lead);  //  we need a lead pbject because the repository does sav() with a lead object only
//         so we cant make do with just the cust id salesperson id etc

//        NOW WE ALSO GOTTA REVERSE MAP, THAT IS, SET THE LEAD IN THE CUSTOMER AND SALESPERSON OBJECTS
        customer.setLead(savedLead);
        salesperson.setLead(savedLead);
        customerService.updateCustomer(customer);
        salespersonService.updateSalesperson(salesperson);


//        NOW, TO SEND AN EMAIL
        String emailBody = String.format("Hello %s, \n\nA new lead has been assigned to you. \n\nLead Details: \n\nCustomer: %s\nStatus: %s\nPipeline Stage: %s\n\nBest Regards,\nHootCRM", salesperson.getName(), customer.getName(), status, pipelineStage);
        emailService.sendEmail(salesperson.getEmail(), "New Lead Assigned", emailBody);

        // Log email details
//        EMAIL_LOGGER.info("Email sent to: {}\nSubject: New Lead Assigned\nTimestamp: {}\nLead Details: {}",
//                salesperson.getEmail(),
//                LocalDateTime.now(),
//                lead.toString());

        return savedLead;
    }

    @PostMapping("/bulkcreate")
    public List<Lead> createLeads(@RequestBody List<Lead> leads) {
        return leadService.createLeads(leads);
    }

    @PutMapping
    public Lead updateLead(@RequestBody Lead lead) {
        return leadService.updateLead(lead);
    }

    @DeleteMapping("/{id}")
    public void deleteLead(@PathVariable Long id) {
        Lead lead = leadService.getLeadById(id);  // gt the lead object
        // now set its customer and salesperson to null before deleting
        lead.getCustomer().setLead(null);
        lead.getSalesperson().setLead(null);
        leadService.deleteLead(id);

    }
}
