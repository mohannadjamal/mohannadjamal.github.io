import { createTheme } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1c252e',
    },
    secondary: {
      main: '#ab1d2b',
    },
    background: {
      paper: '#ebebeb',
    },
  },
});

export default lightTheme;
