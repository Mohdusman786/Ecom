import React, { useState } from 'react'
import Breadcrum from "./Breadcrum"
import formValidations from './Validations/formValidations'
import { Link, useNavigate } from 'react-router-dom'
export default function Signup() {
    let navigate = useNavigate()
    let [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        cpassword: ""
    })
    let [show, setShow] = useState(false)
    let [errorMessage, setErrorMessages] = useState({
        name: "Name Filed is Mendatory",
        email: "Email Filed is Mendatory",
        phone: "Phone Filed is Mendatory",
        username: "Username Filed is Mendatory",
        password: "Password Filed is Mendatory"
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
    async function postData(e) {
        e.preventDefault()
        if (data.password !== data.cpassword) {
            setShow(true)
            setErrorMessages((old) => {
                return {
                    ...old,
                    'password': "Password and Confirm Password Doesn't Matched"
                }
            })
            return
        }
        let error = Object.values(errorMessage).find((x) => x?.length !== 0)
        if (!error) {
            let item = {
                name: data.name,
                username: data.username,
                email: data.email,
                phone: data.phone,
                password: data.password,
                role: "Buyer"
            }
            let response = await fetch("/api/user", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(item)
            })
            response = await response.json()
            if (response.result === "Done")
                navigate("/login")
            else{
                setErrorMessages((old) => {
                    return {
                        ...old,
                        ...response.error
                    }
                })
                setShow(true)
            }
        }
        else
            setShow(true)
    }
    return (
        <>
            <Breadcrum title="Signup" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-8 col-sm-10 m-auto">
                        <h5 className='bg-primary text-center text-light p-2'><span className='text-bold'>Create</span> a Free Account</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="name" onChange={getInputData} placeholder='Full Name' className='form-control' />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="username" onChange={getInputData} placeholder='User Name' className='form-control' />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : ""}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="email" name="email" onChange={getInputData} placeholder='Email Address' className='form-control' />
                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="phone" onChange={getInputData} placeholder='Phone Number' className='form-control' />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : ""}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="password" name="password" onChange={getInputData} placeholder='Password' className='form-control' />
                                    {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="password" name="cpassword" onChange={getInputData} placeholder='Confirm Password' className='form-control' />
                                </div>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Signup</button>
                            </div>
                        </form>
                        <Link to="/login" className='float-end'>Already Have an Account?Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
