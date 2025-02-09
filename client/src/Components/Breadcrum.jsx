import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrum({title}) {
    return (
        <div className="container-fluid page-header mt-5 wow fadeIn" id='top' data-wow-delay="0.1s">
            <div className="container">
                <h2 className="mb-4 animated slideInDown">{title}</h2>
                <nav aria-label="breadcrumb animated slideInDown">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{title}</li>
                    </ol>
                </nav>
            </div>
        </div>
    )
}
