package com.capstone.crm.crmserver.repositories;

import com.capstone.crm.crmserver.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for User entity.
 */

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username); // find user by username ; an auto-implemented ethod provided by Spring Data JPA
}
