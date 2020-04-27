import React, { useState } from 'react'
import Navbar from './Navbar'
import Json from './1_json';
import Xml from './2_xml';
import {Tabs, Tab, Paper} from '@material-ui/core'

export default function Playground(){
    const [currentTab, setCurrentTab] = useState(0)
    return(
        <div style={{height: "100vh", width: "100%", display: "flex", flexDirection: "column", backgroundColor: "rgb(249, 249, 249)"}}>
            <Navbar/>
            <div style={{padding: "2rem", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", overflow: "auto"}}>
                <Tabs
                    value={currentTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(e,v) => setCurrentTab(v)}
                >
                    <Tab label="JSON" />
                    <Tab label="XML" />
                </Tabs>
                <Paper style={{padding: "1rem"}}>

                </Paper>
            {currentTab === 0 && <Json/> }
             {currentTab === 1 &&   <Xml/>}
            </div>
        </div>
    )
}