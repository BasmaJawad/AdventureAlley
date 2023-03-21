package com.example.adventurealley.repository;

import com.example.adventurealley.model.Reservation;
import com.example.adventurealley.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ReservationRepo extends JpaRepository<Reservation, Integer> {

    List<Reservation> findReservationByDate(String date);
    List<Reservation> findReservationByCustomerEmail(String email);
}
