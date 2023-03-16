package com.example.adventurealley.repository;

import com.example.adventurealley.model.Activity;
import com.example.adventurealley.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepo extends JpaRepository<Activity, Integer> {
}
// <Objektet + primery key's datatype>

