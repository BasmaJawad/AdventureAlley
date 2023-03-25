package com.example.adventurealley.controller;

import com.example.adventurealley.model.Activity;
import com.example.adventurealley.model.Customer;
import com.example.adventurealley.model.Enums.Status;
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
    CustomerService customerService;

    @PostMapping("/paintballBooking")
    public Reservation postReservation(@RequestBody Reservation reservation) {
        return customerService.postReservation(reservation);

    }

    @GetMapping("/activities")
    public List<Activity> getAvailableTimes() {
        return customerService.getAvailableTimes();
    }

    @GetMapping("/Login")
    public List<Customer> allCustomers() {
        return customerService.allCustomers();
    }


    @PostMapping("/SignUp")
    @ResponseStatus(HttpStatus.CREATED)
    public Customer postNewCustomer(@RequestBody Customer customer) {
        return customerService.postNewCustomer(customer);
    }


    @GetMapping("/reservation/{date}")
    public List<Reservation> getReservationsByDate(@PathVariable String date) {

        return customerService.getReservationsByDate(date);

    }

    @GetMapping("/customerReservations/{email}")
    public List<Reservation> customerReservations(@PathVariable String email) {
        return customerService.customerReservations(email);

    }
}
