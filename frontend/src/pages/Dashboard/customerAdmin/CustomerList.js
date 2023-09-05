import React from 'react'
import UserList from '../UserList/Table'
const CustomersList = () => {
  return (
    <div>
        display list of Customers
        click any one customer to view their user list
        <UserList customer_id={2}></UserList>
    </div>
  )
}

export default CustomersList