import React, { useState } from 'react'
import './styles/Actions.css'
import { Dropdown, DropdownDivider } from 'react-bootstrap'
import { DropdownButton, DropdownProps} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


export const Actions = () => {

  //action state variables
  const [getInventory, setGetInventory] = useState(false);
  const [deleteInventory, setDeleteInventory] = useState(false);
  const [addInventory, setAddInventory] = useState(false);
  const [updateItem, setUpdateItem] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);


  return (
  <div className='body'>
    <div className='actions'>
      <div className='main-actions'>
          <div className='input-actions'>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-autoclose-true" className="dropdown-button-custom">Choose an Action</Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-custom">
                  <Dropdown.Item as="button" onClick={() => setGetInventory(true)} className="dropdown-item-custom">Retrieve Inventory</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={() => setDeleteInventory(true)} className="dropdown-item-custom">Delete Inventory</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={() => setAddInventory(true)} className="dropdown-item-custom">Add Iventory</Dropdown.Item>
                  <DropdownDivider/>
                  <Dropdown.Item as="button" onClick={() => setUpdateItem(true)} className="dropdown-item-custom">Update Item</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={() => setDeleteItem(true)} className="dropdown-item-custom">Delete Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          </div>
          <div>
            Check action state variables here, render based on value.
          </div>
      </div>
      <div className='arrow-actions'>Arrow Icon</div>
    </div>
  </div>
  )
}
