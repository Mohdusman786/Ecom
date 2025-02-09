import React, { useEffect, useState } from 'react'
import Breadcrum from './Breadcrum'

import { useDispatch, useSelector } from "react-redux"
import { getProduct } from "../Store/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../Store/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../Store/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../Store/ActionCreators/BrandActionCreators"
import ProductItem from './ProductItem'
import { Link } from 'react-router-dom'
export default function Shop() {

    let [products, setProducts] = useState([])
    let [filteredData1, setFilteredData1] = useState([])
    let [filteredData2, setFilteredData2] = useState([])

    let [maincategories, setMaincategories] = useState([])
    let [subcategories, setSubcategories] = useState([])
    let [brands, setBrands] = useState([])
    let [flag, setFlag] = useState(true)
    let [search, setSearch] = useState("")
    let [min, setMin] = useState(0)
    let [max, setMax] = useState(1000)

    let [mc, setMc] = useState(new URLSearchParams(window.location.href).get("mc"))
    let [sc, setSc] = useState(new URLSearchParams(window.location.href).get("sc"))
    let [br, setBr] = useState(new URLSearchParams(window.location.href).get("br"))

    let dispatch = useDispatch()
    let ProductStateData = useSelector(state => state.ProductStateData)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)

    function priceFilter(e) {
        e.preventDefault()
        if (search)
            setProducts(filteredData2.filter((x) => x.finalprice >= min && x.finalprice <= max))
        else if (filteredData1.length)
            setProducts(filteredData1.filter((x) => x.finalprice >= min && x.finalprice <= max))
        else
            setProducts(ProductStateData.filter((x) => x.finalprice >= min && x.finalprice <= max))
    }

    function postSearch(e) {
        e.preventDefault()
        setMc(null)
        setSc(null)
        setBr(null)
        let srch = search.toLowerCase()
        let data = ProductStateData.filter((x) => x.name.toLowerCase().includes(srch) || x.maincategory.name.toLowerCase() === srch || x.subcategory.name.toLowerCase() === srch || x.brand.name.toLowerCase() === srch || x.color.toLowerCase() === srch || x?.description?.toLowerCase().includes(srch))
        setProducts(data)
        setFilteredData2(data)
    }

    function sortFilter(e) {
        let value = e.target.value
        if (value === "1")
            products.sort().reverse()
        else if (value === "2")
            products.sort((x, y) => x.finalprice - y.finalprice)
        else
            products.sort((x, y) => y.finalprice - x.finalprice)

        setFlag(!flag)
    }

    function filterData(mc, sc, br) {
        let data = []
        if (mc === null && sc === null && br === null)
            data = ProductStateData
        else if (mc !== null && sc === null && br === null)
            data = ProductStateData.filter((x) => x.maincategory.name === mc)
        else if (mc === null && sc !== null && br === null)
            data = ProductStateData.filter((x) => x.subcategory.name === sc)
        else if (mc === null && sc === null && br !== null)
            data = ProductStateData.filter((x) => x.brand.name === br)
        else if (mc !== null && sc !== null && br === null)
            data = ProductStateData.filter((x) => x.maincategory.name === mc && x.subcategory.name === sc)
        else if (mc !== null && sc === null && br === null)
            data = ProductStateData.filter((x) => x.maincategory.name === mc && x.brand.name === br)
        else if (mc === null && sc !== null && br !== null)
            data = ProductStateData.filter((x) => x.brand.name === br && x.subcategory.name === sc)
        else
            data = ProductStateData.filter((x) => x.brand.name === br && x.subcategory.name === sc && x.maincategory.name === mc)
        setProducts(data)
        setFilteredData1(data)
    }
    function getCategoryFilters(mc, sc, br) {
        setMc(mc)
        setSc(sc)
        setBr(br)
        setSearch("")
        setMin(0)
        setMax(1000)
        filterData(mc, sc, br)
    }

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (mc !== null || sc !== null || br !== null)
                filterData(mc, sc, br)
            else if (ProductStateData.length) {
                setProducts(ProductStateData)
            }
        })()
    }, [ProductStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
            if (MaincategoryStateData.length) {
                setMaincategories(MaincategoryStateData)
            }
        })()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
            if (SubcategoryStateData.length) {
                setSubcategories(SubcategoryStateData)
            }
        })()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getBrand())
            if (BrandStateData.length) {
                setBrands(BrandStateData)
            }
        })()
    }, [BrandStateData.length])
    return (
        <>
            <Breadcrum title="Shop" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-2 col-md-3">
                        <div className="list-group">
                            <Link to="#" className="list-group-item list-group-item-action active" aria-current="true">
                                Maincategory
                            </Link>
                            <button onClick={() => getCategoryFilters(null, sc, br)} className={`list-group-item list-group-item-action ${mc === null ? 'text-primary text-bold' : ''}`}>All</button>
                            {
                                maincategories.map((item, index) => {
                                    return <button onClick={() => getCategoryFilters(item.name, sc, br)} key={index} className={`list-group-item list-group-item-action ${mc === item.name ? 'text-primary text-bold' : ''}`}>{item.name}</button>
                                })
                            }
                        </div>
                        <div className="list-group my-3">
                            <Link to="#" className="list-group-item list-group-item-action active" aria-current="true">
                                Subcategory
                            </Link>
                            <button onClick={() => getCategoryFilters(mc, null, br)} className={`list-group-item list-group-item-action ${sc === null ? 'text-primary text-bold' : ''}`}>All</button>
                            {
                                subcategories.map((item, index) => {
                                    return <button onClick={() => getCategoryFilters(mc, item.name, br)} key={index} className={`list-group-item list-group-item-action ${sc === item.name ? 'text-primary text-bold' : ''}`}>{item.name}</button>
                                })
                            }
                        </div>
                        <div className="list-group my-3">
                            <Link to="#" className="list-group-item list-group-item-action active" aria-current="true">
                                Brands
                            </Link>
                            <button onClick={() => getCategoryFilters(mc, sc, null)} className={`list-group-item list-group-item-action ${br === null ? 'text-primary text-bold' : ''}`}>All</button>
                            {
                                brands.map((item, index) => {
                                    return <button onClick={() => getCategoryFilters(mc, sc, item.name)} key={index} className={`list-group-item list-group-item-action ${br === item.name ? 'text-primary text-bold' : ''}`}>{item.name}</button>
                                })
                            }
                        </div>
                        <h5 className='bg-primary text-light text-center p-2'>Price Range</h5>
                        <form onSubmit={priceFilter}>
                            <div className='my-3'>
                                <input type="number" name="min" value={min} onChange={(e) => setMin(e.target.value)} placeholder='Min Amount' className='form-control' />
                            </div>
                            <div className='my-3'>
                                <input type="number" name="max" value={max} onChange={(e) => setMax(e.target.value)} placeholder='Max Amount' className='form-control' />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Apply Filter</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-10 col-md-9">
                        <div className="row mb-2">
                            <div className="col-lg-9 col-md-8 col-12">
                                <form onSubmit={postSearch}>
                                    <div className="btn-group w-100">
                                        <input type="search" name="search" value={search} placeholder='Search Product...' onChange={(e) => setSearch(e.target.value)} className='form-control search-from' />
                                        <button type="submit" className='btn btn-primary'><i className='fa fa-search'></i></button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-3 col-md-4 col-12">
                                <select name="sort" onChange={sortFilter} className='form-control'>
                                    <option value="1">Latest</option>
                                    <option value="2">Price : L to H</option>
                                    <option value="3">Price : H to L</option>
                                </select>
                            </div>
                        </div>
                        <div className="row g-4">
                            {
                                products.map((item, index) => {
                                    return <div key={index} className='col-lg-3 col-md-4 col-sm-6 col-12'>
                                        <ProductItem item={item} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
