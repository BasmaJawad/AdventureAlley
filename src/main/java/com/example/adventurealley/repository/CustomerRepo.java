package com.example.adventurealley.repository;

import com.example.adventurealley.model.Customer;
import com.example.adventurealley.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<Customer, String> {
}
