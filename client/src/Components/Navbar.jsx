import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
    let navigate = useNavigate()
    function logout() {
        localStorage.clear()
        navigate("/login")
    }
    return (
        <>
            <div className="container-fluid fixed-top px-0 wow fadeIn bg-primary" data-wow-delay="0.1s">
                <div className="top-bar row gx-0 align-items-center d-none d-lg-flex">
                    <div className="col-lg-4 px-5 text-start">
                        <div className="d-none d-lg-flex ms-2">
                            <Link className="btn btn-light btn-sm-square rounded-circle ms-3" href="#" target='_blank' rel="noreferrer">
                                <small className="fab fa-facebook-f text-primary"></small>
                            </Link>
                            <Link className="btn btn-light btn-sm-square rounded-circle ms-3" href="#" target='_blank' rel="noreferrer">
                                <small className="fab fa-twitter text-primary"></small>
                            </Link>
                            <Link className="btn btn-light btn-sm-square rounded-circle ms-3" href="#" target='_blank' rel="noreferrer">
                                <small className="fab fa-linkedin-in text-primary"></small>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-8 px-5 text-end">
                        <small className="ms-4"><Link href="mailto:mohdusman6268@gmail.com" target='_blank' rel="noreferrer" className='my-text-color'><i className="fa fa-envelope my-text-color me-2"></i>mohdusman6268@gmail.com</Link></small>
                        <small className="ms-4"><Link href="tel:7900775512" target='_blank' rel="noreferrer" className='my-text-color'><i className="fa fa-phone my-text-color me-2"></i>+91-7900775512</Link></small>
                        <small className="ms-4"><Link href="https://wa.me/7900775512" target='_blank' rel="noreferrer" className='my-text-color'><i className="fa fa-whatsapp my-text-color me-2"></i>+91-7900775512</Link></small>
                    </div>
                </div>

                <nav className="navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5 wow fadeIn my-background" data-wow-delay="0.1s">
                    <Link to="/" className="navbar-brand ms-4 ms-lg-0">
                        <h1 className="display-5 text-primary m-0">TREND</h1>
                    </Link>
                    <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto p-4 p-lg-0">
                            <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                            <NavLink to="/about" className="nav-item nav-link">About</NavLink>
                            <NavLink to="/shop" className="nav-item nav-link">Shop</NavLink>
                            <NavLink to="/contact-us" className="nav-item nav-link">Contact</NavLink>
                            {
                                localStorage.getItem("login") ?
                                    <div className="nav-item dropdown">
                                        <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{localStorage.getItem("name")}</Link>
                                        <div className="dropdown-menu border-light m-0">
                                            <Link to={localStorage.getItem("role")==="Admin"?"/admin":"/profile"} className="dropdown-item">Profile</Link>
                                            {
                                                localStorage.getItem("role") === "Buyer" ?
                                                    <>
                                                        <Link to="/cart" className="dropdown-item">Cart</Link>
                                                        <Link to="/checkout" className="dropdown-item">Checkout</Link>
                                                    </> : ""
                                            }
                                            <button className="dropdown-item" onClick={logout}>Logout</button>
                                        </div>
                                    </div> :
                                    <Link to="/login" className="nav-item nav-link">Login</Link>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
