package com.example.adventurealley.controller;

import com.example.adventurealley.model.Activity;
import com.example.adventurealley.model.Customer;
import com.example.adventurealley.model.Enums.Status;
import com.example.adventurealley.model.Reservation;
import com.example.adventurealley.repository.ActivityRepo;
import com.example.adventurealley.repository.CustomerRepo;
import com.example.adventurealley.repository.ReservationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@CrossOrigin
public class testController {

    @Autowired
    CustomerRepo cr;


    @Autowired
    ActivityRepo ar;
    @Autowired
    ReservationRepo rp;



    @GetMapping("/tilføj")
public Reservation reservation(){

        Customer c = cr.findAll().get(0);
        Activity a = ar.findAll().get(0);
        Reservation reservation = new Reservation();
        reservation.setActivity(a);
        reservation.setCustomer(c);
        reservation.setPrice(100);
        reservation.setParticipants(6);
        reservation.setStatus(Status.CONFIRMED);
        reservation.setDate("2023-03-19");
        rp.save(reservation);
    return null;
    }
}
