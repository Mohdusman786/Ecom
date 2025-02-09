import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import Breadcrum from "./Breadcrum"
import ProductSlider from "./ProductSlider"
import Testimonial from "./Testimonial"

import { getProduct } from "../Store/ActionCreators/ProductActionCreators"
import { getCart, addCart } from "../Store/ActionCreators/CartActionCreators"
import { getWishlist, addWishlist } from "../Store/ActionCreators/WishlistActionCreators"
export default function SingleProduct() {
    let { _id } = useParams()
    let [qty, setQty] = useState(1)
    let [product, setProduct] = useState({})
    let [relatedProducts, setRelatedProducts] = useState([])

    let navigate = useNavigate()
    let ProductStateData = useSelector((state) => state.ProductStateData)
    let CartStateData = useSelector((state) => state.CartStateData)
    let WishlistStateData = useSelector((state) => state.WishlistStateData)
    let dispatch = useDispatch()

    function addToCart() {
        var item = CartStateData.find((x) => x.product === _id && x.user === localStorage.getItem('userid'))
        if (!item) {
            item = {
                product: _id,
                user: localStorage.getItem("userid"),
                qty: qty,
                total: product.finalprice * qty,
            }
            dispatch(addCart(item))
        }
        navigate("/cart")
    }
    function addToWishlist() {
        var item = WishlistStateData.find((x) => x.product === _id && x.user === localStorage.getItem('userid'))
        if (!item) {
            item = {
                product: _id,
                user: localStorage.getItem("userid"),
            }
            dispatch(addWishlist(item))
        }
        navigate("/profile")
    }

    function getInputData(option) {
        if (option === "dec" && qty === 1)
            return
        else if (option === "dec")
            setQty(qty - 1)
        else if (qty < product.quantity)
            setQty(qty + 1)
    }
    useEffect(() => {
        (() => {
            dispatch(getCart())
        })()
    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getWishlist())
        })()
    }, [WishlistStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find((x) => x._id === _id)
                setProduct(item)
                setRelatedProducts(ProductStateData.filter((x) => x.maincategory._id === item.maincategory._id))
            }
        })()
    }, [ProductStateData.length, _id])
    return (
        <>
            <Breadcrum title="Product Page" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-6">
                        {
                            product?.pic && <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    {
                                        product.pic && product.pic.slice(1).map((item, index) => {
                                            return <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index + 1} aria-label={`Slide ${index + 2}`}></button>
                                        })
                                    }
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={`/${product.pic && product.pic[0]}`} height={500} className="d-block w-100" alt="..." />
                                    </div>
                                    {
                                        product.pic && product.pic.slice(1).map((item, index) => {
                                            return <div className="carousel-item" key={index}>
                                                <img src={`/${item}`} height={500} className="d-block w-100" alt="..." />
                                            </div>
                                        })
                                    }
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        }
                    </div>
                    <div className="col-md-6">
                        <h5 className='bg-primary p-2 text-center p-2 text-light'>{product.name}</h5>
                        <table className='table table-bordered table-hover'>
                            <tbody>
                                <tr>
                                    <th>Maincategory</th>
                                    <td>{product.maincategory?.name}</td>
                                </tr>
                                <tr>
                                    <th>Subcategory</th>
                                    <td>{product.subcategory?.name}</td>
                                </tr>
                                <tr>
                                    <th>Brand</th>
                                    <td>{product.brand?.name}</td>
                                </tr>
                                <tr>
                                    <th>Price</th>
                                    <td><del className='text-danger'>&#8377;{product.baseprice}</del> &#8377;{product.finalprice} <sup className='text-success'>{product.discount}% Off</sup></td>
                                </tr>
                                <tr>
                                    <th>Color</th>
                                    <td>{product.color}</td>
                                </tr>
                                <tr>
                                    <th>Size</th>
                                    <td>{product.size}</td>
                                </tr>
                                <tr>
                                    <th>Stock</th>
                                    <td>{product.stock ? "In Stock" : "Out Of Stock"}{product.stock ? `/${product.quantity} Items Left` : ""}</td>
                                </tr>
                                {
                                    product.stock ?
                                        <tr>
                                            <td colSpan={2}>
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-6 text-center">
                                                        <div className="mb-3 btn-group">
                                                            <button className='btn btn-primary' onClick={() => getInputData('dec')}><i className='fa fa-minus'></i></button>
                                                            <p className='text-center text-bold fs-5' style={{ width: 60 }}>{qty}</p>
                                                            <button className='btn btn-primary' onClick={() => getInputData('inc')}><i className='fa fa-plus'></i></button>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9 col-md-6 text-center mt-1">
                                                        <div className="ms-3 btn-group">
                                                            <button className='btn btn-primary' onClick={addToCart}><i className='fa fa-shopping-cart'></i> Add to Cart</button>
                                                            <button className='btn btn-success' onClick={addToWishlist}><i className='fa fa-heart'></i> Add to Wishlist</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr> :
                                        <tr>
                                            <th colSpan={2}><button className='btn btn-success' onClick={addToWishlist}><i className='fa fa-heart'></i> Add to Wishlist</button></th>
                                        </tr>
                                }
                                <tr>
                                    <th>Description</th>
                                    <td>
                                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <h5 className='bg-primary p-2 text-light text-center'>Related Products</h5>
            <ProductSlider data={relatedProducts} />

            <Testimonial />
        </>
    )
}
