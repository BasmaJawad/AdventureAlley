package com.example.adventurealley.controller;


import com.example.adventurealley.model.Customer;
import com.example.adventurealley.model.Enums.Status;
import com.example.adventurealley.model.Enums.UserType;
import com.example.adventurealley.model.Reservation;
import com.example.adventurealley.model.User;
import com.example.adventurealley.repository.ReservationRepo;
import com.example.adventurealley.repository.UserRepo;
import com.example.adventurealley.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin // Jeg skal kunne tilgå min restcontroller gennem noget andet. I dette tilfælde javascript
public class UserRESTcontroller {

    @Autowired
    UserService userService;

    @Autowired
    ReservationRepo reservationRepo;

    @Autowired
    UserRepo userRepo;

    @GetMapping("/user")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping ("/UserLogin")
    public List<User> allUserTest(){
        return userService.getUsers();
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username){
        //userService.getUser();
        return null;
    }
    @PostMapping("/Admin")
    @ResponseStatus(HttpStatus.CREATED)
    public User postUser(@RequestBody User user) {
        System.out.println(user);
        user.setUsertype(UserType.EMPLOYEE);
        return userRepo.save(user);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User user){

        Optional<User> userOptional = userRepo.findById(id);
        System.out.println(user);

        if (userOptional.isPresent()){   System.out.println(user);
            userRepo.save(user);
            return new ResponseEntity<>(user, HttpStatus.OK);

        }

        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @GetMapping("/reservationsByStatus/{status}")
    public List<Reservation> getReservationsByStatus(@PathVariable Status status){
        return reservationRepo.findReservationByStatusOrderByDateAsc(status);
    }

    @PutMapping("/updateReservationStatus/{status}/{id}")
    public ResponseEntity<Reservation> confirmReservation(@PathVariable Status status, @PathVariable int id, @RequestBody Reservation reservation){
        Optional<Reservation> reservationOptional = reservationRepo.findById(id);

        if (reservationOptional.isPresent()) {
            reservation.setStatus(status);
            reservationRepo.save(reservation);
            return new ResponseEntity<>(reservation,HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable int id){
        //finder brugere først
        Optional<User> userOptional = userRepo.findById(id);

        if (userOptional.isPresent()) {
            userRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);

        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



}
