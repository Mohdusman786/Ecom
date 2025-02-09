import React, { useState } from 'react'
import Breadcrum from "./Breadcrum"

import { Link, useNavigate } from 'react-router-dom'
export default function Login() {
    let navigate = useNavigate()
    let [data, setData] = useState({
        username: "",
        password: "",
    })
    let [errorMessage, setErrorMessages] = useState("")
    function getInputData(e) {
        let { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        let response = await fetch("/api/user/login", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ username: data.username, password: data.password })
        })
        response = await response.json()
        if (response.result === "Done") {
            localStorage.setItem("login", true)
            localStorage.setItem("name", response.data.name)
            localStorage.setItem("userid", response.data._id)
            localStorage.setItem("role", response.data.role)
            localStorage.setItem("token", response.token)
            if (response.data.role === "Admin")
                navigate("/admin")
            else
                navigate("/profile")
        }
        else
            setErrorMessages(response.reason)
    }
    return (
        <>
            <Breadcrum title="Login" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-8 col-sm-10 m-auto">
                        <h5 className='bg-primary text-center text-light p-2'><span className='text-bold'>Login</span> to Your Account</h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <input type="text" name="username" onChange={getInputData} placeholder='User Name or Email Address' className='form-control' />
                                {errorMessage ? <p className='text-danger'>{errorMessage}</p> : ""}
                            </div>
                            <div className="mb-3">
                                <input type="password" name="password" onChange={getInputData} placeholder='Password' className='form-control' />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Login</button>
                            </div>
                        </form>
                        <div className='d-flex justify-content-between'>
                            <Link to="/forget-password-1">Forget Password</Link>
                            <Link to="/signup">Doesn't Have an Account?Create</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
