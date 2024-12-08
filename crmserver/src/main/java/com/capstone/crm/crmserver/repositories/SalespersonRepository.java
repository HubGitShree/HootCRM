package com.capstone.crm.crmserver.repositories;

import com.capstone.crm.crmserver.entities.Salesperson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalespersonRepository extends JpaRepository<Salesperson, Long> {
    Salesperson findByEmail(String email);

    List<Salesperson> findByLeadIsNull();
}
