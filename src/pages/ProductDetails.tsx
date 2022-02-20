import { useState, useEffect, useContext } from 'react';

import { useParams } from 'react-router-dom';

import { useQuery } from 'react-query';
import apiClient from '../http-common';

import { useTranslation } from 'react-i18next';

import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  IconButton,
  Link,
  Typography,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import CartContext from '../store/cart-context';

type Product = {
  id: string | undefined;
  catalog: string;
  description: string;
  discount: number;
  images: string[];
  price: number;
  sku: string;
  title: string;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  dir?: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, dir, ...other } = props;
  const theme = useTheme();

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography
            sx={{
              fontSize: { xs: 10, sm: 12, md: 14, lg: 16 },
              color: theme.palette.primary.main,
            }}
            dir={props.dir}
          >
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function ProductDetails() {
  const { t } = useTranslation();

  const theme = useTheme();

  const { productId } = useParams();

  const [currentImage, setCurrentImage] = useState(0);
  const [loadedProduct, setLoadedProduct] = useState<Product>({
    id: '',
    catalog: '',
    description: '',
    discount: 0,
    price: 0,
    sku: '',
    title: '',
    images: [],
  });
  /*
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    
    fetch(
      `https://ecommerce-app-57402-default-rtdb.europe-west1.firebasedatabase.app/product/${productId}.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const product: Product = data;
        product.id = productId;
        setLoadedProduct(product);
        setCurrentImage(0);
      });

    setIsLoading(false);
  }, [productId]);

*/
  const { isLoading: isLoadingProduct, refetch: getProduct } = useQuery(
    'query-product',
    async () => {
      return await apiClient.get(`/product/${productId}.json`);
    },
    {
      enabled: false,
      onSuccess: (res: {
        status: string;
        statusText: string;
        headers: any;
        data: any;
      }) => {
        const result = {
          status: res.status + '-' + res.statusText,
          headers: res.headers,
          data: res.data,
        };
        const product: Product = result.data;
        product.id = productId;
        setLoadedProduct(product);
        setCurrentImage(0);
      },
      onError: (err: { response: { data: any } }) => {
        console.log(err.response?.data || err);
      },
    }
  );
  useEffect(() => {
    getProduct();
  }, [isLoadingProduct, getProduct]);

  const [amount, setAmount] = useState(1);

  function handleDecrement() {
    if (amount > 1) setAmount(amount - 1);
  }
  function handleIncrement() {
    setAmount(amount + 1);
  }

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function clickImage(num: number) {
    setCurrentImage(num);
  }

  const cartCtx = useContext(CartContext);

  function addToCart() {
    const quantity = {
      amount: amount,
    };
    cartCtx.addProduct(Object.assign(loadedProduct, quantity));
  }
  if (isLoadingProduct) return <Box></Box>;
  return (
    <Box
      sx={{
        padding: {
          xs: '1rem 1rem',
          sm: '2rem 1rem',
          md: '3rem 1rem',
          lg: '3rem 10%',
        },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid container>
        <Grid
          item
          xs={6}
          sm={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: { xs: 'flex-start', lg: 'center' },
          }}
        >
          {loadedProduct.images.map((image: string, index: number) => (
            <Box
              key={index}
              component='img'
              onClick={() => clickImage(index)}
              src={image}
              sx={
                currentImage === index
                  ? {
                      border: 'thin solid',
                      borderColor: theme.palette.secondary.main,
                      height: { xs: 40, sm: 40, md: 75, lg: 150 },
                      width: { xs: 40, sm: 40, md: 75, lg: 150 },
                      objectFit: 'contain',
                      borderRadius: 0,
                    }
                  : {
                      border: 'thin solid',
                      borderColor: theme.palette.grey[400],
                      height: { xs: 40, sm: 40, md: 75, lg: 150 },
                      width: { xs: 40, sm: 40, md: 75, lg: 150 },
                      objectFit: 'contain',
                      borderRadius: 0,
                    }
              }
            />
          ))}
        </Grid>
        <Grid
          item
          xs={6}
          sm={5}
          sx={{
            display: 'flex',
            justifyContent: { xs: 'flex-start', lg: 'center' },
            alignItems: 'center',
          }}
        >
          <Box
            component='img'
            src={loadedProduct.images[currentImage]}
            sx={{
              height: { xs: 100, sm: 200, md: 300, lg: 435 },
              width: { xs: 100, sm: 200, md: 300, lg: 435 },
              objectFit: 'contain',
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: { xs: 'center', sm: 'flex-start' },
          }}
        >
          <Breadcrumbs
            aria-label='breadcrumb'
            sx={{
              fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
              fontWeight: 400,
              color: theme.palette.grey[300],
            }}
          >
            <Link
              underline='hover'
              color='inherit'
              href='/'
              sx={{
                paddingRight: '1rem',
                fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                fontWeight: 400,
                color: theme.palette.grey[300],
              }}
            >
              {t('product.breadcrumb')}
            </Link>
            <Typography
              sx={{
                paddingLeft: '1rem',
                fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                fontWeight: 400,
                color: theme.palette.grey[300],
              }}
            >
              {loadedProduct.title}
            </Typography>
          </Breadcrumbs>
          <Typography
            variant='h4'
            sx={{
              fontWeight: 700,
              marginTop: '1rem',
              marginBottom: '2rem',
              fontSize: { xs: 14, sm: 18, md: 24, lg: 34 },
              color: theme.palette.primary.main,
            }}
          >
            {loadedProduct.title}
          </Typography>
          {loadedProduct.discount > 0 ? (
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 700,
                  color: theme.palette.secondary.main,
                  marginBottom: '1rem',
                  fontSize: { xs: 12, sm: 14, md: 18, lg: 20 },
                }}
              >
                $
                {(
                  loadedProduct.price -
                  loadedProduct.price * loadedProduct.discount
                ).toFixed(2)}
              </Typography>
              <Typography
                variant='subtitle2'
                sx={{
                  color: theme.palette.grey[500],
                  fontWeight: 700,
                  textDecoration: 'line-through',
                  marginLeft: '1rem',
                  fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                }}
              >
                ${loadedProduct.price.toFixed(2)}
              </Typography>
            </Box>
          ) : (
            <Typography
              variant='h6'
              sx={{
                fontWeight: 700,
                color: theme.palette.secondary.main,
                marginBottom: '1rem',
                fontSize: { xs: 12, sm: 14, md: 18, lg: 20 },
              }}
            >
              ${loadedProduct.price.toFixed(2)}
            </Typography>
          )}
          <Typography
            variant='body1'
            sx={{
              marginBottom: '2rem',
              fontSize: { xs: 10, sm: 12, md: 14, lg: 16 },
              color: theme.palette.primary.main,
            }}
          >
            {loadedProduct.description}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: 1,
              height: '3rem',
              marginBottom: '1rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
                border: 'thin solid #cdcdcd',
              }}
            >
              <Button
                variant='text'
                sx={{
                  fontWeight: 200,
                  minWidth: 30,
                  fontSize: { xs: 12, sm: 16, md: 20, lg: 24 },
                  color: '#cdcdcd',
                }}
                onClick={handleDecrement}
              >
                -
              </Button>
              <Box
                sx={{
                  fontSize: { xs: 12, sm: 16, md: 20, lg: 24 },
                  color: theme.palette.primary.main,
                }}
              >
                {amount}
              </Box>
              <Button
                variant='text'
                sx={{
                  fontWeight: 200,
                  minWidth: 30,
                  fontSize: { xs: 12, sm: 16, md: 20, lg: 24 },
                  color: '#cdcdcd',
                }}
                onClick={handleIncrement}
              >
                +
              </Button>
            </Box>
            <IconButton
              sx={{
                borderRadius: 0,
                border: 'thin solid #cdcdcd',
                color: theme.palette.primary.main,
              }}
            >
              <AutorenewIcon />
            </IconButton>
            <IconButton
              sx={{
                borderRadius: 0,
                border: 'thin solid #cdcdcd',
                color: theme.palette.primary.main,
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Box>

          <Button
            variant='contained'
            onClick={addToCart}
            sx={{
              width: 1,
              height: '3rem',
              borderRadius: 0,
              backgroundColor: '#000000',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#333333',
              },
              marginBottom: '1.5rem',
              boxShadow: 'none',
            }}
          >
            {t('product.button')}
          </Button>

          <Typography
            variant='subtitle2'
            sx={{
              color: '#7a7a7a',
              marginBottom: '3rem',
              fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
            }}
          >
            {loadedProduct.title} {t('product.info')}
          </Typography>

          <Typography
            variant='body1'
            sx={{
              fontWeight: 500,
              color: '#9c9c9c',
              fontSize: { xs: 10, sm: 12, md: 14, lg: 16 },
            }}
          >
            SKU: {loadedProduct.sku}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', padding: { md: '5%', lg: '10%' } }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs'
            centered
            textColor='inherit'
            TabIndicatorProps={{
              style: {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            <Tab
              sx={{
                fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                color: theme.palette.primary.main,
              }}
              label={t('product.tab.details')}
              {...a11yProps(0)}
            />
            <Tab
              sx={{
                fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                color: theme.palette.primary.main,
              }}
              label={t('product.tab.info')}
              {...a11yProps(1)}
            />
            <Tab
              sx={{
                fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                color: theme.palette.primary.main,
              }}
              label={t('product.tab.reviews')}
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} dir='ltr'>
          {loadedProduct.description}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {t('product.tab.unimplemented')}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {t('product.tab.unimplemented')}
        </TabPanel>
      </Box>
    </Box>
  );
}

export default ProductDetails;
