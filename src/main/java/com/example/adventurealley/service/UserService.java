package com.example.adventurealley.service;


import com.example.adventurealley.model.Enums.EquipType;
import com.example.adventurealley.model.Enums.Status;
import com.example.adventurealley.model.Enums.UserType;
import com.example.adventurealley.model.Equipment;
import com.example.adventurealley.model.Reservation;
import com.example.adventurealley.model.User;
import com.example.adventurealley.repository.EquipmentRepo;
import com.example.adventurealley.repository.ReservationRepo;
import com.example.adventurealley.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    ReservationRepo reservationRepo;

    @Autowired
    EquipmentRepo equipmentRepo;

    public List<User> getUsers() {
        return userRepo.findAll();
    }

    public User postuser(@RequestBody User user) {
        user.setUsertype(UserType.EMPLOYEE);
        return userRepo.save(user);
    }

    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User user) {
        Optional<User> userOptional = userRepo.findById(id);

        if (userOptional.isPresent()) {
            System.out.println(user);
            userRepo.save(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    public List<Reservation> getReservationsByStatus(@PathVariable Status status){
        return reservationRepo.findReservationByStatusOrderByDateAsc(status);
    }

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

    public List<Equipment> getEquipmentType(@PathVariable EquipType equiptype){
        return equipmentRepo.findEquipmentByEquipType(equiptype);
    }

    public List<Reservation> getReservations(){
        return reservationRepo.findAll();
    }


    public List<Reservation> getReservationsByMonth(String year, String month){
        return reservationRepo.findByMonth(year, month);
    }

}

