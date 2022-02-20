import { Box, Divider, Grid, Typography, useTheme } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../theme/theme-context';

import GroupedProductsItem from './GroupedProductsItem';

type Prop = {
  title: string;
  items: any[];
};

function GroupedProducts(props: Prop) {
  
  const themeCtx = useContext(ThemeContext);
  const theme = useTheme();

  const shuffledItems = props.items.sort(() => 0.5 - Math.random());
  let selectedItems = shuffledItems.slice(0, 6);

  const { i18n } = useTranslation();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: '0.5rem 1.5rem',
      }}
    >
      <Typography
        variant='h6'
        sx={{
          color: theme.palette.primary.light,
          position: 'relative',
          width: 1,
          margin: 0,
          paddingTop: '1rem',
          paddingBottom: '0.5rem',

          '&::after': {
            content: '""',
            position: 'absolute',
            backgroundColor: '#ab1d2b',
            width: '7rem',
            height: 3,
            bottom: 0,
            ...(i18n.dir() === 'ltr' && {
              left: 0,
            }),
            ...(i18n.dir() === 'rtl' && {
              right: 0,
            }),
          },
        }}
      >
        {props.title}
      </Typography>
      <Divider sx={{ backgroundColor: theme.palette.divider }} />
      <Grid container>
        {selectedItems.map((item) => (
          <Grid
            item
            key={item.id}
            xs={4}
            sx={{
              ...(i18n.dir() === 'ltr' && {
                borderRight: '1px solid',
                '&:nth-of-type(3n)': {
                  borderRight: 'none !important',
                },
              }),
              ...(i18n.dir() === 'rtl' && {
                borderLeft: '1px solid',
                '&:nth-of-type(3n)': {
                  borderLeft: 'none !important',
                },
              }),
              ...(themeCtx.currentMode === 'light' && {
                borderImageSource:
                  'linear-gradient(to bottom,#ffffff 25%, #e4e4e4 50%, #ffffff 75%)',
              }),
              ...(themeCtx.currentMode === 'dark' && {
                borderImageSource:
                  'linear-gradient(to bottom,#121212 25%, #e4e4e4 50%, #121212 75%)',
              }),
              borderImageSlice: 1,
            }}
          >
            <GroupedProductsItem
              id={item.id}
              title={item.title}
              image={item.images[0]}
              price={item.price}
              discount={item.discount}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default GroupedProducts;
