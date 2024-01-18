package com.example.IMSBACKEND.controller;

import com.example.IMSBACKEND.dto.UpdateItemsBody;
import com.example.IMSBACKEND.exception.DateNotValidException;
import com.example.IMSBACKEND.exception.ItemNotFoundException;
import com.example.IMSBACKEND.exception.NoListFoundException;
import com.example.IMSBACKEND.model.Item;
import com.example.IMSBACKEND.model.Items;
import com.example.IMSBACKEND.service.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DateTimeException;
import java.time.YearMonth;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;

@RestController
@RequestMapping("/items")
public class ItemsController {
    private final ItemsService itemsService;

    @Autowired
    public ItemsController(ItemsService itemsService){
        this.itemsService = itemsService;
    }


    /**alter void type declaration to provide response to client**/

    @PostMapping(path = "{date}")
    public ResponseEntity<String> addItems(@RequestBody List<Item> items,
                         @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)String date
                         ){
        /** check if date is valid **/

        LocalDate parsedDate;

        //check if date recieved is in correct format and valid
        try{
            parsedDate = LocalDate.parse(date);
            LocalDate.of(parsedDate.getYear(), parsedDate.getMonth(), parsedDate.getDayOfMonth());
        }catch (DateTimeParseException e) {
            throw new DateNotValidException(date);
        }

        //create new Items object
        Items newAdd = new Items();

        //set properties
        newAdd.setItems(items);
        newAdd.setDate(parsedDate);

        //add to db
        int response = itemsService.addItemsList(newAdd);
        //return response to client based on success of action
        if(response == 1){
            return new ResponseEntity<>("Items have been successfully logged for " + date + ".", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Items were not logged.", HttpStatus.BAD_REQUEST);
        }
    }


    //delete item list by full date
    @DeleteMapping(path = "{date}")
    public ResponseEntity<String> deleteItems(@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)String date){

        /** check if date is valid **/

        LocalDate parsedDate;

        //check if date recieved is in correct format and valid
        try{
            parsedDate = LocalDate.parse(date);
            LocalDate.of(parsedDate.getYear(), parsedDate.getMonth(), parsedDate.getDayOfMonth());
        }catch (DateTimeParseException e) {
            throw new DateNotValidException(date);
        }

        try{
            itemsService.deleteItemsByDate(parsedDate);
            return new ResponseEntity<>("Items logged on " + parsedDate + " have been deleted.", HttpStatus.OK);
        }catch(NoListFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }


    //get item list by full date
    @GetMapping(path = "{date}")
    public List<Item> getAllByFullDate(@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)String date){

        /** check if date is valid **/

        LocalDate parsedDate;

        //check if date recieved is in correct format and valid
        try{
            parsedDate = LocalDate.parse(date);
        }catch (DateTimeParseException e) {
            throw new DateNotValidException(date);
        }

        List<Items> retrievedItems = itemsService.getItemsByFullDate(parsedDate);

        return retrievedItems.get(0).getItems();
    }

    //get all item lists in a month
    @GetMapping(path = "{year}/{month}")
    public List<Items> getAllByMonth(
            @PathVariable("year") int year,
            @PathVariable("month") int month
    ){
        /** check if date is valid **/

        if(month > 12 || month < 1){
            throw new DateNotValidException(year + "/" + month);
        }

        //grab all dates in month
        LocalDate StartDate;

        //check if date recieved is in correct format and valid
        try{
            StartDate = LocalDate.of(year, month, 1);
        }catch(DateTimeParseException e){
            throw new DateNotValidException(year + "/" + month);
        }


        //no need to check if this is valid because of above check
        LocalDate EndDate = StartDate.with(lastDayOfMonth());


        //return inventory for that month
        return itemsService.getItemsByMonthYear(StartDate, EndDate);
    }

    //update item in a list by full date, identified by name
    @PutMapping(path = "{date}/update")
    public ResponseEntity<String> updateItemByName(
            @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)String date,
            @RequestBody UpdateItemsBody updateItemsBody
            ){
        /** check if date is valid **/


        LocalDate parsedDate;

        //check if date recieved is in correct format and valid
        try{
            parsedDate = LocalDate.parse(date);
            LocalDate.of(parsedDate.getYear(), parsedDate.getMonth(), parsedDate.getDayOfMonth());
        }catch (DateTimeParseException e) {
            throw new DateNotValidException(date);
        }

        //create new item object
        Item newItem = new Item();

        //if no name change or quantity change is needed
        if(updateItemsBody.getNewName().isEmpty())
        {
            updateItemsBody.setNewName("");
        }
        if(updateItemsBody.getNewQuant() <= 0){
            updateItemsBody.setNewQuant(0);
        }

        newItem.setName(updateItemsBody.getNewName());
        newItem.setQuantity(updateItemsBody.getNewQuant());

        try{
            itemsService.updateByName(parsedDate, newItem, updateItemsBody.getItemToUpdate());
            return new ResponseEntity<>("Item has been updated successfully.", HttpStatus.OK);
        }catch (ItemNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    //delete item in a list by full date, identified by name

    @DeleteMapping(path = "{date}/delete/{itemName}")
    public ResponseEntity<String> deleteItemByName(
            @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)String date,
            @PathVariable("itemName") String itemName
    ){

        /** Check if date is valid **/

        LocalDate parsedDate;

        //check if date recieved is in correct format and valid
        try{
            parsedDate = LocalDate.parse(date);
            LocalDate.of(parsedDate.getYear(), parsedDate.getMonth(), parsedDate.getDayOfMonth());
        }catch (DateTimeParseException e) {
            throw new DateNotValidException(date);
        }

        //delete item
        try {
            itemsService.deleteByName(parsedDate, itemName);
            //return response to client based on success of action
            return new ResponseEntity<>("Item '" + itemName + "' has been deleted from " + parsedDate + " log.", HttpStatus.OK);
        }catch(ItemNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }

    }

}
