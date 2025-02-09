import React, { useEffect, useState } from 'react'

import Breadcrum from "./Breadcrum"
import { Link, useNavigate } from 'react-router-dom'

import { deleteWishlist, getWishlist } from "../Store/ActionCreators/WishlistActionCreators"
import { getCheckout } from "../Store/ActionCreators/CheckoutActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import ProfileTable from './ProfileTable'
export default function Profile() {
    let [user, setUser] = useState({})
    let [wishlist, setWishlist] = useState([])
    let [checkout, setCheckout] = useState([])
    let navigate = useNavigate()

    let dispatch = useDispatch()
    let WishlistStateData = useSelector((state) => state.WishlistStateData)
    let CheckoutStateData = useSelector((state) => state.CheckoutStateData)

    function deleteItem(_id, option) {
        if (!option && window.confirm("Are You Sure to Remove that Item from Wishlist")) {
            dispatch(deleteWishlist({ _id: _id }))
            getAPIData()
        }
        else {
            dispatch(deleteWishlist({ _id: _id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getWishlist())
        if (WishlistStateData.length)
            setWishlist(WishlistStateData)
        else
            setWishlist([])
    }
    useEffect(() => {
        getAPIData()
    }, [WishlistStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getCheckout())
            if (CheckoutStateData.length)
                setCheckout(CheckoutStateData)
            else
                setCheckout([])
        })()
    }, [CheckoutStateData.length])

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
            else {
                localStorage.removeItem("login")
                localStorage.removeItem("name")
                localStorage.removeItem("username")
                localStorage.removeItem("userid")
                alert(response.reason + "\nPlease Login")
                navigate("/login")
            }
        })()
    }, [])
    return (
        <>
            <Breadcrum title="Buyer Profile" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-6">
                        {
                            user.pic ?
                                <img src={`${user.pic}`} height={430} width="100%" /> :
                                <img src={`/img/noimage.png`} height={430} width="100%" />
                        }
                    </div>
                    <div className="col-md-6">
                        <h5 className='bg-primary text-light text-center p-2'>Buyer Profile Section</h5>
                        <ProfileTable user={user} />
                    </div>
                </div>

                <h5 className='bg-primary p-2 text-center text-light'>Wishlist Section</h5>
                {
                    wishlist.length ?
                        <div className="table-responsive">
                            <table className='table table-bordered table-hover'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        wishlist.map((item, index) => {
                                            return <tr key={index}>
                                                <td>
                                                    {
                                                        <a href={`/${item.product?.pic[0]}`} target='_blank'>
                                                            <img src={`/${item.product?.pic[0]}`} height={50} width={50} alt="" className='rounded' />
                                                        </a>
                                                    }
                                                </td>
                                                <td>{item?.product?.name}</td>
                                                <td>{item?.product?.brand?.name}</td>
                                                <td>{item?.product?.color}</td>
                                                <td>{item?.product?.size}</td>
                                                <td>&#8377;{item.product?.finalprice}</td>
                                                <td className='text-center'><Link to={`/single-product/${item.product._id}`} onClick={() => deleteItem(item._id, "do-not-ask")} className='btn btn-primary'><i className='fa fa-shopping-cart'></i></Link></td>
                                                <td className='text-center'><button className="btn btn-danger" onClick={() => deleteItem(item._id)}><i className='fa fa-close'></i></button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div> :
                        <div className='text-center'>
                            <h3>No Items in Wishlist</h3>
                            <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
                        </div>
                }

                <h5 className='bg-primary p-2 text-center text-light my-3'>Orders Section</h5>
                {
                    checkout.length ?
                        checkout.map((item, index) => {
                            return <div className="row" key={index}>
                                <div className="col-md-4">
                                    <div className="table-responsive">
                                        <table className='table table-bordered'>
                                            <tbody>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <td>{item._id}</td>
                                                </tr>
                                                <tr>
                                                    <th>Order Status</th>
                                                    <td>{item.orderStatus}</td>
                                                </tr>
                                                <tr>
                                                    <th>Payment Mode</th>
                                                    <td>{item.paymentMode}</td>
                                                </tr>
                                                <tr>
                                                    <th>Payment Status</th>
                                                    <td>{item.paymentStatus}</td>
                                                </tr>
                                                <tr>
                                                    <th>Subtotal</th>
                                                    <td>&#8377;{item.subtotal}</td>
                                                </tr>
                                                <tr>
                                                    <th>Shipping</th>
                                                    <td>&#8377;{item.shipping}</td>
                                                </tr>
                                                <tr>
                                                    <th>Total</th>
                                                    <td>&#8377;{item.total}</td>
                                                </tr>
                                                <tr>
                                                    <th>Date</th>
                                                    <td>{new Date(item.date).toLocaleString()}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="table-responsive">
                                        <table className='table table-bordered table-hover'>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th>Brand</th>
                                                    <th>Color</th>
                                                    <th>Size</th>
                                                    <th>Price</th>
                                                    <th>Qty</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    item.products.map((p, ind) => {
                                                        return <tr key={ind}>
                                                            <td>
                                                                <a href={`/${p.product.pic[0]}`} target='_blank'>
                                                                    <img src={`/${p.product.pic[0]}`} height={50} width={50} alt="" className='rounded' />
                                                                </a>
                                                            </td>
                                                            <td>{p.product.name}</td>
                                                            <td>{p.product.brand.name}</td>
                                                            <td>{p.product.color}</td>
                                                            <td>{p.product.size}</td>
                                                            <td>&#8377;{p.product.finalprice}</td>
                                                            <td>{p.qty}</td>
                                                            <td>&#8377;{p.total}</td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        })
                        :
                        <div className='text-center'>
                            <h3>No Order History</h3>
                            <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
                        </div>
                }
            </div>
        </>
    )
}
