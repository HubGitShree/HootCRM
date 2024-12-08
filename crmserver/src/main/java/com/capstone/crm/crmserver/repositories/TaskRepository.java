package com.capstone.crm.crmserver.repositories;

import com.capstone.crm.crmserver.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // custom queries go here
}
