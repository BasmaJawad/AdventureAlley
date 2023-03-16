package com.example.adventurealley.repository;

import com.example.adventurealley.model.Customer;
import com.example.adventurealley.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepo extends JpaRepository<Customer, String> {


  Optional<Customer>findCustomerBy(String email);
}



