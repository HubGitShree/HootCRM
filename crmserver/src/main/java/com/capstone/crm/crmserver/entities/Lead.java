package com.capstone.crm.crmserver.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "leads")
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leadId;

    @OneToOne
    @JoinColumn(name = "customer_id", nullable = false, unique = true)
    private Customer customer;

    @OneToOne
    @JoinColumn(name = "salesperson_id", nullable = false, unique = true)
    private Salesperson salesperson;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String pipelineStage;

    private LocalDateTime dateCreated;

    private LocalDateTime lastUpdated;

    // Getters and setters
    public Long getLeadId() {
        return leadId;
    }

    public void setLeadId(Long leadId) {
        this.leadId = leadId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Salesperson getSalesperson() {
        return salesperson;
    }

    public void setSalesperson(Salesperson salesperson) {
        this.salesperson = salesperson;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPipelineStage() {
        return pipelineStage;
    }

    public void setPipelineStage(String pipelineStage) {
        this.pipelineStage = pipelineStage;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}





















/**
 *
 * Key notes for future f=reference:
 * n Java, the Long.valueOf(Object obj) method does not exist. The Long.valueOf(String s) method expects a String as an argument. Since the values in the Map<String, Object> are of type Object, you need to convert them to String first using toString() before passing them to Long.valueOf(String s).
 */