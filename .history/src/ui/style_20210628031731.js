import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme)=>({

    app:{
        background:'white',
        //marginTop:10,
        // marginbo
        
    },
   
    grow: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(4),
      },
      title: {
       // display: '',
        color:theme.palette.primary.secondary,
        fontWeight: 400 ,
        [theme.breakpoints.up('sm')]: {
          display: 'block',
          fontWeight: 400 
        },
      },
     
      sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
      sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
    icon:{
        color:theme.palette.primary.secondary,
    },
    typoAppbar:{
      color:theme.palette.primary.secondary,
      fontSize: 15,
      fontWeight:400
    },
    homeAppbar:{
      marginTop:40,
      backgroundColor:theme.palette.primary.secondary,
      height:80,
      borderRadius:"10px"
    },
    margin_40:{
      marginTop: 90,
      marginBottom:40
    }

}))