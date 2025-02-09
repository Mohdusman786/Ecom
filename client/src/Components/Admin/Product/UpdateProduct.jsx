import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import formValidations from "../../Validations/formValidations"
import imageValidations from "../../Validations/imageValidation"
import Breadcrum from "../../Breadcrum"
import Sidebar from '../Sidebar'

import { updateProduct, getProduct } from "../../../Store/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../../../Store/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../../../Store/ActionCreators/BrandActionCreators"
var rte
export default function UpdateProduct() {
    let [flag, setFlag] = useState(false)
    let { _id } = useParams()
    let [oldPic,setOldPic] = useState([])
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
        pic: []
    })
    let [show, setShow] = useState(false)
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        color: "",
        size: "",
        baseprice: "",
        discount: "",
        quantity: "",
        pic: ""
    })

    let dispatch = useDispatch()
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)

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
            item.append("_id", data._id)
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
            item.append("oldPic",oldPic)
            data.pic.forEach((p) => {
                item.append("pic", p)
            })
            dispatch(updateProduct(item))
            navigate("/admin/product")
        }
        else
            setShow(true)
    }
    function getAPIData() {
        rte = new window.RichTextEditor(refdiv.current);
        dispatch(getMaincategory())
        dispatch(getSubcategory())
        dispatch(getBrand())
        dispatch(getProduct())
        if (ProductStateData.length) {
            let item = ProductStateData.find((x) => x._id === _id)
            if (item) {
                setData({
                    ...item,
                    maincategory: item.maincategory._id,
                    subcategory: item.subcategory._id,
                    brand: item.brand._id,
                })
                setOldPic(item.pic)
                if (item.description) {
                    rte.setHTMLCode(item.description)
                }
            }
        }
    }
    useEffect(() => {
        getAPIData()
    }, [MaincategoryStateData.length, SubcategoryStateData.length, BrandStateData.length, ProductStateData.length])
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
                                <input type="text" name="name" value={data.name} onChange={getInputData} placeholder="Product Name" className='form-control' />
                                {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.name}</p> : ""}
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label>Maincategory<span className='text-danger'>*</span></label>
                                    <select name="maincategory" value={data.maincategory} onChange={getInputData} className='form-select'>
                                        {
                                            MaincategoryStateData.map((item, index) => {
                                                return <option key={index} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label>Subcategory<span className='text-danger'>*</span></label>
                                    <select name="subcategory" value={data.subcategory} onChange={getInputData} className='form-select'>
                                        {
                                            SubcategoryStateData.map((item, index) => {
                                                return <option key={index} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label>Brand<span className='text-danger'>*</span></label>
                                    <select name="brand" value={data.brand} onChange={getInputData} className='form-select'>
                                        {
                                            BrandStateData.map((item, index) => {
                                                return <option key={index} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label>Stock<span className='text-danger'>*</span></label>
                                    <select name="stock" value={data.stock} onChange={getInputData} className='form-select'>
                                        <option value={true}>In Stock</option>
                                        <option value={false}>Out Of Stock</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label>Base Price<span className='text-danger'>*</span></label>
                                    <input type="number" value={data.baseprice} name="baseprice" onChange={getInputData} className='form-control' placeholder='Base Price' />
                                    {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.baseprice}</p> : ""}
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>Discount<span className='text-danger'>*</span></label>
                                    <input type="number" value={data.discount} name="discount" onChange={getInputData} className='form-control' placeholder='Discount' />
                                    {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.discount}</p> : ""}
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>Stock Quantity<span className='text-danger'>*</span></label>
                                    <input type="number" value={data.quantity} name="quantity" onChange={getInputData} className='form-control' placeholder='Stock Quantity' />
                                    {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.quantity}</p> : ""}
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Color<span className='text-danger'>*</span></label>
                                    <input type="text" value={data.color} name="color" onChange={getInputData} className='form-control' placeholder='Color' />
                                    {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.color}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Size<span className='text-danger'>*</span></label>
                                    <input type="text" name="size" value={data.size} onChange={getInputData} className='form-control' placeholder='Size' />
                                    {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.size}</p> : ""}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Description</label>
                                <div className='w-100' ref={refdiv}></div>
                            </div>

                            <div className="mb-3">
                                <label>Pic</label>
                                <input type="file" name="pic" multiple onChange={getInputData} className='form-control' />
                                {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.pic}</p> : ""}
                            </div>
                            {data.pic.length ? <p>Click on Image to Delete</p> : ""}
                            <div className='d-flex flex-wrap'>
                                {
                                    oldPic.map((item, index) => {
                                        return <div key={index} className='m-1'>
                                            <img src={`/${item}`} height={50} width={50} onClick={() => {
                                                oldPic.splice(index, 1)
                                                setFlag(!flag)
                                            }} />
                                        </div>
                                    })
                                }
                            </div>
                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
