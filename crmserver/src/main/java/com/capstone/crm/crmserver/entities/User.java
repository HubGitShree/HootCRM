package com.capstone.crm.crmserver.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * User entity implementing UserDetails for Spring Security.
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key




    @Setter
    @Column(nullable = false, unique = true)
    private String username; // Unique username

    @Setter
    @Getter
    @Column(nullable = false)
    private String password; // Encrypted password

    @Getter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // Role (ADMIN, USER, SALES)

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "is_active")
    private boolean isActive;

    @Getter
    @Column(name = "last_login")
    private Date lastLogin;

//    @OneToMany(mappedBy = "user")
//    private List<Token> tokens;

    @Override
    public String getUsername() {
        return username;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

//    public List<Token> getTokens() {
//        return tokens;
//    }
//
//    public void setTokens(List<Token> tokens) {
//        this.tokens = tokens;
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
