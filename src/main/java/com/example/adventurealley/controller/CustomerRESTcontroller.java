package com.example.adventurealley.controller;

import com.example.adventurealley.model.Customer;
import com.example.adventurealley.model.Reservation;
import com.example.adventurealley.repository.CustomerRepo;
import com.example.adventurealley.service.CustomerService;
import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin //for at vi kan sende requets hertil med javascript
public class CustomerRESTcontroller {

    @Autowired

    CustomerRepo customerRepo;
    CustomerService customerService;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public Customer postCustomer(@RequestBody Customer customer){
        System.out.println(customer);
        return customerRepo.save(customer);
    }


    @GetMapping ("/test")
    public List<Customer> allCustomers(){
        return customerRepo.findAll();
    }


    }









