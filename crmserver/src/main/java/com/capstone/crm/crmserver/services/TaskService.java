package com.capstone.crm.crmserver.services;

import com.capstone.crm.crmserver.entities.Task;
import com.capstone.crm.crmserver.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Fetch all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Fetch a task by ID
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    // Create a new task
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    // Update an existing task
    public Task updateTask(Long id, Task updatedTask) {
        if (taskRepository.existsById(id)) {
            updatedTask.setId(id);
            return taskRepository.save(updatedTask);
        }
        throw new RuntimeException("Task not found");
    }

    // Delete a task
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

//    used fror bulk create
    public List<Task> createTasks(List<Task> tasks) {
        return taskRepository.saveAll(tasks);
    }
}
