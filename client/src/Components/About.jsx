import React from 'react'
import Breadcrum from './Breadcrum'
import AboutContent from './AboutContent'

export default function About() {
    return (
        <>
            <Breadcrum title="About" />
            <div className="container-xxl py-5">
                <AboutContent/>
            </div>
        </>
    )
}
