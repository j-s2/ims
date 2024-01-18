package com.example.IMSBACKEND.service;

import com.example.IMSBACKEND.dao.ItemsRepo;
import com.example.IMSBACKEND.exception.ItemNotFoundException;
import com.example.IMSBACKEND.exception.NoListFoundException;
import com.example.IMSBACKEND.exception.NoListFoundMonthYearException;
import com.example.IMSBACKEND.model.Item;
import com.example.IMSBACKEND.model.Items;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Iterator;
import java.util.List;

@Service
public class ItemsService {
    private final ItemsRepo itemsRepo;

    @Autowired
    public ItemsService(ItemsRepo itemsRepo){
        this.itemsRepo = itemsRepo;
    }

    public int addItemsList(Items items){
        itemsRepo.save(items);

        return 1;
    }

    @Transactional
    public void deleteItemsByDate(LocalDate dateStart){

        //retrieve list at date
        List<Items> deleted = itemsRepo.findByDateBetween(dateStart, dateStart);

        if(deleted.isEmpty()){
            //throw NoListFound() exception
            throw new NoListFoundException(dateStart);
        }


        //delete list by id
        itemsRepo.deleteListById(deleted.get(0).getId());

    }

    public List<Items> getItemsByFullDate(LocalDate dateStart){
        List<Items> foundItems = itemsRepo.findByDateBetween(dateStart, dateStart);

        if(foundItems.isEmpty()){
            //throw NoListFound() exception
            throw new NoListFoundException(dateStart);
        }
        //pass in same date, retrieve items at date
        return foundItems;
    }

    public List<Items> getItemsByMonthYear(LocalDate First, LocalDate Last){
        List<Items> foundItems = itemsRepo.findByDateBetween(First, Last);

        if(foundItems.isEmpty()){
            //throw NoListFound() exception
            throw new NoListFoundMonthYearException(First.getMonth().getValue(), First.getYear());
        }
        //pass in same date, retrieve items at date
        return foundItems;
    }

    public void updateByName(LocalDate date, Item newInfo, String nameId){
        Item returnItem = new Item();
        returnItem.setQuantity(0);
        returnItem.setName("");

        List<Items> listToUpdate = itemsRepo.findByDateBetween(date, date);
        //loop through list of items
        listToUpdate.get(0).getItems().forEach(item -> {
            //if item name matches
            if(item.getName().equals(nameId)){

                //if updated info exists, set new info, otherwise, keep it as old info
                if(!newInfo.getName().isEmpty()){
                    item.setName(newInfo.getName());
                }
                else{
                    item.setName(item.getName());
                }

                if(newInfo.getQuantity() > 0){
                    item.setQuantity(newInfo.getQuantity());
                }
                else{
                    item.setQuantity(item.getQuantity());
                }

                returnItem.setName(item.getName());
                returnItem.setQuantity(item.getQuantity());
            }
        });

        //if item does not exist or list in general does not exist
        if(returnItem.getName().isEmpty() && returnItem.getQuantity() == 0){
            throw new ItemNotFoundException(date, nameId);
        }

        //update list with new information
        itemsRepo.saveAll(listToUpdate);
    }


    public void deleteByName(LocalDate dateStart, String itemToDelete){

        boolean itemExists = false;

        List<Items> listToUpdate = itemsRepo.findByDateBetween(dateStart, dateStart);

        //loop through list of items
        for(Items items : listToUpdate){
            //loop through items in the current Items object
            Iterator<Item> it = items.getItems().iterator();
            //while more elements exist in list of Item objects
            while(it.hasNext()){
                Item item = it.next(); //grab next Item object in iteration
                //if name matches, found item to delete
                if(item.getName().equals(itemToDelete)){
                    it.remove(); //remove from list
                    itemExists = true;
                    break;
                }
            }
        }

        if(!itemExists){
            throw new ItemNotFoundException(dateStart, itemToDelete);
        }

        //update list with new information
        itemsRepo.saveAll(listToUpdate);

    }


}
