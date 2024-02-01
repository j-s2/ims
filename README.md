# Inventory Management System

This application utilizes a combination of **Spring Boot, MySQL, and React** to add, retrieve, and delete inventory as well as update and 
delete the items that make up the inventory added on a date. 

On opening the inventory management system, users are able to choose from the multiple actions available:

![Alt Text](/imgs/Actions.png?raw=true "Home")

## Adding Inventory

![Alt text](/imgs/Add.png?raw=true "Add Inventory")

When initiating the 'Add Inventory' action, users are prompted to enter the date on which the inventory was logged. 
Upon entering the date, users can proceed by clicking the '+' button to input the item name and quantity.

Once the 'Submit' button is clicked, the inventory is stored inside of the MySQL database. 

## Retrieving Inventory

![Alt text](/imgs/Retrieve1.png?raw=true "Retrieve Inventory")

The 'Retrieve Inventory' action first renders an option for retrieving from a specific day or across a month.

If the user selects a specific day, they will need to enter the date for which they wish to retrieve inventory. 
Once the date is entered, clicking the 'retrieve' button will display the inventory for that day.

![Alt text](/imgs/Retrieve2.png?raw=true "Retrieve Day")

Alternatively, if the user chooses to retrieve inventory for a certain month, they will need to enter 
the month and they will be presented with a list of days on which inventory was logged during that month. 
Selecting a day from the list will display the inventory recorded for that particular day.

![Alt text](/imgs/Retrieve3.png?raw=true "Retrieve Month")

## Deleting Inventory

![Alt text](/imgs/Delete.png?raw=true "Delete Inventory")

The 'Delete Inventory' action prompts users to specify the date of the inventory they want to remove from the database. The
'Delete' button removes the inventory from the MySQL database.

## Updating Items

![Alt text](/imgs/Update.png?raw=true "Updating Items")

When selecting the 'Update Item' option, users are required to enter the date the item was originally logged, its current name in the database, 
and the updated name and quantity they wish to apply. This new information is applied on to the database once the 'Update Item'
button is clicked. 

## Deleting Items

![Alt text](/imgs/DeleteItem.png?raw=true "Deleting Items")

The 'Delete Item' option requires users to enter the date the item was logged and its name. 
Upon clicking the 'Delete Item' button, the specified item will be removed from the inventory recorded on that date.
