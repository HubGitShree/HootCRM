package com.capstone.crm.crmserver.controllers;


import com.capstone.crm.crmserver.entities.Salesperson;
import com.capstone.crm.crmserver.services.SalespersonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/salespersons")
public class SalespersonController {

    private final SalespersonService salespersonService;

    public SalespersonController(SalespersonService salespersonService) {
        this.salespersonService = salespersonService;
    }

    @GetMapping
    public List<Salesperson> getAllSalespersons() {
        return salespersonService.getAllSalespersons();
    }

    @GetMapping("/{id}")
    public Salesperson getSalespersonById(@PathVariable Long id) {
        return salespersonService.getSalespersonById(id);
    }

    //    get salesperson by email
    @GetMapping("/email/{email}")
    public Salesperson getSalespersonByEmail(@PathVariable String email) {
        return salespersonService.getSalespersonByEmail(email);
    }

    //    lets get a list of salesperople who are unassigned any lead
    @GetMapping("/unassigned")
    public List<Salesperson> getUnassignedSalespersons() {
        return salespersonService.findUnassignedSalespersons();
    }


    @PostMapping
    public Salesperson createSalesperson(@RequestBody Salesperson salesperson) {
        return salespersonService.createSalesperson(salesperson);
    }

    //    this is for me to save data in the salespersons table via the controller
    @PostMapping("/bulkcreate")
    public List<Salesperson> createSalespersons(@RequestBody List<Salesperson> salespersons) {
        return salespersonService.createSalespersons(salespersons);
    }

    @DeleteMapping("/{id}")
    public void deleteSalesperson(@PathVariable Long id) {
        salespersonService.deleteSalesperson(id);
    }





}

