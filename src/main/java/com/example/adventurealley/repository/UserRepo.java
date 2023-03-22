package com.example.adventurealley.repository;

import com.example.adventurealley.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    Optional<User> findUserByUsername(String username);

    //Response entity er en klasse som kan bruges til at returnere en statuskode og en body
    ResponseEntity<User> deleteUserByID (int id);

}
