import React, { useEffect, useState } from 'react'

import Breadcrum from "../../Breadcrum"
import Sidebar from '../Sidebar'
import { Link, useNavigate } from 'react-router-dom'
export default function AdminHome() {
    let [user,setUser] = useState({})
    let navigate = useNavigate()
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
            if (response.result==="Done")
                setUser({ ...response.data })
            else{
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
            <Breadcrum title="Admin" />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="col-9">
                        <h5 className='bg-primary text-light text-center p-2'>Admin Section</h5>
                        <div className="row">
                            <div className="col-md-6">
                                {
                                    user.pic?
                                    <img src={`${user.pic}`} style={{height:360,width:"100%"}} alt="" />:
                                    <img src="/img/noimage.png" style={{height:360,width:"100%"}} alt="" />
                                }
                            </div>
                            <div className="col-md-6">
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>{user.name}</td>
                                        </tr>
                                        <tr>
                                            <th>User Name</th>
                                            <td>{user.username}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone</th>
                                            <td>{user.phone}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}><Link to="/update-profile" className='btn btn-primary w-100'>Update Profile</Link></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
