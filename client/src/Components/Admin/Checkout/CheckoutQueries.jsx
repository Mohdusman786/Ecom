import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'

import Breadcrum from "../../Breadcrum"
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'

import { getCheckout } from "../../../Store/ActionCreators/CheckoutActionCreators"
import { Link } from 'react-router-dom'
export default function CheckoutQueries() {
    let [data, setData] = useState([])

    let dispatch = useDispatch()
    let CheckoutStateData = useSelector(state => state.CheckoutStateData)

    const columns = [
        { field: '_id', headerName: '_ID', width: 230 },
        {
            field: 'user',
            headerName: 'user',
            width: 150,
            editable: true,
            renderCell:({row})=><span>{row.user.name}</span>
        },
        {
            field: 'orderStatus',
            headerName: 'Order Status',
            width: 150,
            editable: true,
        },
        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            width: 100,
            editable: true,
        },
        {
            field: 'paymentMode',
            headerName: 'Payment Mode',
            width: 100,
            editable: true,
        },
        {
            field: 'subtotal',
            headerName: 'Subtotal',
            width: 100,
            editable: true,
            renderCell: ({ row }) => <p>&#8377;{row.subtotal}</p>
        },
        {
            field: 'shipping',
            headerName: 'Shipping',
            width: 100,
            editable: true,
            renderCell: ({ row }) => <p>&#8377;{row.shipping}</p>
        },
        {
            field: 'total',
            headerName: 'Total',
            width: 100,
            editable: true,
            renderCell: ({ row }) => <p>&#8377;{row.total}</p>
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 170,
            editable: true,
            renderCell: ({ row }) => <p>{new Date(row.date).toLocaleString()}</p>
        },
        {
            field: 'show',
            headerName: 'Show',
            width: 50,
            sortable: false,
            renderCell: ({ row }) => <Link to={`/admin/checkout/show/${row._id}`} className='btn btn-primary'><i className='fa fa-eye'></i></Link>
        }
    ]
    function getAPIData() {
        dispatch(getCheckout())
        if (CheckoutStateData.length)
            setData(CheckoutStateData)
        else
            setData([])
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
                        <h5 className='bg-primary text-light text-center p-2'>Checkouts</h5>
                        <div className="table-responsive">
                            <DataGrid
                                getRowId={(row) => row._id}
                                rows={data}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5, 10, 50, 100]}
                                checkboxSelection={false}
                                disableRowSelectionOnClick
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
