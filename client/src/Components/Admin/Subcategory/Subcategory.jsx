import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'

import Breadcrum from "../../Breadcrum"
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteSubcategory, getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators"
export default function Subcategory() {
    let [data, setData] = useState([])

    let dispatch = useDispatch()
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)

    const columns = [
        { field: '_id', headerName: '_ID', width: 230 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 150,
            sortable: false,
            renderCell: ({ row }) => <Link to={`/admin/subcategory/update/${row._id}`} className='btn btn-primary'><i className='fa fa-edit'></i></Link>
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
            dispatch(deleteSubcategory({ _id: _id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getSubcategory())
        if (SubcategoryStateData.length)
            setData(SubcategoryStateData)
        else
            setData([])
    }
    useEffect(() => {
        getAPIData()
    }, [SubcategoryStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="col-9">
                        <h5 className='bg-primary text-light text-center p-2'>Subcategory <Link to="/admin/subcategory/create" className='float-end text-light'><i className='fa fa-plus'></i></Link></h5>
                        {/* <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td><Link to={`/admin/subcategory/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit'></i></Link></td>
                                            <td><button className='btn btn-danger' onClick={()=>deleteRecord(item.id)}><i className='fa fa-trash'></i></button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table> */}

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
