import React, { useState } from 'react'
import Breadcrum from "./Breadcrum"

import { Link, useNavigate } from 'react-router-dom'
export default function ForgetPassword2() {
    let navigate = useNavigate()
    let [data, setData] = useState({
        otp: ""
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
        let response = await fetch("/api/user/forget-password-2", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ username: localStorage.getItem("reset-password-user"), otp: data.otp })
        })
        response = await response.json()
        if (response.result === "Done")
            navigate("/forget-password-3")
        else
            setErrorMessages(response.message)
    }
    return (
        <>
            <Breadcrum title="Reset Password" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-8 col-sm-10 m-auto">
                        <h5 className='bg-primary text-center text-light p-2'><span className='text-bold'>Reset Password</span> to Your Account</h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <input type="number" name="otp" onChange={getInputData} placeholder='Enter OTP which is Sent on Your Registered Email Address' className='form-control' />
                                {errorMessage ? <p className='text-danger'>{errorMessage}</p> : ""}
                            </div>
                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
