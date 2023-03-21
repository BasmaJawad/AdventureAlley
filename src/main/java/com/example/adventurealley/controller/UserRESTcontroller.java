package com.example.adventurealley.controller;


import com.example.adventurealley.model.Enums.UserType;
import com.example.adventurealley.model.User;
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




}
