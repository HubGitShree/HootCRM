package com.capstone.crm.crmserver.services;

import com.capstone.crm.crmserver.entities.Lead;
import com.capstone.crm.crmserver.repositories.LeadRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeadService {

    private final LeadRepository leadRepository;

    public LeadService(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    public Lead getLeadById(Long leadId) {
        return leadRepository.findById(leadId)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
    }

    public Lead createLead(Lead lead) {
        return leadRepository.save(lead);
    }

//    this method is for me to save data in the leads table via the controller
    public List<Lead> createLeads(List<Lead> leads) {
        return leadRepository.saveAll(leads);
    }

    public Lead updateLead(Lead lead) {
        return leadRepository.save(lead);
    }

    public void deleteLead(Long leadId) {
        leadRepository.deleteById(leadId);
    }

    public Lead findLeadByCustomerId(Long customerId) {
        return leadRepository.findByCustomer_CustomerId(customerId);
    }

    public Lead findLeadBySalespersonId(Long salespersonId) {
        return leadRepository.findBySalesperson_SalespersonId(salespersonId);
    }
}

// lead is assiged TO a salesperson
//