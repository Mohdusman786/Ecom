import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    let [email, setEmail] = useState("")
    let [message, setMessage] = useState("")

    async function postData(e) {
        e.preventDefault()
        if (email.length === 0)
            setMessage("Please Enter a Valid Email Address")
        else {
            let response = await fetch("/Linkpi/newsletter", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ email: email })
            })
            response = await response.json()
            if (response.result === "Done") {
                setMessage("Thanks to Subscribe our Newsletter Services")
                setEmail("")
            }
            else
                setMessage(response.reason)

        }
    }
    return (
        <>
            <div className="container-fluid bg-dark text-light footer mt-3 py-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container py-1">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className='text-light'><Link to="/" className='text-light'>TREND</Link></h1>
                            <p className='text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, nisi cupiditate, eos iure cumque doloremque libero maiores ea tenetur perspiciatis nihil minus natus, odit tempora aspernatur molestiae explicabo repellat non.</p>
                        </div>
                        <div className="col-md-6 mb-5">
                            <h5 className="text-white mb-4">Newsletter</h5>
                            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                            <p>{message}</p>
                            <div className="position-relative w-100">
                                <form onSubmit={postData}>
                                    <input className="form-control bg-white border-0 w-100 py-3 ps-4 pe-5" name='email' value={email} onChange={(e) => setEmail(e.target.value)} type="text"
                                        placeholder="Your email" />
                                    <button type="submit"
                                        className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">Subscribe</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5">
                        <div className="col-md-4">
                            <h5 className="text-white mb-4">Quick Links</h5>
                            <Link className="btn btn-link" to="/">Home</Link>
                            <Link className="btn btn-link" to="/Linkbout">About</Link>
                            <Link className="btn btn-link" to="/shop">Shop</Link>
                            <Link className="btn btn-link" to="/contact-us">ContactUs</Link>
                        </div>
                        <div className="col-md-4">
                            <h5 className="text-white mb-4">Policies</h5>
                            <Link className="btn btn-link" to="#">Privacy Policy</Link>
                            <Link className="btn btn-link" to="#">Terms & Conditions</Link>
                            <Link className="btn btn-link" to="#">Refund Policy</Link>
                            <Link className="btn btn-link" to="#">FAQ</Link>
                        </div>
                        <div className="col-md-4">
                            <h5 className="text-white mb-4">Address</h5>
                            <p className="mb-2"><i className="fa fa-map-marker me-3"></i>A-43, Noida Sector 16</p>
                            <p className="mb-2"><i className="fa fa-envelope me-3"></i><Link href="mailto:mohdusman6268@gmail.com" target='_blank' rel="noreferrer" className='text-light'>mohdusman6268@gmail.com</Link></p>
                            <p className="mb-2"><i className="fa fa-phone me-3"></i><Link href="tel:7900775512" className='text-light' target='_blank' rel="noreferrer">+91-7900775512</Link></p>
                            <div className="d-flex pt-2">
                                <Link className="btn btn-square btn-outline-light rounded-circle me-2" href="#" target='_blank' rel="noreferrer"><i
                                    className="fab fa-twitter"></i></Link>
                                <Link className="btn btn-square btn-outline-light rounded-circle me-2" href="#" target='_blank' rel="noreferrer"><i
                                    className="fab fa-facebook-f"></i></Link>
                                <Link className="btn btn-square btn-outline-light rounded-circle me-2" href="#" target='_blank' rel="noreferrer"><i
                                    className="fab fa-youtube"></i></Link>
                                <Link className="btn btn-square btn-outline-light rounded-circle me-2" href="#" target='_blank' rel="noreferrer"><i
                                    className="fab fa-linkedin-in"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
