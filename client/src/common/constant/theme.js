import { createTheme } from '@mui/material';

const theme = createTheme({
  direction: 'ltr',
  palette: {
    mode: 'light',
    background: {
      default: '#080808',
      paper: '#F0F0F0',
    },

    primary: {
      main: '#FFF',
      light: '#080808',
      dark: '#0F0F0F',
    },
    secondary: {
      main: '#202020',
      light: '#131313',
      // dark: '#959595',
    },
    text: {
      primary: '#FFF',
      secondary: '#959595',
      disabled: '#545454',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '12px',
          textDecoration: 'capitalize',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '12px',
          color: '#000000',
          height: '40px',
          borderRadius: '10px',
          ':hover': {
            border: '1px solid #C4C4C4',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-style: normal;
          font-display: swap;
          font-weight: normal;
        }
        body {
            margin: 0;
            display: flex;
            background-color: #080808;
            -webkit-box-flex-wrap: wrap;
            -webkit-flex-wrap: wrap;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
			gap: 7;
          }
      `,
    },
  },
  typography: {
    h1: {
      fontStyle: 'normal',
      fontWeight: 'extra-bold',
      fontSize: '30.78px',
    },
    h2: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '28.81px',
    },
    h3: {
      fontStyle: 'normal',
      fontWeight: 'semibold',
      fontSize: '24.18px',
    },
    h4: {
      fontStyle: 'normal',
      fontWeight: 'regular',
      fontSize: '22.65px',
    },
    h5: {
      fontSize: '18px',
      fontStyle: 'medium',
      fontWeight: 500,
    },
    h6: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '16px',
    },
    body1: {
      fontStyle: 'normal',
      fontSize: '14px',
      fontWeight: 300,
    },
    body2: {
      fontStyle: 'normal',
      fontWeight: 300,
      fontSize: '12px',
    },
    subtitle1: {
      fontStyle: 'normal',
      fontWeight: 'regular',
      fontSize: '14px',
    },
    subtitle2: {
      fontStyle: 'normal',
      fontWeight: 300,
      fontSize: '12px',
    },
    caption: {
      fontStyle: 'normal',
      fontWeight: 'light',
      fontsize: '10px',
    },
  },
});

export default theme;
