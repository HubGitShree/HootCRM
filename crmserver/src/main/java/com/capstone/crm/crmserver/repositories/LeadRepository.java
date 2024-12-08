package com.capstone.crm.crmserver.repositories;

import com.capstone.crm.crmserver.entities.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
    // These r my custom queries

//    find the lead by the customer id
    Lead findByCustomer_CustomerId(Long customerId);
//    find the lead by the salesperson id
    Lead findBySalesperson_SalespersonId(Long salespersonId);
}
