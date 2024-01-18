package com.example.IMSBACKEND.dao;

import com.example.IMSBACKEND.model.Item;
import com.example.IMSBACKEND.model.Items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ItemsRepo extends JpaRepository<Items, Long> {

    //returns inventory for a particular date range
    List<Items> findByDateBetween(LocalDate dateStart, LocalDate dateEnd);

    //deletes inventory by id
    @Modifying
    @Query("DELETE FROM Items i WHERE i.id = :listId")
    void deleteListById(@Param("listId") Long listId);

}
