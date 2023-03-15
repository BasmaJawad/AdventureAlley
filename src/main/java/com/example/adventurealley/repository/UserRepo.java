package com.example.adventurealley.repository;

import com.example.adventurealley.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer> {
}
