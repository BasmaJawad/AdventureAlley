package com.example.adventurealley.service;

import com.example.adventurealley.model.Activity;
import com.example.adventurealley.model.Customer;
import com.example.adventurealley.model.Enums.Status;
import com.example.adventurealley.model.Reservation;
import com.example.adventurealley.repository.ActivityRepo;
import com.example.adventurealley.repository.CustomerRepo;
import com.example.adventurealley.repository.ReservationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

  @Autowired
  CustomerRepo customerRepo;

  @Autowired
  ReservationRepo reservationRepo;

  @Autowired
  ActivityRepo activityRepo;

  public Customer postCustomer(@RequestBody Customer customer) {
    System.out.println(customer);
    return customerRepo.save(customer);
  }

  public Reservation postReservation(@RequestBody Reservation reservation) {
    reservation.setStatus(Status.PENDING);
    return reservationRepo.save(reservation);
  }
  public List<Activity> getAvailableTimes() {
    return activityRepo.findAll();
  }

  public List<Customer> allCustomers() {
    return customerRepo.findAll();
  }

  public Customer postNewCustomer(@RequestBody Customer customer) {
    return customerRepo.save(customer);
  }

  public List<Reservation> getReservationsByDate(@PathVariable String date) {

    return reservationRepo.findReservationByDate(date);

  }

  public List<Reservation> customerReservations(@PathVariable String email) {
    return reservationRepo.findReservationByCustomerEmailOrderByDateAsc(email);

  }


}
