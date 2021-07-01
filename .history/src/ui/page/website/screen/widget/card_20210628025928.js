import React from 'react'
import {Grid,TextField,Typography,IconButton} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Pizza from '../../../../../assets/pizza.png'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const CardItem =()=>{
    return (
        <Card elevation={5} >
        {/* <CardActionArea> */}
          <CardMedia
            style={{height:140}}
            image={Pizza}
            // title={imagetitle}
          />
          <CardContent>
            <Typography variant="caption" variant='h4' component="h2" >
              Pizza
            </Typography>
            <Grid container>
              <Grid item xs={8} sm={8}>
              <Typography align='ri'  component="h2" >
              Kivu resto
            </Typography>
              </Grid>
             < Grid item xs={4} sm={4}>
              <Typography>
             <FiberManualRecordIcon color='secondary' style={{fontSize:10}}/> open
            </Typography>
              </Grid>
            </Grid>
          
            <Typography variant="body2" color="textSecondary" style={{height:30}}>
             lorem , sporum later kweli
            </Typography>
          
        {/* </CardActionArea> */}
        <CardActions>
          <Grid container>
            <Grid item sm={6} md={6} xs={6} justify="center">
              <Typography variant="caption">
                $ 2.5
              </Typography> 
            </Grid>
            <Grid item md={6} xs={6}>
              <Grid container direction="column" justify="center" alignItems="flex-end">
              <IconButton size="small" color="secondary" >
                <ShoppingCartOutlinedIcon/>
              </IconButton>
              </Grid>
            </Grid>
          </Grid>
          
        </CardActions>
        </CardContent>
      </Card>
    )
}


export default CardItem;


