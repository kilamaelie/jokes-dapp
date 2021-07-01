import React from 'react'
import {Switch,Route} from 'react-router-dom'
import {ThemeProvider } from "@material-ui/core/styles";
import theme from './App_theme/theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import Easy from './ui/page/easy'


const App =()=>{


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
         
           
            <Switch>
              <Route path= '/' component={Main}/>
            </Switch>
           
         
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App