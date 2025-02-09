import React, { useEffect, useState } from 'react'

import Breadcrum from "../../Breadcrum"
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'

import { deleteContactUs, getContactUs, updateContactUs } from "../../../Store/ActionCreators/ContactUsActionCreators"
import { useNavigate, useParams } from 'react-router-dom'
export default function ContactUsShow() {
    let [data, setData] = useState({})
    let { _id } = useParams()

    let dispatch = useDispatch()
    let navigate = useNavigate()
    let ContactUsStateData = useSelector(state => state.ContactUsStateData)


    function deleteRecord() {
        if (window.confirm("Are You Sure to Delete that Item : ")) {
            dispatch(deleteContactUs({ _id: _id }))
            navigate("/admin/contact-us")
        }
    }
    function updateRecord() {
        if (window.confirm("Are You Sure to Change Active Status to Inactive : ")) {
            dispatch(updateContactUs({ ...data, active: false }))
            setData({ ...data, active: false })
        }
    }
    function getAPIData() {
        dispatch(getContactUs())
        if (ContactUsStateData.length)
            setData(ContactUsStateData.find((x) => x._id === _id))
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
                        <h5 className='bg-primary text-light text-center p-2'>Contact-Us Query</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>_Id</th>
                                        <td>{data._id}</td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>{data.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{data.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{data.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Subject</th>
                                        <td>{data.subject}</td>
                                    </tr>
                                    <tr>
                                        <th>Message</th>
                                        <td>{data.message}</td>
                                    </tr>
                                    <tr>
                                        <th>Active</th>
                                        <td>{data.active ? "true" : "false"}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.date).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        {
                                            data.active ?
                                                <td colSpan={2}><button className='btn btn-primary w-100' onClick={updateRecord}>Update Active Status to Inactive</button></td> :
                                                <td colSpan={2}><button className='btn btn-danger w-100' onClick={deleteRecord}>Delete</button></td>
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
