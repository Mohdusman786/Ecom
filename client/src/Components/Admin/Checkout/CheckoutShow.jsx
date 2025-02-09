import React, { useEffect, useState } from 'react'

import Breadcrum from "../../Breadcrum"
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'

import { getCheckout, updateCheckout } from "../../../Store/ActionCreators/CheckoutActionCreators"
import { useParams } from 'react-router-dom'
export default function CheckoutShow() {
    let [data, setData] = useState({})
    let [orderStatus, setOrderStatus] = useState("")
    let [paymentStatus, setPaymentStatus] = useState("")

    let { _id } = useParams()

    let dispatch = useDispatch()
    let CheckoutStateData = useSelector(state => state.CheckoutStateData)

    function updateRecord() {
        if (window.confirm("Are You Sure to Update the Status : ")) {
            dispatch(updateCheckout({ ...data, orderStatus: orderStatus, paymentStatus: paymentStatus }))
            setData({ ...data, orderStatus: orderStatus, paymentStatus: paymentStatus })
        }
    }
    async function getAPIData() {
        dispatch(getCheckout())
        if(CheckoutStateData.length){
            let item = CheckoutStateData.find((x)=>x._id===_id)
            setData(item)
            setOrderStatus(item.orderStatus)
            setPaymentStatus(item.paymentStatus)
        }
    }
    useEffect(() => {
        getAPIData()
    }, [CheckoutStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="col-9">
                        <h5 className='bg-primary text-light text-center p-2'>Contact-Us Query</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>_Id</th>
                                        <td>{data._id}</td>
                                    </tr>
                                    <tr>
                                        <th>Delvery Details</th>
                                        <td>
                                                {data.user?.name},<br/>
                                                {data.user?.email},{data.user?.phone},<br/>
                                                {data.user?.address},<br/>
                                                {data.user?.pin},<br/>
                                                {data.user?.city},{data.user?.state}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Order Status</th>
                                        <td>{data.orderStatus}
                                            {
                                                data.orderStatus !== "Delivered" ?
                                                    <>
                                                        <br />
                                                        <select name="orderstatus" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} className='form-select mt-3'>
                                                            <option>Order is Placed</option>
                                                            <option>Order is Packed</option>
                                                            <option>Order is Ready to Ship</option>
                                                            <option>Order is Shipped</option>
                                                            <option>Order is in Transit</option>
                                                            <option>Out for Delivery</option>
                                                            <option>Delivered</option>
                                                        </select>
                                                    </>
                                                    : ""
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Payment Status</th>
                                        <td>{data.paymentStatus}
                                            {
                                                data.paymentStatus !== "Done" && data.paymentMode === "COD" ?
                                                    <>
                                                        <br />
                                                        <select name="paymentStatus" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className='form-select mt-3'>
                                                            <option>Pending</option>
                                                            <option>Done</option>
                                                        </select>
                                                    </>
                                                    : ""
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <td>{data.paymentMode}</td>
                                    </tr>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>&#8377;{data.subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{data.shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{data.total}</td>
                                    </tr>
                                    <tr>
                                        <th>RPPID</th>
                                        <td>{data.rppid ? data.rppid : "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.date).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        {
                                            data.orderstatus !== 'Delivered' || data.paymentstatus === 'Pending' ?
                                                <td colSpan={2}><button className='btn btn-primary w-100' onClick={updateRecord}>Update</button></td> :
                                                ""
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h5 className='bg-primary text-center p-2 text-light'>Products in This Order</h5>
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
                                        data?.products?.map((p, ind) => {
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
                                                <td>&#8377;{p.product.price}</td>
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
            </div>
        </>
    )
}
