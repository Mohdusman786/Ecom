import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'

import Breadcrum from "../../Breadcrum"
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'

import { deleteContactUs, getContactUs } from "../../../Store/ActionCreators/ContactUsActionCreators"
import { Link } from 'react-router-dom'
export default function ContactUsQueries() {
    let [data, setData] = useState([])

    let dispatch = useDispatch()
    let ContactUsStateData = useSelector(state => state.ContactUsStateData)

    const columns = [
        { field: '_id', headerName: '_ID', width: 230 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            editable: true,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 100,
            editable: true,
        },
        {
            field: 'subject',
            headerName: 'Subject',
            width: 100,
            editable: true,
        },
        {
            field: 'message',
            headerName: 'Message',
            width: 100,
            editable: true,
        },
        {
            field: 'active',
            headerName: 'Active',
            width: 50,
            editable: true,
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
            renderCell: ({ row }) => <Link to={`/admin/contact-us/show/${row._id}`} className='btn btn-primary'><i className='fa fa-eye'></i></Link>
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 110,
            sortable: false,
            renderCell: ({ row }) => row.active === false ? <button className='btn btn-danger' onClick={() => deleteRecord(row._id)}><i className='fa fa-trash'></i></button> : ""
        }
    ];
    function deleteRecord(_id) {
        if (window.confirm("Are You Sure to Delete that Item : ")) {
            dispatch(deleteContactUs({ _id: _id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getContactUs())
        if (ContactUsStateData.length)
            setData(ContactUsStateData)
        else
            setData([])
    }
    useEffect(() => {
        getAPIData()
    }, [ContactUsStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="col-9">
                        <h5 className='bg-primary text-light text-center p-2'>Contact-Us Queries</h5>
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
