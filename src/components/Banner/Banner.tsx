import { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import {
  IconButton,
  Badge,
  Box,
  Typography,
  Link,
  useTheme,
} from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import CartContext from '../../store/cart-context';

import logo from '../../images/logo.svg';
import logoDark from '../../images/logo-dark.png';
import ThemeContext from '../../theme/theme-context';

function Banner() {
  const theme = useTheme();
  const cartCtx = useContext(CartContext);
  const themeCtx = useContext(ThemeContext);

  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: 1,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
        justifyContent: 'space-between',
        padding: { xs: ' 0 0.5rem', md: '0 10%' },
      }}
    >
      <Link href='/'>
        <Box
          component='img'
          src={themeCtx.currentMode === 'light' ? logo : logoDark}
          alt='Logo'
          sx={{
            height: 'auto',
            width: {
              xs: 100,
              sm: 200,
            },
          }}
        />
      </Link>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={() => themeCtx.toggleMode()}>
          {theme.palette.mode === 'dark' ? (
            <Brightness7Icon sx={{ color: theme.palette.primary.main }} />
          ) : (
            <Brightness4Icon sx={{ color: theme.palette.primary.main }} />
          )}
        </IconButton>
        <IconButton>
          <Badge badgeContent={0} color='error' showZero>
            <AutorenewIcon
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          </Badge>
        </IconButton>
        <IconButton>
          <Badge badgeContent={0} color='error' showZero>
            <FavoriteBorderIcon
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          </Badge>
        </IconButton>
        <IconButton component={Link} href='/cart'>
          <Badge badgeContent={cartCtx.totalProducts} color='error' showZero>
            <ShoppingCartOutlinedIcon
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          </Badge>
        </IconButton>
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'column',
            textAlign: 'center',
            marginLeft: 2,
          }}
        >
          <Typography
            variant='body1'
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              fontSize: { xs: 12, sm: 18 },
            }}
          >
            {t('banner.cart')}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              color: theme.palette.primary.main,
              fontSize: { xs: 10, sm: 16 },
            }}
          >
            ${cartCtx.totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Banner;
