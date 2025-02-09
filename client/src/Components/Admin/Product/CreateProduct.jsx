import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import formValidations from "../../Validations/formValidations"
import Breadcrum from "../../Breadcrum"
import Sidebar from '../Sidebar'

import { addProduct } from "../../../Store/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../../../Store/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../../../Store/ActionCreators/BrandActionCreators"
import imageValidations from '../../Validations/imageValidation'

var rte
export default function CreateProduct() {
    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: "",
        size: "",
        baseprice: 0,
        discount: 0,
        finalprice: 0,
        stock: true,
        description: "",
        quantity: 0,
        pic: ""
    })
    let [show, setShow] = useState(false)
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        color: "Color Field is Mendatory",
        size: "Size Field is Mendatory",
        baseprice: "Base Price Field is Mendatory",
        discount: "Discount Field is Mendatory",
        quantity: "Stock Quantity Field is Mendatory",
        pic: "Pic is Mendatory"
    })

    let dispatch = useDispatch()
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)

    let navigate = useNavigate()
    var refdiv = useRef(null);
    function getInputData(e) {
        let name = e.target.name
        let value = e.target.files ? e.target.files : e.target.value
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: e.target.files ? imageValidations(e) : formValidations(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: e.target.files ? Array.from(value) : value
            }
        })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x?.length !== 0)
        if (!error) {
            let bp = parseInt(data.baseprice)
            let d = parseInt(data.discount)
            let fp = parseInt(bp - bp * d / 100)
            let item = new FormData()
            item.append("name", data.name)
            item.append("maincategory", data.maincategory)
            item.append("subcategory", data.subcategory)
            item.append("brand", data.brand)
            item.append("baseprice", bp)
            item.append("discount", d)
            item.append("finalprice", fp)
            item.append("color", data.color)
            item.append("size", data.size)
            item.append("stock", data.stock)
            item.append("description", rte.getHTMLCode())
            item.append("quantity", parseInt(data.quantity))
            data.pic.forEach((p) => {
                item.append("pic", p)
            })
            dispatch(addProduct(item))
            navigate("/admin/product")
        }
        else
            setShow(true)
    }
    function getAPIData() {
        rte = new window.RichTextEditor(refdiv.current);
        rte.setHTMLCode("")
        dispatch(getMaincategory())
        dispatch(getSubcategory())
        dispatch(getBrand())
        if (MaincategoryStateData.length && SubcategoryStateData.length && BrandStateData.length) {
            setData((old) => {
                return {
                    ...old,
                    'maincategory': MaincategoryStateData[0]._id,
                    'subcategory': SubcategoryStateData[0]._id,
                    'brand': BrandStateData[0]._id,
                }
            })
        }
    }
    useEffect(() => {
        getAPIData()
    }, [MaincategoryStateData.length, SubcategoryStateData.length, BrandStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="col-9">
                        <h5 className='bg-primary text-light text-center p-2'>Product <button className='float-end text-light border-0' style={{ background: "none" }} onClick={() => window.history.back()}><i className='fa fa-arrow-left'></i></button></h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name<span className='text-danger'>*</span></label>
                                <input type="text" name="name" onChange={getInputData} placeholder="Product Name" className='form-control' />
                                {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.name}</p> : ""}
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label>Maincategory<span className='text-danger'>*</span></label>
                                    <select name="maincategory" onChange={getInputData} className='form-select'>
                                        {
                                            MaincategoryStateData.map((item, index) => {
                                                return <option key={index} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label>Subcategory<span className='text-danger'>*</span></label>
                                    <select name="subcategory" onChange={getInputData} className='form-select'>
                                        {
                                            SubcategoryStateData.map((item, index) => {
                                                return <option key={index} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label>Brand<span className='text-danger'>*</span></label>
                                    <select name="brand" onChange={getInputData} className='form-select'>
                                        {
                                            BrandStateData.map((item, index) => {
                                                return <option key={index} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label>Stock<span className='text-danger'>*</span></label>
                                    <select name="stock" onChange={getInputData} className='form-select'>
                                        <option value={true}>In Stock</option>
                                        <option value={false}>Out Of Stock</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label>Base Price<span className='text-danger'>*</span></label>
                                    <input type="number" name="baseprice" onChange={getInputData} className='form-control' placeholder='Base Price' />
                                    {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.baseprice}</p> : ""}
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>Discount<span className='text-danger'>*</span></label>
                                    <input type="number" name="discount" onChange={getInputData} className='form-control' placeholder='Discount' />
                                    {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.discount}</p> : ""}
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>Stock Quantity<span className='text-danger'>*</span></label>
                                    <input type="number" name="quantity" onChange={getInputData} className='form-control' placeholder='Stock Quantity' />
                                    {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.quantity}</p> : ""}
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Color<span className='text-danger'>*</span></label>
                                    <input type="text" name="color" onChange={getInputData} className='form-control' placeholder='Color' />
                                    {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.color}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Size<span className='text-danger'>*</span></label>
                                    <input type="text" name="size" onChange={getInputData} className='form-control' placeholder='Size' />
                                    {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.size}</p> : ""}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Description</label>
                                <div className='w-100' ref={refdiv}></div>
                            </div>

                            <div className="mb-3">
                                <label>Pic<span className='text-danger'>*</span></label>
                                <input type="file" name="pic" multiple onChange={getInputData} className='form-control' />
                                {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.pic}</p> : ""}
                            </div>
                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
