import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#dbdbdb',
    },
    secondary: {
      main: '#ec1835',
    },
    background: {
      paper: '#595959',
    },
  },
});

export default darkTheme;
