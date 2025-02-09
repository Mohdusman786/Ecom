import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'

import Breadcrum from "../../Breadcrum"
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteBrand, getBrand } from "../../../Store/ActionCreators/BrandActionCreators"
export default function Mainctegory() {
    let [data, setData] = useState([])

    let dispatch = useDispatch()
    let BrandStateData = useSelector(state => state.BrandStateData)

    const columns = [
        { field: '_id', headerName: '_ID', width: 230 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'pic',
            headerName: 'Pic',
            width: 150,
            editable: false,
            renderCell: ({ row }) => <a href={`/${row.pic}`} target='_blank' rel='noreferrer'>
                <img src={`/${row.pic}`} height={50} width={50} />
            </a>
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 150,
            sortable: false,
            renderCell: ({ row }) => <Link to={`/admin/brand/update/${row._id}`} className='btn btn-primary'><i className='fa fa-edit'></i></Link>
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 110,
            sortable: false,
            renderCell: ({ row }) => <button className='btn btn-danger' onClick={() => deleteRecord(row._id)}><i className='fa fa-trash'></i></button>
        }
    ];
    function deleteRecord(_id) {
        if (window.confirm("Are You Sure to Delete that Item : ")) {
            dispatch(deleteBrand({ _id: _id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getBrand())
        if (BrandStateData.length)
            setData(BrandStateData)
        else
        setData([])
    }
    useEffect(() => {
        getAPIData()
    }, [BrandStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="col-9">
                        <h5 className='bg-primary text-light text-center p-2'>Brand <Link to="/admin/brand/create" className='float-end text-light'><i className='fa fa-plus'></i></Link></h5>
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
