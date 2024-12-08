package com.capstone.crm.crmserver.repositories;

import com.capstone.crm.crmserver.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    //  custom query method to find customer by category; there are some builtin methods like findByID, findAll, save, delete, etc.
    List<Customer> findByCategory(Customer.Category category);

    //    salesprson not assigned to this customer to handle its lead
    List<Customer> findByLeadIsNull();

    //  custom query method to find customer by id
//    Customer findById(Long customerId);

    @Query(value="SELECT c.State as State, COUNT(c) as Count FROM Customer c GROUP BY c.State")
    List<Map<String,Object>> findCustomersCountByState(); // now service will use this method to get the data


}


