import React, { useEffect, useState } from 'react'

import Breadcrum from "./Breadcrum"
import { Link, useNavigate } from 'react-router-dom'
import ProfileTable from './ProfileTable'
import { useDispatch, useSelector } from 'react-redux'

import { deleteCart, getCart } from '../Store/ActionCreators/CartActionCreators'
import { getProduct,  updateProductQuantity } from '../Store/ActionCreators/ProductActionCreators'
import { addCheckout } from '../Store/ActionCreators/CheckoutActionCreators'
export default function Checkout() {
    let [user, setUser] = useState({})
    let [carts, setCarts] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)
    let [mode, setMode] = useState("COD")

    let dispatch = useDispatch()
    let CartStateData = useSelector((state) => state.CartStateData)
    let ProductStateData = useSelector((state) => state.ProductStateData)

    let navigate = useNavigate()

    function placeOrder() {
        let item = {
            user: localStorage.getItem("userid"),
            orderStatus: "Order is Placed",
            paymentStatus: "Pending",
            paymentMode: "COD",
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            date: new Date(),
            products: carts.map((item) => {
                return {
                    product: item.product._id,
                    qty: item.qty,
                    total: item.total
                }
            })
        }
        dispatch(addCheckout(item))
        for (let item of carts) {
            let p = ProductStateData.find((x) => x._id === item.product._id)
            p.quantity = p.quantity - item.qty

            dispatch(updateProductQuantity({ _id: p._id, quantity: p.quantity }))
            dispatch(deleteCart({ _id: item._id }))
        }
        if (mode === "COD")
            navigate("/confirmation")
          else
            navigate("/payment/-1")
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

    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])

    useEffect(() => {
        (async () => {
            let response = await fetch("/api/user/" + localStorage.getItem("userid"), {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                }
            })
            response = await response.json()
            if (response.result === "Done")
                setUser(response.data)
            else
                navigate("/login")
        })()
    })
    return (
        <>
            <Breadcrum title="Checkout" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-6">
                        <h5 className='bg-primary text-center p-2 text-light'>Billing & Shipping Address</h5>
                        <ProfileTable user={user} />
                    </div>
                    <div className="col-md-6">
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
                                                    <th className='text-center'>Qty</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    carts.map((item, index) => {
                                                        return <tr key={index}>
                                                            <td>
                                                                <a href={`/${item.product.pic[0]}`} target='_blank'>
                                                                    <img src={`/${item.product.pic[0]}`} height={50} width={50} alt="" className='rounded' />
                                                                </a>
                                                            </td>
                                                            <td>{item.product.name}</td>
                                                            <td>{item.product.brand.name}</td>
                                                            <td>{item.product.color}</td>
                                                            <td>{item.product.size}</td>
                                                            <td>&#8377;{item.price}</td>
                                                            <td className='text-center'>{item.qty}</td>
                                                            <td>&#8377;{item.total}</td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
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
                                                <th>Payment Mode</th>
                                                <td>
                                                    <select name="mode" onChange={(e) => setMode(e.target.value)} className='form-select'>
                                                        <option>COD</option>
                                                        <option>Net Banking</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}><button className='btn btn-primary w-100' onClick={placeOrder}>Place Order</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </> :
                                <div className='text-center'>
                                    <h4>No Items in Cart</h4>
                                    <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
