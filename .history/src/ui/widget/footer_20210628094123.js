import React from 'react'
import {Grid,Paper} from '@material-ui/core'


const Footer=()=>{
    return (
        <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid container spacing={4}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>left</Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>rigth</Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
               <Paper>
                <Grid container justify='center' alignItems='center'>
                        <Grid item>&copy</Grid>
                    </Grid>
               </Paper>
            </Grid>
        </Grid>
    )
}


export default Footer;