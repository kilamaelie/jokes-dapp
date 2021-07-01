import React from '@material-ui/core'
import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom'
import Main from './website/main'
import Dashboards from  './dashboard/dashboard'
import AppBars from '../widget/appbar'
import Footer from '../widget//footer'


const Easy =()=>{
    return (
        <Router>
             <AppBars/>
                <Switch>
                <Route path='/dashboard' component={Dashboards}/>
                <Route path= '/' component={Main}/>
                </Switch>
            <Footer/>
        </Router>
    )
}

export default Easy;