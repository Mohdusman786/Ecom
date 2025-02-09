import React, { useState } from 'react'
import Breadcrum from './Breadcrum'
import { useDispatch } from 'react-redux'

import { addContactUs } from "../Store/ActionCreators/ContactUsActionCreators"
import formValidations from "./Validations/formValidations"
export default function ContactUs() {
    let dispatch = useDispatch()
    let [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: ""
    })
    let [message, setMessage] = useState("")
    let [show, setShow] = useState(false)
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field Must Required",
        phone: "Phone Field Must Required",
        email: "Email Field Must Required",
        subject: "Subject Field Must Required",
        message: "Message Field Must Required"
    })
    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage((old) => {
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

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x?.length !== 0)
        if (!error) {
            let item = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                subject: data.subject,
                message: data.message,
                active: true,
                date: new Date()
            }
            dispatch(addContactUs(item))
            setMessage("Thanks to Share Your Query With Us!!! Our Team Will Contact You Soon")
            setData({
                name: "",
                phone: "",
                email: "",
                subject: "",
                message: ""
            })
        }
        else
            setShow(true)
    }
    return (
        <>
            <Breadcrum title="Contact" />

            {/* <!-- Contact Start --> */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                            <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">Contact</p>
                            <h1 className="display-5 mb-4">If You Have Any Query, Please Contact Us</h1>
                            <div className='card px-5 py-3'>
                                <div >
                                    <i className='fa fa-home fs-5'></i>
                                    <span className='ms-3 fs-5 text-dark'>A-43, Sector 16,Noida,UP,India</span>
                                </div>
                                <div >
                                    <i className='fa fa-envelope fs-5'></i>
                                    <span className='ms-3 fs-5'><a className='text-dark' target='_blank' rel='noreferrer' href="mailto:mohdusman6268@gmail.com">mohdusman6268@gmail.com</a></span>
                                </div>
                                <div >
                                    <i className='fa fa-phone fs-5'></i>
                                    <span className='ms-3 fs-5'><a className='text-dark' target='_blank' rel='noreferrer' href="tel:+917900775512">+917900775512</a></span>
                                </div>
                            </div>
                            {message?<p className='text-success py-3'>{message}</p>:""}
                            <form onSubmit={postData}>
                                <div className="row g-3 my-3">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" onChange={getInputData} name='name' value={data.name} id="name" placeholder="Your Name" />
                                        <label htmlFor="name">Your Name</label>
                                        {show ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" onChange={getInputData} name='phone' value={data.phone} id="phone" placeholder="Your Phone Number" />
                                            <label htmlFor="name">Your Phone Number</label>
                                            {show ? <p className='text-danger'>{errorMessage.phone}</p> : ""}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" onChange={getInputData} name='email' value={data.email} id="email" placeholder="Your Email" />
                                            <label htmlFor="email">Your Email</label>
                                            {show ? <p className='text-danger'>{errorMessage.email}</p> : ""}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" onChange={getInputData} name='subject' value={data.subject} id="subject" placeholder="Subject" />
                                            <label htmlFor="subject">Subject</label>
                                            {show ? <p className='text-danger'>{errorMessage.subject}</p> : ""}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Leave a message here" onChange={getInputData} name='message' value={data.message} id="message"
                                                style={{ height: "100px" }}></textarea>
                                            <label htmlFor="message">Message</label>
                                            {show ? <p className='text-danger'>{errorMessage.message}</p> : ""}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary py-2 w-100" type="submit">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s" style={{ minHeight: "450px" }}>
                            <div className="position-relative rounded overflow-hidden h-100">
                                <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height="600" id="gmap_canvas" src="https://maps.google.com/maps?q=A-43%20Sector%2016%20Noida&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Contact End --> */}
        </>
    )
}
