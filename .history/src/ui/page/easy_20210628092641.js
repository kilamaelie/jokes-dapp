import React from '@material-ui/core'
import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom'
import Main from './ui/page/website/main'
import Dashboards from  './dashboard'
import AppBars from './ui/widget/appbar'
import Footer from './ui/widget/footer'


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