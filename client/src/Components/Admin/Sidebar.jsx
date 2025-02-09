import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <>
            <div className="list-group">
                <Link to="/admin" className="list-group-item list-group-item-action active" aria-current="true">
                    Admin Home
                </Link>
                <Link to="/admin/user" className="list-group-item list-group-item-action"><i className='fa fa-users text-primary'></i><span className='float-end text-primary'>Users</span></Link>
                <Link to="/admin/maincategory" className="list-group-item list-group-item-action"><i className='fa fa-list text-primary'></i><span className='float-end text-primary'>Maincategory</span></Link>
                <Link to="/admin/subcategory" className="list-group-item list-group-item-action"><i className='fa fa-list text-primary'></i><span className='float-end text-primary'>Subcategory</span></Link>
                <Link to="/admin/brand" className="list-group-item list-group-item-action"><i className='fa fa-tag text-primary'></i><span className='float-end text-primary'>Brand</span></Link>
                <Link to="/admin/product" className="list-group-item list-group-item-action"><i className='fa fa-product-hunt text-primary'></i><span className='float-end text-primary'>Product</span></Link>
                <Link to="/admin/testimonial" className="list-group-item list-group-item-action"><i className='fa fa-star text-primary'></i><span className='float-end text-primary'>Testimonial</span></Link>
                <Link to="/admin/newsletter" className="list-group-item list-group-item-action"><i className='fa fa-envelope text-primary'></i><span className='float-end text-primary'>Newsletter</span></Link>
                <Link to="/admin/contact-us" className="list-group-item list-group-item-action"><i className='fa fa-phone text-primary'></i><span className='float-end text-primary'>Contactus</span></Link>
                <Link to="/admin/checkout" className="list-group-item list-group-item-action"><i className='fa fa-shopping-bag text-primary'></i><span className='float-end text-primary'>Checkouts</span></Link>
            </div>
        </>
    )
}
