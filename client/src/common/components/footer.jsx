import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export const Footer = () => (
  <Grid
    container
    sx={{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      bottom: 0,
    }}
  >
    <Grid item>
      <Typography variant='body2' align='center'>
        Copyright © 2024 Made with ❤️ by &nbsp;
        <Typography
          component='a'
          sx={{ textDecoration: 'none' }}
          href='https://kilamaelie.com'
          variant='body2'
          target='_blank'
          color='gray'
        >
          KilamaElie.
        </Typography>
        &nbsp; All right reserved
      </Typography>
    </Grid>
  </Grid>
);
