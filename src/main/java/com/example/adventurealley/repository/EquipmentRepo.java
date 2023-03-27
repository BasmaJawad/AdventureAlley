package com.example.adventurealley.repository;


import com.example.adventurealley.model.Enums.EquipType;
import com.example.adventurealley.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepo extends JpaRepository<Equipment, Integer> {
  List<Equipment> findEquipmentByEquipType(EquipType equiptype);


}
