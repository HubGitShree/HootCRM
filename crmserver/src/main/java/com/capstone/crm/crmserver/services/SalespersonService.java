package com.capstone.crm.crmserver.services;

import com.capstone.crm.crmserver.entities.Customer;
import com.capstone.crm.crmserver.entities.Salesperson;
import com.capstone.crm.crmserver.repositories.SalespersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalespersonService {

    private final SalespersonRepository salespersonRepository;

    public SalespersonService(SalespersonRepository salespersonRepository) {
        this.salespersonRepository = salespersonRepository;
    }

    public List<Salesperson> getAllSalespersons() {
        return salespersonRepository.findAll();
    }

    public Salesperson getSalespersonById(Long salespersonId) {
        return salespersonRepository.findById(salespersonId)
                .orElseThrow(() -> new RuntimeException("Salesperson not found"));
    }

    //   to create multiple salespersons ; this is more for me to aid fill data in the table
    public List<Salesperson> createSalespersons(List<Salesperson> salespersons) {
        return salespersonRepository.saveAll(salespersons);
    }

    public Salesperson getSalespersonByEmail(String email) {
        return salespersonRepository.findByEmail(email);
    }

    //    for admin to create a salesperson
    public Salesperson createSalesperson(Salesperson salesperson) {
        return salespersonRepository.save(salesperson);
    }

    //   for admin to delete a salesperson
    public void deleteSalesperson(Long salespersonId) {
        salespersonRepository.deleteById(salespersonId);
    }

    //    to get a list of salespersons who are not assigned any lead
    public List<Salesperson> findUnassignedSalespersons() {
        return salespersonRepository.findByLeadIsNull();
    }

    //    to update a salesperson
    public Salesperson updateSalesperson(Salesperson salesperson) {
        return salespersonRepository.save(salesperson);
    }
}