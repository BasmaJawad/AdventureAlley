package com.example.adventurealley.model;

import com.example.adventurealley.model.Enums.Status;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reservationID;
    // private String email;
    // private int activityId;
    private String date;

    private int participants;
    private Status status;
    private double price;

    @ManyToOne
    @JoinColumn(name = "customerEmail", referencedColumnName = "email")
    //name = navn foreign key || referencedColumnName = det den rigtig hedder
    // refererer til customer Email fordi den har en attribut = email
    private Customer customer;
    @ManyToOne
    @JoinColumn(name = "activityID", referencedColumnName = "id")
    private Activity activity;


}
