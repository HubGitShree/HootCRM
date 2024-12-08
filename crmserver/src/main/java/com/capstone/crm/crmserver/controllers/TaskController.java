package com.capstone.crm.crmserver.controllers;

import com.capstone.crm.crmserver.entities.Task;
import com.capstone.crm.crmserver.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService tasksService;

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return tasksService.getAllTasks();
    }

    // Get a task by ID
    @GetMapping("/{id}")
    public Optional<Task> getTaskById(@PathVariable Long id) {
        return tasksService.getTaskById(id);
    }

    // Create a new task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return tasksService.createTask(task);
    }

//    // Bulk create
    @PostMapping("/bulk")
    public List<Task> createTasks(@RequestBody List<Task> tasks) {
        return tasksService.createTasks(tasks);
    }

    // Update a task
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        return tasksService.updateTask(id, updatedTask);
    }

    // Delete a task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        tasksService.deleteTask(id);
    }
}
