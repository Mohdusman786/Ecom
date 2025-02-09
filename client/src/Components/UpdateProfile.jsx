import React, { useEffect, useState } from 'react'
import Breadcrum from "./Breadcrum"
import formValidations from './Validations/formValidations'
import { Link, useNavigate } from 'react-router-dom'
export default function UpdateProfile() {
    let navigate = useNavigate()
    let [data, setData] = useState({})
    let [show, setShow] = useState(false)
    let [errorMessage, setErrorMessages] = useState({
        name: "",
        phone: ""
    })
    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessages((old) => {
            return {
                ...old,
                [name]: formValidations(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function getInputFile(e) {
        let { name, files } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: files[0]
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x?.length !== 0)
        if (!error) {
            let item = new FormData()
            item.append("name", data.name)
            item.append("phone", data.phone)
            item.append("address", data.address)
            item.append("pin", data.pin)
            item.append("city", data.city)
            item.append("state", data.state)
            item.append("pic", data.pic)
            let response = await fetch("/api/user/" + localStorage.getItem("userid"), {
                method: "put",
                headers: {
                    "authorization": localStorage.getItem("token")
                },
                body: item
            })
            response = await response.json()
            if (data.role === "Admin")
                navigate("/admin")
            else
                navigate("/profile")
        }
        else
            setShow(true)
    }
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
                setData({ ...response.data })
            else {
                alert(response.reason + "\nPlease Login")
                navigate("/login")
            }
        })()
    }, [])
    return (
        <>
            <Breadcrum title="Update Profile" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-8 col-sm-10 m-auto">
                        <h5 className='bg-primary text-center text-light p-2'><span className='text-bold'>Update</span> a Your Profile</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Full Name' className='form-control' />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='Phone Number' className='form-control' />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : ""}
                                </div>
                            </div>
                            <div className="mb-3">
                                <textarea name="address" rows="3" value={data.address} className='form-control' placeholder='Address...' onChange={getInputData}></textarea>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="city" value={data.city} onChange={getInputData} placeholder='City Name' className='form-control' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="state" value={data.state} onChange={getInputData} placeholder='State Name' className='form-control' />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="pin" value={data.pin} onChange={getInputData} placeholder='PIN Code' className='form-control' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="file" name="pic" onChange={getInputFile} className='form-control' />
                                </div>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
