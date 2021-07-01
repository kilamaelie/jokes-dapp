import React from 'react'
import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom'
import {ThemeProvider } from "@material-ui/core/styles";
import theme from './App_theme/theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import Main from './ui/page/website/main'
import Dashboards from  './ui/page/dashboard/dashboard'
import AppBars from './ui/widget/appbar'



const App =()=>{


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
          <Router>
            <AppBars/>
            <Switch>
              <Route path='/dashboard' component={Dashboards}/>
              <Route path= '/' component={Main}/>
            </Switch>
          </Router>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App