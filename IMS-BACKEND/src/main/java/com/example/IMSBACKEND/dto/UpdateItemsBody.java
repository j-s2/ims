package com.example.IMSBACKEND.dto;

//DTO class for updating item information
public class UpdateItemsBody {

    private String itemToUpdate;
    private int newQuant;
    private String newName;

    public String getItemToUpdate() {
        return itemToUpdate;
    }

    public void setItemToUpdate(String itemToUpdate) {
        this.itemToUpdate = itemToUpdate;
    }

    public int getNewQuant() {
        return newQuant;
    }

    public void setNewQuant(int newQuant) {
        this.newQuant = newQuant;
    }

    public String getNewName() {
        return newName;
    }

    public void setNewName(String newName) {
        this.newName = newName;
    }
}
