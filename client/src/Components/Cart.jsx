import React, { useEffect, useState } from 'react'

import Breadcrum from "./Breadcrum"

import { deleteCart, getCart, updateCart } from '../Store/ActionCreators/CartActionCreators'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
export default function Cart() {
    let [carts, setCarts] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)

    let dispatch = useDispatch()
    let CartStateData = useSelector((state) => state.CartStateData)

    function updateItem(_id, option) {
        let item = carts.find((x) => x._id === _id)
        if (option === "DEC" && item.qty === 1)
            return
        else if (option === "DEC") {
            item.qty = item.qty - 1
            item.total = item.total - item.product.finalprice
        }
        else if (item.qty < item.product.quantity) {
            item.qty = item.qty + 1
            item.total = item.total + item.product.finalprice
        }
        dispatch(updateCart({ ...item }))
        let subtotal = 0
        let shipping = 0
        let total = 0
        for (let item of carts) {
            subtotal = subtotal + item.total
        }
        if (subtotal > 0 && subtotal < 1000)
            shipping = 150

        total = subtotal + shipping

        setSubtotal(subtotal)
        setShipping(shipping)
        setTotal(total)
    }

    function deleteItem(_id) {
        if (window.confirm("Are You Sure to Remove that Item from Cart")) {
            dispatch(deleteCart({ _id: _id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getCart())
        if (CartStateData.length) {
            let data = CartStateData
            let subtotal = 0
            let shipping = 0
            let total = 0
            for (let item of data) {
                subtotal = subtotal + item.total
            }
            if (subtotal > 0 && subtotal < 1000)
                shipping = 150

            total = subtotal + shipping

            setSubtotal(subtotal)
            setShipping(shipping)
            setTotal(total)
            setCarts(data)
        }
        else {
            setSubtotal(0)
            setShipping(0)
            setTotal(0)
            setCarts([])
        }
    }
    useEffect(() => {
        getAPIData()
    }, [CartStateData.length])
    return (
        <>
            <Breadcrum title="Cart" />

            <div className="container-fluid my-3">
                <h5 className='bg-primary text-center p-2 text-light'>Cart Items</h5>
                {
                    carts.length ?
                        <>
                            <div className="table-responsive">
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Brand</th>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th>Price</th>
                                            <th></th>
                                            <th className='text-center'>Qty</th>
                                            <th></th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            carts.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>
                                                        {
                                                            <a href={`/${item.product?.pic[0]}`} target='_blank'>
                                                                <img src={`/${item.product?.pic[0]}`} height={50} width={50} alt="" className='rounded' />
                                                            </a>
                                                        }
                                                    </td>
                                                    <td>{item.product?.name}</td>
                                                    <td>{item.product?.brand?.name}</td>
                                                    <td>{item.product?.color}</td>
                                                    <td>{item.product?.size}</td>
                                                    <td>&#8377;{item.product?.finalprice}</td>
                                                    <td className='text-center'><button className="btn btn-primary" onClick={() => updateItem(item._id, "DEC")}><i className='fa fa-minus'></i></button></td>
                                                    <td className='text-center'>{item.qty}</td>
                                                    <td className='text-center'><button className="btn btn-primary" onClick={() => updateItem(item._id, "INC")}><i className='fa fa-plus'></i></button></td>
                                                    <td>&#8377;{item.total}</td>
                                                    <td className='text-center'><button className="btn btn-danger" onClick={() => deleteItem(item._id)}><i className='fa fa-close'></i></button></td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-md-6"></div>
                                <div className="col-md-6">
                                    <table className='table table-bordered'>
                                        <tbody>
                                            <tr>
                                                <th>SubTotal</th>
                                                <td>&#8377;{subtotal}</td>
                                            </tr>
                                            <tr>
                                                <th>Shipping</th>
                                                <td>&#8377;{shipping}</td>
                                            </tr>
                                            <tr>
                                                <th>Total</th>
                                                <td>&#8377;{total}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}><Link to="/checkout" className='btn btn-primary w-100'>Proceed To Checkout</Link></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </> :
                        <div className='text-center'>
                            <h4>No Items in Cart</h4>
                            <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
                        </div>
                }
            </div>
        </>
    )
}
