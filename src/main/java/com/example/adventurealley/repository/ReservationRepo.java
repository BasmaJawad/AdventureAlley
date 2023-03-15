package com.example.adventurealley.repository;

import com.example.adventurealley.model.Reservation;
import com.example.adventurealley.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepo extends JpaRepository<Reservation, Integer> {
}
