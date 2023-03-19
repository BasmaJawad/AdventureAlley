package com.example.adventurealley.controller;


import com.example.adventurealley.model.Customer;
import com.example.adventurealley.model.User;
import com.example.adventurealley.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/user/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username){
        //userService.getUser();
        return null;
    }




}
