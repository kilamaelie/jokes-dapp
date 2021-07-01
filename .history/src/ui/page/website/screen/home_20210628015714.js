import React from 'react'
import useStyles from '../../../style'
import {Grid,TextField,InputAdornment} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import CardItem from '../screen/widget/card'


const Home = () =>{
    const classes =useStyles()

    return (
        <Grid container direction='row' spacing={2} >
            <Grid item xs={1} sm={1}></Grid>
            <Grid item xs={10} sm={10}  >
               <Grid container spacing={4} className={classes.margin_40} >
                  
                   <Grid item xs={12} sm={12}>
                       <TextField
                        variant='outlined'
                        fullWidth
                        onFocus
                        placeholder="enter some name"
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="end">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                       />
                   </Grid>
                   <Grid item xs={12} sm={12}>
                       <Grid container spacing ={2}>
                           <Grid item xs={12} sm={3}>
                           <CardItem/>
                           </Grid>
                           <Grid item xs={12} sm={3}>
                           <CardItem/>
                           </Grid>
                           <Grid item xs={12} sm={3}>
                           <CardItem/>
                           </Grid>
                           <Grid item xs={12} sm={3}>
                           <CardItem/>
                           </Grid>
                       </Grid>
                   </Grid>
               </Grid>
            </Grid>
            <Grid item xs={1} sm={1}></Grid>
        </Grid>
    )
}

export default Home