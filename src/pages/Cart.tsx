import { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import {
  Box,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Typography,
  Paper,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import CartContext from '../store/cart-context';

function Cart() {
  const { t, i18n } = useTranslation();

  const theme = useTheme();

  const cartCtx = useContext(CartContext);

  const calculatePrice = (price: number, discount: number) => {
    if (discount === 0) {
      return price;
    } else {
      return price - price * discount;
    }
  };
  return (
    <Box
      sx={{
        padding: { xs: '3rem 1rem', lg: '3rem 10%' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography
        variant='h2'
        sx={{
          fontWeight: 400,
          marginY: '3rem',
          fontSize: { xs: 24, sm: 32, md: 48, lg: 60 },
          color: theme.palette.primary.main,
        }}
      >
        {t('cart.title')}
      </Typography>
      <Grid container>
        <Grid
          item
          xs={12}
          lg={8}
          sx={
            i18n.dir() === 'ltr'
              ? { paddingRight: { xs: 0, lg: '3rem' } }
              : { paddingLeft: { xs: 0, lg: '3rem' } }
          }
        >
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ backgroundColor: theme.palette.background.default }}
          >
            <Table size='small' aria-label='a dense table'>
              <TableHead sx={{ borderTop: 'thin solid #dedede' }}>
                <TableRow>
                  <TableCell
                    align={i18n.dir() === 'ltr' ? 'left' : 'right'}
                    sx={{
                      width: '90%',
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                    }}
                  >
                    {t('cart.table.product')}
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                    }}
                  >
                    {t('cart.table.price')}
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                    }}
                  >
                    {t('cart.table.quantity')}
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                    }}
                  >
                    {t('cart.table.total')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartCtx.products.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          paddingY: '1rem',
                        }}
                      >
                        <Box
                          component='img'
                          src={row.images[0]}
                          sx={{
                            width: { xs: 50, sm: 60, md: 75, lg: 100 },
                            height: { xs: 50, sm: 60, md: 75, lg: 100 },
                            objectFit: 'contain',
                          }}
                        />
                        <Box
                          sx={{
                            marginLeft: {
                              xs: '0.5rem',
                              sm: '1.5rem',
                              md: '3rem',
                              lg: '5rem',
                            },
                          }}
                        >
                          <Typography
                            variant='subtitle1'
                            sx={{
                              color: theme.palette.primary.main,
                              fontWeight: 200,
                              fontSize: { xs: 10, sm: 12, md: 14, lg: 16 },
                            }}
                          >
                            {row.title}
                          </Typography>
                          {row.discount > 0 ? (
                            <Box
                              sx={{ display: 'flex', alignItems: 'baseline' }}
                            >
                              <Typography
                                variant='body1'
                                sx={{
                                  fontWeight: 500,
                                  fontSize: { xs: 10, sm: 12, md: 14, lg: 16 },
                                  color: theme.palette.secondary.main,
                                }}
                              >
                                $
                                {calculatePrice(
                                  row.price,
                                  row.discount
                                ).toFixed(2)}
                              </Typography>
                              <Typography
                                variant='subtitle2'
                                sx={{
                                  color: theme.palette.primary.main,
                                  fontWeight: 700,
                                  textDecoration: 'line-through',
                                  marginLeft: '1rem',
                                  fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                                }}
                              >
                                ${row.price.toFixed(2)}
                              </Typography>
                            </Box>
                          ) : (
                            <Typography
                              dir='ltr'
                              variant='body1'
                              sx={{
                                fontWeight: 500,
                                fontSize: { xs: 10, sm: 12, md: 14, lg: 16 },
                                color: theme.palette.secondary.main,
                              }}
                            >
                              ${row.price.toFixed(2)}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography
                        variant='body1'
                        sx={{
                          fontWeight: 500,
                          fontSize: { xs: 10, sm: 12, md: 14, lg: 16 },
                          color: theme.palette.secondary.main,
                        }}
                      >
                        ${calculatePrice(row.price, row.discount).toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: 'thin solid #cdcdcd',
                        }}
                      >
                        <Button
                          variant='text'
                          sx={{
                            fontWeight: 200,
                            minWidth: 10,
                            color: '#cdcdcd',
                            fontSize: { xs: 12, sm: 16, md: 20, lg: 24 },
                          }}
                          onClick={() => cartCtx.decrementAmount(row.id)}
                        >
                          -
                        </Button>
                        <Box
                          sx={{
                            fontSize: { xs: 8, sm: 12, md: 16, lg: 20 },
                            color: theme.palette.primary.main,
                          }}
                        >
                          {row.amount}
                        </Box>
                        <Button
                          variant='text'
                          sx={{
                            fontWeight: 200,
                            minWidth: 10,
                            color: '#cdcdcd',
                            fontSize: { xs: 12, sm: 16, md: 20, lg: 24 },
                          }}
                          onClick={() => cartCtx.incrementAmount(row.id)}
                        >
                          +
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell align='center'>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          variant='body1'
                          sx={{
                            fontWeight: 500,
                            fontSize: { xs: 10, sm: 12, md: 14, lg: 16 },
                            color: theme.palette.secondary.main,
                          }}
                        >
                          $
                          {(
                            calculatePrice(row.price, row.discount) * row.amount
                          ).toFixed(2)}
                        </Typography>
                        <IconButton
                          onClick={() => cartCtx.removeProduct(row.id)}
                        >
                          <CloseIcon
                            sx={{
                              fontSize: { xs: 12, sm: 16, md: 24, lg: 32 },
                              color: theme.palette.primary.main,
                            }}
                          />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            marginTop: { xs: '2rem', lg: '0rem' },
            border: 'thin solid #dedede',
            backgroundColor: theme.palette.background.paper,
            height: { xs: '300px', lg: '350px' },
          }}
        >
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ backgroundColor: theme.palette.background.paper }}
          >
            <Table size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow>
                  <TableCell
                    align={i18n.dir() === 'ltr' ? 'left' : 'right'}
                    sx={{
                      paddingY: '1rem',
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                    }}
                  >
                    {t('cart.checkout.summary')}
                  </TableCell>
                  <TableCell align='right'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography
                      variant='body2'
                      align={i18n.dir() === 'ltr' ? 'left' : 'right'}
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                      }}
                    >
                      {t('cart.checkout.subtotal')}
                    </Typography>
                  </TableCell>
                  <TableCell align={i18n.dir() === 'ltr' ? 'right' : 'left'}>
                    <Typography
                      variant='body1'
                      sx={{
                        fontWeight: 500,
                        fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                        color: theme.palette.primary.main,
                      }}
                    >
                      ${cartCtx.totalPrice.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography
                      variant='body2'
                      align={i18n.dir() === 'ltr' ? 'left' : 'right'}
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                      }}
                    >
                      {t('cart.checkout.shipping')}
                    </Typography>
                  </TableCell>
                  <TableCell align={i18n.dir() === 'ltr' ? 'right' : 'left'}>
                    <Typography
                      variant='body1'
                      sx={{
                        fontWeight: 500,
                        fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                        color: theme.palette.primary.main,
                      }}
                    >
                      $5.00
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 0 }}>
                    <Typography
                      variant='body2'
                      align={i18n.dir() === 'ltr' ? 'left' : 'right'}
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                      }}
                    >
                      {t('cart.checkout.total')}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align={i18n.dir() === 'ltr' ? 'right' : 'left'}
                    sx={{ border: 0 }}
                  >
                    <Typography
                      variant='body1'
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                        fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                      }}
                    >
                      ${(cartCtx.totalPrice + 5).toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              variant='contained'
              sx={{
                fontWeight: 700,
                width: '10rem',
                height: '3rem',
                borderRadius: 0,
                backgroundColor: '#ab1d2b',
                boxShadow: 0,
                marginY: '2rem',
                '&:hover': {
                  backgroundColor: '#d92121',
                },
              }}
            >
              {t('cart.checkout.button')}
            </Button>
            <Typography
              variant='subtitle1'
              sx={{
                fontSize: { xs: 10, sm: 12, md: 14, lg: 16 },
                color: theme.palette.primary.main,
              }}
            >
              {t('cart.checkout.subtitle')}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Cart;
