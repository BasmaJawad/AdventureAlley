package com.example.adventurealley.controller;

import com.example.adventurealley.model.Activity;
import com.example.adventurealley.model.Customer;
import com.example.adventurealley.model.Reservation;
import com.example.adventurealley.repository.ActivityRepo;
import com.example.adventurealley.repository.CustomerRepo;
import com.example.adventurealley.repository.ReservationRepo;
import com.example.adventurealley.service.CustomerService;
import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin //for at vi kan sende requets hertil med javascript
public class CustomerRESTcontroller {

    @Autowired
    CustomerRepo customerRepo;
    CustomerService customerService;

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

    @GetMapping("/activities")
    public List<Activity> getAvailableTimes() {
        return activityRepo.findAll();
    }

    @GetMapping ("/Login")
    public List<Customer> allCustomers(){
        return customerRepo.findAll();
    }


    @PostMapping ("/SignUp")
    @ResponseStatus(HttpStatus.CREATED)
    public Customer postCustomer2(@RequestBody Customer customer) {
        System.out.println(customer);
        return customerRepo.save(customer);
    }


    @GetMapping("/reservation/{date}")             //spring bruger @DateTimeFormat til at caste string til en Date
        public List<Reservation> reservations(@PathVariable String date){
        System.out.printf(String.valueOf(date));
            return reservationRepo.findReservationByDate(date);

    }
}
