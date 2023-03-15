package com.example.adventurealley.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Customer {

    @Id
    private String email;
    private String password;
    private int number;
    private String firstname;
    private String lastname;

    @OneToMany(mappedBy = "customer")
    @JsonBackReference
    private Set<Reservation> reservations = new HashSet<>();



}
