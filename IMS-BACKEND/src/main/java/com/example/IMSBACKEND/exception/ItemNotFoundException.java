package com.example.IMSBACKEND.exception;

import com.example.IMSBACKEND.model.Item;

import java.time.LocalDate;

public class ItemNotFoundException extends RuntimeException{
    public ItemNotFoundException(LocalDate date, String itemName){
        super("Item '" + itemName + "' could not be found logged on " + date + ".");
    }
}
