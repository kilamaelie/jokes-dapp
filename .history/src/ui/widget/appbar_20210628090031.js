import React,{useState} from 'react'
import {Grid,AppBar,Toolbar,IconButton,Typography,Button,Dialog,DialogContent,DialogContentText,MenuItem,Menu,Badge} from '@material-ui/core';
// import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
// import { useTheme} from '@material-ui/core/styles'
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from '../style'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';




const AppBars =()=>{

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  //const theme = useTheme();
 // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // for the app bar
 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLogoutAndMenuClose = () =>{
    const logout = localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('user')
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location.reload();
    return logout
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogoutAndMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >   
          {/* <MenuItem>    
          <Typography className={classes.typoAppbar}>VENDOR</Typography>
          </MenuItem>
          <MenuItem>    
           <Typography className={classes.typoAppbar}>Contact</Typography>
          </MenuItem> */}
          {/* {
            token!=null? <div>
               <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
            </div>
            
            :  */}
             <div>
              <MenuItem>    
            <Button onClick={handleClickOpen}><Typography className={classes.typoAppbar}>Login</Typography></Button>
                    <Dialog
                        // fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                          >
                            <DialogContent>
                              <DialogContentText>
                                  {/* <Login/> */}
                              </DialogContentText>
                            </DialogContent>
                    </Dialog>
          </MenuItem>
            </div> 
          {/* } */}
      
     
    </Menu>
  );
  return (
      <Grid container direction='row'>
          {/* <Grid item xs={1} sm={1}></Grid> */}
          <Grid item xs={12} sm={12}>
          <AppBar position="fixed" elevation={1}  >
        <Toolbar>
          {/* <IconButton
            component={Link}
            to='/'
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <RestaurantMenuIcon className={classes.icon} />
          </IconButton> */}
          <Typography className={classes.title}  noWrap>
            Easy Kivu
          </Typography>
        
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
             {/* <Button ><Typography className={classes.typoAppbar}>VENDOR</Typography></Button>
            <Button><Typography className={classes.typoAppbar}>CONTACT</Typography></Button> */}
            {/* {token!=null?
            <div>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon  color="secondary"/>
              </Badge>
            </IconButton> 
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle color="secondary" />
            </IconButton>
            </div>
            : */}
             <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon className={classes.icon} />
            </IconButton>
          </div>
            <div>
               <Button onClick={handleClickOpen}><Typography className={classes.typoAppbar}>LOGIN</Typography></Button>
                <Dialog
                    // fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                      >
                        <DialogContent>
                          <DialogContentText>
                          {/* <Login/> */}
                          </DialogContentText>
                        </DialogContent>
                      
                    </Dialog>
            </div>

            {/* } */}

          </div>
         
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
          </Grid>
          {/* <Grid item xs={1} sm={1}></Grid> */}
      </Grid>
  )

}
export default AppBars