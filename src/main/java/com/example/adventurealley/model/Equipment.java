package com.example.adventurealley.model;

import com.example.adventurealley.model.Enums.EquipType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class Equipment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int equipmentID;

  private EquipType equiptype;

  private int amount;






}
