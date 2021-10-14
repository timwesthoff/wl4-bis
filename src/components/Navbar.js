import React from 'react'
import thuLogo from '../img/thu-logo.png'

export default function Navbar(){
    return (
        <div style={{width: "100%", height: "80px", borderBottom: "1px solid #cdd9e1", backgroundColor: "white", display: "flex", alignItems: "center"}}>
            <div style={{margin: "0 2rem"}}>
                <a href="/">
                    <img height="80" src={thuLogo} alt="THU Logo"/>
                </a>
            </div>
            <div>
                BIS WL 4<br/>XML & JSON Exercise
            </div>
        </div>
    )
}