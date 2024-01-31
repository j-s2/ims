import { useState } from "react";
import "./styles/Actions.css";
import { Dropdown, DropdownDivider } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export const Actions = () => {
  //action state variables
  const [getInventory, setGetInventory] = useState(false);
  const [deleteInventory, setDeleteInventory] = useState(false);
  const [addInventory, setAddInventory] = useState(false);
  const [updateItem, setUpdateItem] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);

  //for retrieve inventory
  const [retrieveFullDate, setRetrieveFullDate] = useState(false);
  const [retrieveMonth, setRetrieveMonth] = useState(false);

  /***  reusable ****/
  //stores response from backend for client to see, different for get methods
  const [serverResponse, setServerResponse] = useState("");
  //state variable to keep track if error was recieved
  const [errorResponse, setErrorResponse] = useState(false);
  //date state variable, can use for retrieve by month as well
  const [fullDate, setFullDate] = useState("");

  /* add inventory specific variables */
  //state variable for adding more items during add inventory action
  const [moreItems, setMoreItems] = useState(false);
  //inventory array, stores items for database
  const [inventory, setInventory] = useState([
    {
      quantity: 0,
      name: "",
    },
  ]);
  //stores inventory for an entire month, array that holds
  const [monthInv, setMonthInv] = useState([
    {
      id: 0,
      items: [
        {
          quantity: 0,
          name: "",
        },
      ],
      date: "",
    },
  ]);

  //stores information to update item
  const [newItem, setNewItem] = useState({
    itemToUpdate: "",
    newQuant: 0,
    newName: "",
  });

  //stores name of item to delete
  const [itemtoDelete, setItemToDelete] = useState("");

  /***  reusable ****/
  //sets full date variable based on user input
  const onAddFullDate = (e: any) => {
    var date = "";
    date = e.target.value;
    setFullDate(date);
  };

  //POSTS inventory to database
  const onSubmitInventory = async (inv: any, date: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/items/${date}`,
        inv
      );
      setServerResponse(response.data); //store server response
      setAddInventory(false); //set add inventory to false, action is no longer needed
      setErrorResponse(false);
      setMoreItems(false); //reset to false so that next time add inventory action occurs, no
      //input rows appear until user clicks '+' again
    } catch (error: any) {
      console.error("Error submitting inventory: ", error);
      setErrorResponse(true);

      //Check if the error has a response and contains error data
      if (error.response && error.response.data) {
        //Store the error message in state variable
        setServerResponse("ERROR: " + error.response.data);
      } else {
        //Handle unexpected errors
        setServerResponse("An unexpected error occurred.");
      }
    }
  };

  //DELETES inventory from database
  const onSubmitDelete = async (date: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/items/${date}`
      );
      setServerResponse(response.data); //store server response
      setDeleteInventory(false); //set delete inventory to false, action is no longer needed
      setErrorResponse(false); //incase previous input was an error, removes error response that is rendered
    } catch (error: any) {
      console.error("Error deleting inventory: ", error);
      setErrorResponse(true);

      //Check if the error has a response and contains error data
      if (error.response && error.response.data) {
        //Store the error message in state variable
        setServerResponse("ERROR: " + error.response.data);
      } else {
        //Handle unexpected errors
        setServerResponse("An unexpected error occurred.");
      }
    }
  };

  //GETS inventory on specific date from database
  const onSubmitRetrieveFullDate = async (date: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/items/${date}`);
      setErrorResponse(false); //if previous retrieve attempt resulted in an error, errorResponse is true so we need to reset it
      setInventory(response.data);
      setServerResponse(""); //reset here in case user inputs invalid date and then puts in a valid one
      //errorResponse is set to false but ServerResponse still has a value, so success response still outputs
    } catch (error: any) {
      console.error("Error getting inventory: ", error);
      setErrorResponse(true);

      //Check if the error has a response and contains error data
      if (error.response && error.response.data) {
        //Store the error message in state variable
        setServerResponse("ERROR: " + error.response.data);
      } else {
        //Handle unexpected errors
        setServerResponse("An unexpected error occurred.");
      }
    }
  };

  //GETS inventory across a month from database
  const onSubmitRetrieveMonth = async (date: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/items/${date}`);
      setErrorResponse(false);
      setMonthInv(response.data);
      setServerResponse(""); //reset here in case user inputs invalid date and then puts in a valid one
    } catch (error: any) {
      console.error("Error getting inventory: ", error);
      setErrorResponse(true);

      //Check if the error has a response and contains error data
      if (error.response && error.response.data) {
        //Store the error message in state variable
        setServerResponse("ERROR: " + error.response.data);
      } else {
        //Handle unexpected errors
        setServerResponse("An unexpected error occurred.");
      }
    }
  };

  //PUT METHOD, updates item on a specific date
  const onSubmitNewItemUpdate = async (date: string, newInfo: any) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/items/${date}/update`,
        newInfo
      );
      setServerResponse(response.data);
      setErrorResponse(false);
      setUpdateItem(false);
    } catch (error: any) {
      console.error("Error updating item: ", error);
      setErrorResponse(true);

      //Check if the error has a response and contains error data
      if (error.response && error.response.data) {
        //Store the error message in state variable
        //handles response if no inventory was logged on the date inputted
        if (typeof error.response.data === "object") {
          setServerResponse("ERROR: No inventory logged on " + date);
        } else {
          setServerResponse("ERROR: " + error.response.data);
        }
      } else {
        //Handle unexpected errors
        setServerResponse("An unexpected error occurred.");
      }
    }
  };

  //DELETES item on a specific date
  const onSubmitItemDelete = async (date: string, item: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/items/${date}/delete/${item}`
      );
      setServerResponse(response.data);
      setErrorResponse(false);
      setDeleteItem(false);
    } catch (error: any) {
      console.error("Error updating item: ", error);
      setErrorResponse(true);
      //Check if the error has a response and contains error data
      //handles response if no inventory was logged on the date inputted
      if (error.response && error.response.data) {
        //Store the error message in state variable
        if (typeof error.response.data === "object") {
          setServerResponse("ERROR: No inventory logged on " + date);
        } else {
          setServerResponse("ERROR: " + error.response.data);
        }
      } else {
        //Handle unexpected errors
        setServerResponse("An unexpected error occurred.");
      }
    }
  };

  /***  reusable ****/
  //sets all unneeded action variables to false and sets only the current action state variable needed to true
  const handleActions = (setStateVar: any) => {
    //reset all values to false
    setGetInventory(false);
    setDeleteInventory(false);
    setAddInventory(false);
    setUpdateItem(false);
    setDeleteItem(false);
    //reset retrieve specific variables to false, prevents date input from appearing right away after switching actions
    //only action where date input does not appear right away
    setRetrieveMonth(false);
    setRetrieveFullDate(false);
    //reset needed for switching between actions
    setInventory([
      {
        quantity: 0,
        name: "",
      },
    ]);
    //user retreives inventory for month, switches actions, then comes back to action
    setMonthInv([
      {
        id: 0,
        items: [
          {
            quantity: 0,
            name: "",
          },
        ],
        date: "",
      },
    ]);
    //reset newItem in case updateItem action is needed again
    setNewItem({
      itemToUpdate: "",
      newQuant: 0,
      newName: "",
    });
    //reset reusable variables
    setServerResponse(""); //resets response message to ensure success message dissapears from screen
    //reset inventory variable to ensure it does not stay populated for other actions
    //set needed action to true
    setStateVar(true);
  };

  //handles '+' button during add inventory action
  const handleMoreItems = () => {
    //if more than 1 item has been added, initialize empty item object in inventory array
    if (inventory[0].name != "") {
      //increasing length of inventory array
      setInventory([...inventory, { quantity: 0, name: "" }]);
    }
  };

  //handles inputs and adds to the inventory array
  const onAddItemInput = (e: any, index: number) => {
    const updatedInventory = [...inventory];
    //set itemName and itemQuantity based on input
    updatedInventory[index] = {
      ...updatedInventory[index],
      [e.target.name]: e.target.value,
    };
    //update inventory array
    setInventory(updatedInventory);
  };

  //handles inputs and adds to the newItem state variable for the update item action
  const onUpdateItemInput = (e: any) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
    console.log(newItem);
  };

  //handles inputs and adds to the itemToDelete state variable for the delete item action
  const onDeleteItemInput = (e: any) => {
    setItemToDelete(e.target.value);
  };

  return (
    <div className="body">
      <div className="actions">
        <div className="title-container">Manage your Inventory</div>
        <div className="main-actions">
          <div className="input-actions">
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-autoclose-true"
                className="dropdown-button-custom"
              >
                Choose an Action
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-custom">
                <Dropdown.Item
                  as="button"
                  onClick={() => handleActions(setGetInventory)}
                  className="dropdown-item-custom"
                >
                  Retrieve Inventory
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => handleActions(setDeleteInventory)}
                  className="dropdown-item-custom"
                >
                  Delete Inventory
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => handleActions(setAddInventory)}
                  className="dropdown-item-custom"
                >
                  Add Iventory
                </Dropdown.Item>
                <DropdownDivider />
                <Dropdown.Item
                  as="button"
                  onClick={() => handleActions(setUpdateItem)}
                  className="dropdown-item-custom"
                >
                  Update Item
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => handleActions(setDeleteItem)}
                  className="dropdown-item-custom"
                >
                  Delete Item
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            {addInventory && (
              <div className="add-inventory">
                <input
                  type="text"
                  size={28}
                  className="date-input"
                  placeholder="Date (YYYY-MM-DD)"
                  name="date"
                  onChange={(e) => onAddFullDate(e)}
                />
                <div className="add-item-button-container">
                  <button
                    className="add-item-button"
                    onClick={() => {
                      setMoreItems(true);
                      handleMoreItems();
                    }}
                  >
                    +
                  </button>
                </div>
                {moreItems && (
                  <>
                    <div className="add-items-container">
                      {inventory.map((item, index) => (
                        <div key={index} className="add-item-input-container">
                          <input
                            type="text"
                            size={14}
                            className="add-item-input"
                            placeholder="Item name"
                            name="name"
                            onChange={(e) => onAddItemInput(e, index)}
                          />
                          <input
                            type="text"
                            size={8}
                            className="add-item-input"
                            placeholder="Quantity"
                            name="quantity"
                            onChange={(e) => onAddItemInput(e, index)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="submit-button-container">
                      {/* call submit function and set addInventory to false onClick*/}
                      <button
                        className="submit-button"
                        onClick={() => onSubmitInventory(inventory, fullDate)}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
                {/* outputs error message during action */}
                {errorResponse === true && (
                  <div className="invalid-error">{serverResponse}</div>
                )}
              </div>
            )}
            {deleteInventory && (
              <div className="delete-inventory">
                <div className="delete-inventory-date">
                  <input
                    type="text"
                    size={28}
                    className="date-input"
                    placeholder="Date (YYYY-MM-DD)"
                    name="date"
                    onChange={(e) => onAddFullDate(e)}
                  />
                  <button
                    onClick={() => onSubmitDelete(fullDate)}
                    className="delete-inventory-button"
                  >
                    Delete
                  </button>
                </div>
                {/* outputs error message during action */}
                {errorResponse === true && (
                  <div className="invalid-error">{serverResponse}</div>
                )}
              </div>
            )}
            {getInventory && (
              <div className="retrieve-inventory">
                <div className="retrieve-inventory-options">
                  <button
                    onClick={() => {
                      setRetrieveFullDate(true),
                        setRetrieveMonth(false),
                        setInventory([
                          {
                            quantity: 0,
                            name: "",
                          },
                        ]),
                        setMonthInv([
                          {
                            id: 0,
                            items: [
                              {
                                quantity: 0,
                                name: "",
                              },
                            ],
                            date: "",
                          },
                        ]);
                      setServerResponse("");
                    }}
                    className="retrieve-inventory-options-buttons"
                  >
                    Inventory for day
                  </button>
                  <button
                    onClick={() => {
                      setRetrieveFullDate(false),
                        setRetrieveMonth(true),
                        setInventory([
                          {
                            quantity: 0,
                            name: "",
                          },
                        ]);
                      setServerResponse("");
                    }}
                    className="retrieve-inventory-options-buttons"
                  >
                    Inventory for month
                  </button>
                </div>
                {retrieveFullDate === true && (
                  <div className="retrieve-inventory-day">
                    <div className="retrieve-inventory-day-input">
                      <input
                        type="text"
                        size={28}
                        className="date-input"
                        placeholder="Date (YYYY-MM-DD)"
                        name="date"
                        onChange={(e) => onAddFullDate(e)}
                      />
                      <button
                        onClick={() => {
                          onSubmitRetrieveFullDate(fullDate);
                        }}
                        className="retrieve-button"
                      >
                        Retrieve
                      </button>
                    </div>
                    {inventory[0].name !== "" && (
                      <div className="retrieve-day-items">
                        {inventory.map((item, index) => (
                          <div key={index} className="retrieve-day-item">
                            <span style={{ fontWeight: "bold" }}>NAME </span>
                            <div>{item.name}</div>
                            <span style={{ fontWeight: "bold" }}>
                              QUANTITY{" "}
                            </span>
                            <div>{item.quantity}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* outputs error message during action */}
                    {errorResponse === true && (
                      <div className="invalid-error">{serverResponse}</div>
                    )}
                  </div>
                )}
                {retrieveMonth === true && (
                  <div className="retrieve-inventory-day">
                    <div className="retrieve-inventory-day-input">
                      <input
                        type="text"
                        size={28}
                        className="date-input"
                        placeholder="Date (YYYY/M)"
                        name="date"
                        onChange={(e) => onAddFullDate(e)}
                      />
                      <button
                        onClick={() => {
                          onSubmitRetrieveMonth(fullDate);
                        }}
                        className="retrieve-button"
                      >
                        Retrieve
                      </button>
                    </div>
                    {monthInv[0].date !== "" && (
                      <Dropdown>
                        <Dropdown.Toggle
                          id="dropdown-autoclose-true"
                          className="retrieve-month-button-custom"
                        >
                          Choose a date
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="retrieve-month-menu-custom">
                          {monthInv.map((arr, index) => (
                            <Dropdown.Item
                              as="button"
                              onClick={() => {
                                setInventory(arr.items);
                              }}
                              className="retrieve-month-date-custom"
                              key={index}
                            >
                              {arr.date}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                    {inventory[0].name !== "" && (
                      <div className="retrieve-day-items">
                        {inventory.map((item, index) => (
                          <div key={index} className="retrieve-day-item">
                            <span style={{ fontWeight: "bold" }}>NAME </span>
                            <div>{item.name}</div>
                            <span style={{ fontWeight: "bold" }}>
                              QUANTITY{" "}
                            </span>
                            <div>{item.quantity}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* outputs error message during action */}
                    {errorResponse === true && (
                      <div className="invalid-error">{serverResponse}</div>
                    )}
                  </div>
                )}
              </div>
            )}
            {updateItem && (
              <div className="update-item-main-container">
                <input
                  type="text"
                  size={28}
                  className="date-input"
                  placeholder="Item Log Date (YYYY-MM-DD)"
                  name="date"
                  onChange={(e) => onAddFullDate(e)}
                />
                <input
                  type="text"
                  size={20}
                  className="add-item-input"
                  placeholder="Name of item to update"
                  name="itemToUpdate"
                  onChange={onUpdateItemInput}
                />
                <div style={{ fontSize: "15px" }}>
                  *NOTE: Enter same name or quantity if no change is needed for
                  that field.{" "}
                </div>
                <div className="update-item-newInfo">
                  <input
                    type="text"
                    size={12}
                    className="add-item-input"
                    placeholder="New item name"
                    name="newName"
                    onChange={onUpdateItemInput}
                  />
                  <input
                    type="text"
                    size={9}
                    className="add-item-input"
                    placeholder="New quantity"
                    name="newQuant"
                    onChange={onUpdateItemInput}
                  />
                </div>
                <button
                  className="update-item-button"
                  onClick={() => onSubmitNewItemUpdate(fullDate, newItem)}
                >
                  Update Item
                </button>
                {errorResponse === true && (
                  <div className="invalid-error">{serverResponse}</div>
                )}
              </div>
            )}
            {deleteItem && (
              <div className="delete-item-main-container">
                <input
                  type="text"
                  size={28}
                  className="date-input"
                  placeholder="Item Log Date (YYYY-MM-DD)"
                  name="date"
                  onChange={(e) => onAddFullDate(e)}
                />
                <input
                  type="text"
                  size={15}
                  className="add-item-input"
                  placeholder="Name of item"
                  name="item"
                  onChange={onDeleteItemInput}
                />
                <button
                  className="delete-item-button"
                  onClick={() => onSubmitItemDelete(fullDate, itemtoDelete)}
                >
                  Delete Item
                </button>
                {errorResponse === true && (
                  <div className="invalid-error">{serverResponse}</div>
                )}
              </div>
            )}
          </div>
          {/* returns successful response after action, for non Get methods*/}
          {errorResponse === false && serverResponse.length > 1 && (
            <div className="success-response">{serverResponse}</div>
          )}
        </div>
        {/* <div className="arrow-actions">Arrow Icon</div> */}
      </div>
    </div>
  );
};
