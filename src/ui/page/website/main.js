import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Home from './screen/home'



const Main =()=>{
    return (
            <Switch>
                
                <Route exact path= '/' component={Home}/>
            </Switch>
        )
}

export default Main