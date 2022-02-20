import { useEffect, useState } from 'react';

import { useQuery } from 'react-query';
import apiClient from '../http-common';

import { useTranslation } from 'react-i18next';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

import ProductCarousel from '../components/ProductCarousel/ProductCarousel';
import GroupedProducts from '../components/GroupedProducts/GroupedProducts';

import ad from '../images/JBLAd.png';
import startupSocks from '../images/startupsocks.png';
import hp from '../images/hp.png';
import swatch from '../images/swatch.png';
import asus from '../images/asus.png';
import dell from '../images/dell.png';
import toshiba from '../images/toshiba.png';
import ImageSlider from '../components/ImageSlider/ImageSlider';

const images = [startupSocks, hp, swatch, asus, dell, toshiba];

function Homepage() {
  const { t } = useTranslation();
  const theme = useTheme();

  const [loadedProducts, setLoadedProducts] = useState<any[]>([]);

  /* 
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://ecommerce-app-57402-default-rtdb.europe-west1.firebasedatabase.app/product.json'
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const products: any[] = [];

        for (const key in data) {
          const product = {
            id: key,
            ...data[key],
          };
          products.push(product);
        }

        setLoadedProducts(products);
        setIsLoading(false);
      });
  }, []);
  */

  const { isLoading: isLoadingProducts, refetch: getAllProducts } = useQuery(
    'query-products',
    async () => {
      return await apiClient.get('/product.json');
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
        const products: any[] = [];

        for (const key in result.data) {
          const product = {
            id: key,
            ...result.data[key],
          };
          products.push(product);
          setLoadedProducts(products);
        }
      },
      onError: (err: { response: { data: any } }) => {
        console.log(err.response?.data || err);
      },
    }
  );
  useEffect(() => {
    getAllProducts();
  }, [isLoadingProducts, getAllProducts]);

  const laptopProducts = loadedProducts.filter(
    (product) => product.catalog === 'Laptop'
  );
  const audioProducts = loadedProducts.filter(
    (product) => product.catalog === 'Audio'
  );
  const cameraProducts = loadedProducts.filter(
    (product) => product.catalog === 'Camera'
  );
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme.breakpoints.down('md'));

  function firstCarouselQuery(): number {
    if (sm) {
      return 3;
    } else if (md) return 4;
    return 6;
  }
  function secondCarouselQuery(): number {
    if (sm) return 2;
    else if (md) return 3;
    return 4;
  }
  const firstCarouselItems = firstCarouselQuery();
  const secondCarouselItems = secondCarouselQuery();

  if (isLoadingProducts) return <Box></Box>;
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          padding: {
            xs: '1rem 0',
            md: '3rem 10%',
          },
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <ProductCarousel
          title={t('homepage.carouselOne')}
          itemsPerPage={firstCarouselItems}
          items={laptopProducts}
        />
      </Box>
      <Box
        sx={{
          paddingX: { xs: '0', md: '10%' },
        }}
      >
        <Box
          sx={{
            width: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingY: {
              xs: '1rem',
              md: '3rem',
            },
          }}
        >
          <Box sx={{ width: 1 }}>
            <ProductCarousel
              title={t('homepage.carouselTwo')}
              itemsPerPage={secondCarouselItems}
              items={audioProducts}
            />
          </Box>
          <Box
            component='img'
            src={ad}
            alt='JBL Bluetooth Speaker'
            sx={{
              height: 'auto',
              width: {
                xs: '30%',
              },
            }}
          ></Box>
        </Box>
        <Box
          dir='ltr'
          sx={{
            height: 50,
            display: 'flex',
            width: 1,
            marginBottom: '3rem',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#1c252e',
              height: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              clipPath: 'polygon(0 0, 100% 0%, 95% 100%, 0 100%)',
              flex: '1 0 70%',
            }}
          >
            <Typography
              variant='subtitle1'
              sx={{
                color: theme.palette.common.white,
                fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
              }}
            >
              {t('homepage.ad.promotion')}
            </Typography>
          </Box>
          <Box
            component='a'
            href='#!'
            sx={{
              height: 1,
              backgroundColor: '#ab1d2b',
              flex: '1 0 30%',
              marginLeft: {
                xs: '-2rem',
                md: '-5rem',
                lg: '-8rem',
              },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            <Typography
              variant='body2'
              sx={{
                color: theme.palette.common.white,
                paddingRight: '1rem',
                fontSize: {
                  xs: 10,
                  sm: 12,
                  md: 14,
                  lg: 16,
                },
              }}
            >
              {t('homepage.ad.button')}
            </Typography>
          </Box>
        </Box>
        <Box>
          <GroupedProducts
            title={t('homepage.grouped')}
            items={cameraProducts}
          />
        </Box>
        <ImageSlider images={images} />
      </Box>
    </Box>
  );
}

export default Homepage;
