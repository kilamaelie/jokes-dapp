import React from 'react'
import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom'
import {ThemeProvider } from "@material-ui/core/styles";
import theme from './App_theme/theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import Easy from './ui/page/easy'
import Dashboards from  './ui/page/dashboard/dashboard'



const App =()=>{


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
           <Router>
            <Switch>
              <Route path= '/' component={Easy}/>
              <Route path='/dashboard' component={Dashboards}/>
            </Switch>
            </Router>
         
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App