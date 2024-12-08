package com.capstone.crm.crmserver.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId; // primary key

    @Column(nullable = false, length = 100)
    private String name; // customer name

    @Column(nullable = false, unique = true, length = 100)
    private String email; // customer email

    @Column(nullable = false, length = 15)
    private String phone; // customer phone number

    @Column(nullable = false)
    private String address; // customer address

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category; // customer category: Potential, Active, Inactive

    @Column(nullable = false)
    private LocalDate dateAdded; // date customer was added

    @Column(nullable = false)
    private String State; // state of the customer

//    end of native fields
    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonIgnore
    private Lead lead;  // Lead is the owning side of the relationship

    // Getters and Setters
    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public LocalDate getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDate dateAdded) {
        this.dateAdded = dateAdded;
    }

    public Lead getLead() {
        return lead;
    }

    public void setLead(Lead lead) {
        this.lead = lead;
    }

    public String getState() {
        return State;
    }

    public void setState(String state) {
        State = state;
    }

    // Enum for Customer Categories
    public enum Category {
        POTENTIAL,
        ACTIVE,
        INACTIVE
    }
}