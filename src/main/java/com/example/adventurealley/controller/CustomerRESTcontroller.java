package com.example.adventurealley.controller;

import com.example.adventurealley.model.Activity;
import com.example.adventurealley.model.Customer;
import com.example.adventurealley.model.Reservation;
import com.example.adventurealley.repository.ActivityRepo;
import com.example.adventurealley.repository.CustomerRepo;
import com.example.adventurealley.repository.ReservationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin //for at vi kan sende requets hertil med javascript
public class CustomerRESTcontroller {

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    ReservationRepo reservationRepo;

    @Autowired
    ActivityRepo activityRepo;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public Customer postCustomer(@RequestBody Customer customer) {
        System.out.println(customer);
        return customerRepo.save(customer);
    }

    @PostMapping("/paintballBooking")
    public Reservation postReservation(@RequestBody Reservation reservation) {
        System.out.println(reservation);
        return reservationRepo.save(reservation);
    }

    @GetMapping("/availableTimes")
    public List<Activity> getAvailableTimes() {
        return activityRepo.findAll();
    }
}
