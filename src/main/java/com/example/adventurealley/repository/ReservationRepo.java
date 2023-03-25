package com.example.adventurealley.repository;

import com.example.adventurealley.model.Enums.Status;
import com.example.adventurealley.model.Reservation;
import com.example.adventurealley.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface ReservationRepo extends JpaRepository<Reservation, Integer> {

    List<Reservation> findReservationByDate(String date);

    List<Reservation> findReservationByCustomerEmailOrderByDateAsc(String email);

    List<Reservation> findReservationByStatusOrderByDateAsc(Status status);

    @Query("SELECT r FROM Reservation r WHERE SUBSTRING(r.date, 1, 4) = :year AND SUBSTRING(r.date, 6, 2) = :month")
        //6 er der hvor substring starter, 2 er hvor mange tegn den skal tage
    List<Reservation> findByMonth(String year, String month);

}

