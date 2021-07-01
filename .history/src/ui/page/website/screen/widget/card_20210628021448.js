import React from 'react'
import {Grid,TextField,Typography} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Pizza from '../../../../../assets/pizza.png'


const CardItem =()=>{
    return (
        <Card elevation={5} >
        {/* <CardActionArea> */}
          <CardMedia
            style={{height:180}}
            image={Pizza}
            // title={imagetitle}
          />
          <CardContent>
            <Typography variant="caption" variant='h4' component="h2" >
              Pizza
            </Typography>
            <Typography gutterBottom  component="h2" >
              Kivu resto
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{height:40}}>
             lorem , 
            </Typography>
          </CardContent>
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
              <Button size="small" color="secondary" >
                Add to cart
              </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    )
}


export default CardItem;


