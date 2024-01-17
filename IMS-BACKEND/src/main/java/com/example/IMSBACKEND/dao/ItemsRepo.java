package com.example.IMSBACKEND.dao;

import com.example.IMSBACKEND.model.Items;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ItemsRepo extends JpaRepository<Items, Long> {
    List<Items> findByDateBetween(LocalDate dateStart, LocalDate dateEnd);
}
