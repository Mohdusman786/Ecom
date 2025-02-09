import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


import { getTestimonial } from "../Store/ActionCreators/TestimonialActionCreators"
export default function Testimonial() {
    let [data, setData] = useState([])

    let dispatch = useDispatch()
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let options = {
        loop: true,
        margin: 15,
        autoplay: true,
        autoplaySpeed: 1000,
        speed: 10,
        responsiveRefreshRate: 1000,
        dots: false,
        navText: ["<button style='border:none;background-color:blue;color:white;border-radius:50%;width:50px;height:50px'><i class='fa fa-arrow-right'></button>", "<button style='border:none;background-color:blue;color:white;border-radius:50%;width:50px;height:50px'><i class='fa fa-arrow-left'></button>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1080: {
                items: 3
            },
            1920: {
                items: 4
            }
        }
    }

    function getAPIData() {
        dispatch(getTestimonial())
        if (TestimonialStateData.length)
            setData(TestimonialStateData)
    }
    useEffect(() => {
        getAPIData()
    }, [TestimonialStateData.length])
    return (
        <>
            <div className="container-xxl py-2">
                <div className="container">
                    <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "600px" }}>
                        <h3 className="my-3">What Our Clients Say!</h3>
                    </div>
                    <OwlCarousel className='owl-theme' {...options} nav>
                        {
                            data.map((item, index) => {
                                return <div className="testimonial-item" key={index}>
                                    <div className="testimonial-text border rounded p-4 pt-5 mb-5">
                                        <div className="btn-square bg-white border rounded-circle">
                                            <i className="fa fa-quote-right fa-2x text-primary"></i>
                                        </div>
                                        <div className='testimonial-message'>
                                            {item.message}
                                        </div>
                                    </div>
                                    <img className="" style={{ height: 80, width: 80, margin: "auto", borderRadius: "50%" }} src={`/${item.pic}`} alt="" />
                                    <h4>{item.name}</h4>
                                </div>
                            })
                        }
                    </OwlCarousel>
                </div>
            </div>
        </>
    )
}
