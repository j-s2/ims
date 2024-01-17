package com.example.IMSBACKEND.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Embeddable //makes it to where instances of this class can be embedded in other entities
// avoids having to annotating this as an entity as well and creating multiple tables
public class Item {

    private int quantity; //amount of certain item
    private String name; //name of item

    //constructor

    //getters and setters

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
