import React from "react";
import AppBar from "@material-ui/core/AppBar"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './Navigator.css';

import { Link } from "react-router-dom"



export default function Navigator() {
    return (<div className="navi">
        <AppBar position="static">
                <Tabs aria-label="simple tabs example" value={false} variant="fullWidth" textColor="">
                    <Tab label="Jackets" component={Link}  index={0} to="/jackets"/>
                    <Tab label="Shirts" component={Link} index={1} to="/shirts"/>
                    <Tab label="Accessories" component={Link} index={2} to="/accessories"/>
                </Tabs>

        </AppBar>
    </div>)

}