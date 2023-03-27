package com.example.adventurealley.controller;

import com.example.adventurealley.model.Enums.EquipType;
import com.example.adventurealley.model.Enums.Status;

import com.example.adventurealley.model.Equipment;
import com.example.adventurealley.model.Reservation;
import com.example.adventurealley.model.User;

import com.example.adventurealley.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin // Jeg skal kunne tilgå min restcontroller gennem noget andet. I dette tilfælde javascript
public class UserRESTcontroller {

    @Autowired
    UserService userService;

    @GetMapping("/user")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping ("/UserLogin")
    public List<User> allUserTest(){
        return userService.getUsers();
    }

    @PostMapping("/Admin") //saver new user
    @ResponseStatus(HttpStatus.CREATED)
    public User postUser(@RequestBody User user) {
        return userService.postuser(user);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User user){

        return userService.updateUser(id, user);
    }


    @GetMapping("/reservationsByStatus/{status}")
    public List<Reservation> getReservationsByStatus(@PathVariable Status status){
        return userService.getReservationsByStatus(status);
    }

    @PutMapping("/updateReservationStatus/{status}/{id}")
    public ResponseEntity<Reservation> confirmReservation(@PathVariable Status status, @PathVariable int id, @RequestBody Reservation reservation){
      return userService.confirmReservation(status, id, reservation);

    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable int id){
     return userService.deleteUser(id);
    }


    @GetMapping("/udstyrByEquipType/{equiptype}")
        public List<Equipment> getEquipmentByStatus(@PathVariable EquipType equiptype){
        return userService.getEquipmentType(equiptype);
    }



}
