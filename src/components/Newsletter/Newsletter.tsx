import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';

function Newsletter() {
  const theme: Theme = useTheme();

  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingY: 6,
      }}
    >
      <Typography
        variant='h4'
        sx={{
          color: theme.palette.primary.main,
          fontWeight: 700,
        }}
      >
        {t('newsletter.title')}
      </Typography>

      <Typography
        variant='subtitle1'
        sx={{
          color: theme.palette.grey[500],
          marginBottom: 4,
        }}
      >
        {t('newsletter.subtitle')}
      </Typography>
      <Box
        component='form'
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: {
            xs: 0.95,
            sm: 0.8,
            md: 0.6,
            lg: 0.45,
          },
        }}
      >
        <TextField
          size='small'
          placeholder={t('newsletter.email')}
          sx={{
            '& fieldset': {
              borderRadius: '0px',
            },
            '& ::placeholder': {
              color: '#808080',
              fontWeight: 500,
            },
            backgroundColor: '#FFFFFF',
            width: '80%',
            marginX: '1rem',
          }}
        ></TextField>
        <Button
          type='submit'
          variant='contained'
          sx={{
            fontWeight: 700,
            width: '10rem',
            height: '3rem',
            borderRadius: 0,
            backgroundColor: '#ab1d2b',
            boxShadow: 0,
            '&:hover': {
              backgroundColor: '#d92121',
            },
          }}
        >
          {t('newsletter.button')}
        </Button>
      </Box>
    </Box>
  );
}
export default Newsletter;
