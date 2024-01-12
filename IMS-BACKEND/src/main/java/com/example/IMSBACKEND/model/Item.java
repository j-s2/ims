package com.example.IMSBACKEND.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class Item {

    @GeneratedValue
    @Id
    private Long id;
    private int quantity; //amount of certain item
    private String name; //name of item

    //constructor
    public Item(Long id, int quantity, String name) {
        this.id = id;
        this.quantity = quantity;
        this.name = name;
    }

    //getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
