package com.example.IMSBACKEND.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
@Entity
public class Items {

    @GeneratedValue
    @Id
    private Long id;


    @ElementCollection //specify a collection of embedded types
    //this means "Item" objects are fully owned by "Items" entity.
    private List<Item> items; //inventory at this date
    private LocalDate date; //Items.setDate(LocalDate.of(2023,12, 31));

    //getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
