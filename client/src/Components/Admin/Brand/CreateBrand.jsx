import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import formValidations from "../../Validations/formValidations"
import Breadcrum from "../../Breadcrum"
import Sidebar from '../Sidebar'

import { addBrand, getBrand } from "../../../Store/ActionCreators/BrandActionCreators"
export default function CreateBrand() {
    let [data, setData] = useState({
        name: "",
        pic: ""
    })
    let [show, setShow] = useState(false)
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        pic: "Pic is Mendatory"
    })

    let dispatch = useDispatch()
    let BrandStateData = useSelector(state => state.BrandStateData)
    let navigate = useNavigate()
    function getInputData(e) {
        let name = e.target.name
        // let value = e.target.files?e.target.files[0].name:e.target.value
        let value = e.target.files?e.target.files[0]:e.target.value  //when real api is used
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: e.target.files?"":formValidations(e)
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
        let error = Object.values(errorMessage).find((x)=>x?.length!==0)
        if (!error) {
            let item = BrandStateData.find((x) => x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setErrorMessage((old)=>{
                    return{
                        ...old,
                        'name':"Brand Name Already Exist"
                    }
                })
                setShow(true)
            }
            else {
                // dispatch(addBrand({ name: data.name,pic:data.pic }))
                //when Real API is Used
                let formData = new FormData()
                formData.append("name",data.name)
                formData.append("pic",data.pic)
                dispatch(addBrand(formData))
                navigate("/admin/brand")
            }
        }
        else
            setShow(true)
    }
    function getAPIData() {
        dispatch(getBrand())
    }
    useEffect(() => {
        getAPIData()
    }, [BrandStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="col-9">
                        <h5 className='bg-primary text-light text-center p-2'>Brand <button className='float-end text-light border-0' style={{ background: "none" }} onClick={() => window.history.back()}><i className='fa fa-arrow-left'></i></button></h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name<span className='text-danger'>*</span></label>
                                <input type="text" name="name" onChange={getInputData} placeholder="Brand Name" className='form-control' />
                                {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage.name}</p> : ""}
                            </div>
                            <div className="mb-3">
                                <label>Pic<span className='text-danger'>*</span></label>
                                <input type="file" name="pic" onChange={getInputData} className='form-control' />
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
