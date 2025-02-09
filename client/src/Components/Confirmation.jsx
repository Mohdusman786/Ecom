import React from 'react'

import Breadcrum from "./Breadcrum"
import { Link } from 'react-router-dom'
export default function Confirmation() {
  return (
    <>
        <Breadcrum title="Order Confirmation"/>

        <div className='text-center my-5'>
            <h3>Thank You</h3>
            <h4>You Can Track Your Ordered in Profile Section</h4>
            <Link to="/shop" className="btn btn-primary">Shop More</Link>
        </div>
    </>
  )
}
