import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import formValidations from "../../Validations/formValidations"
import Breadcrum from "../../Breadcrum"
import Sidebar from '../Sidebar'

import { addMaincategory, getMaincategory } from "../../../Store/ActionCreators/MaincategoryActionCreators"
export default function CreateMainctegory() {
    let [name, setName] = useState("")
    let [show, setShow] = useState(false)
    let [errorMessage, setErrorMessage] = useState("Name Field is Mendatory")

    let dispatch = useDispatch()
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let navigate = useNavigate()
    function getInputData(e) {
        setName(e.target.value)
        setErrorMessage(formValidations(e))
        // setShow(false)
    }

    function postData(e) {
        e.preventDefault()
        if (errorMessage.length === 0) {
            let item = MaincategoryStateData.find((x) => x.name.toLowerCase() === name.toLowerCase())
            if (item) {
                setErrorMessage("Maincategory Name Already Exist")
                setShow(true)
            }
            else {
                dispatch(addMaincategory({ name: name }))
                navigate("/admin/maincategory")
            }
        }
        else
            setShow(true)
    }
    function getAPIData() {
        dispatch(getMaincategory())
    }
    useEffect(() => {
        getAPIData()
    }, [MaincategoryStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="col-9">
                        <h5 className='bg-primary text-light text-center p-2'>Maincategory <button className='float-end text-light border-0' style={{ background: "none" }} onClick={() => window.history.back()}><i className='fa fa-arrow-left'></i></button></h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name<span className='text-danger'>*</span></label>
                                <input type="text" name="name" onChange={getInputData} placeholder="Maincategory Name" className='form-control' />
                                {show ? <p className='text-danger px-2 py-1 text-capitalize'>{errorMessage}</p> : ""}
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
