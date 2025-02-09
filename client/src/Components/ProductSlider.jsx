import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ProductItem from './ProductItem';

export default function ProductSlider({ data }) {
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
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            1080: {
                items: 4
            },
            1920: {
                items: 5
            }
        }
    }
    return (
        <OwlCarousel className='owl-theme' {...options} nav>
            {
                data.map((item, index) => {
                    return <div key={index}>
                        <ProductItem item={item} />
                    </div>
                })
            }
        </OwlCarousel>
    )
}
