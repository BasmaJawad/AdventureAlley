package com.example.adventurealley.service;

import com.example.adventurealley.model.Customer;
import com.example.adventurealley.model.User;
import com.example.adventurealley.repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CustomerService {

  @Autowired
  CustomerRepo customerRepo;

  public List<Customer> getCustomer() {
    return customerRepo.findAll();
  }

}
