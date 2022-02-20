import { useContext, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
  Box,
  Divider,
  Grid,
  Grow,
  List,
  ListItem,
  Typography,
  useTheme,
} from '@mui/material';

import ProductCarouselItem from './ProductCarouselItem';

import ThemeContext from '../../theme/theme-context';

type Prop = {
  title: string;
  itemsPerPage: number;
  items: any[];
};

function ProductCarousel(props: Prop) {
  const { i18n } = useTranslation();

  const themeCtx = useContext(ThemeContext);
  const theme = useTheme();

  const [currentPage, setCurrentPage] = useState(1);

  const gridSpace = Math.floor(12 / props.itemsPerPage);

  const indexOfLastItem = currentPage * props.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - props.itemsPerPage;
  const currentItems = props.items.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers: number[] = [];
  for (
    let i = 1;
    i <= Math.ceil(props.items.length / props.itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  let paginateInterval: NodeJS.Timer;
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    clearInterval(paginateInterval);
  };

  useEffect(() => {
    if (currentPage !== pageNumbers[pageNumbers.length - 1]) {
      paginateInterval = setInterval(() => {
        paginate(currentPage + 1);
      }, 5000);
    } else {
      paginateInterval = setInterval(() => {
        paginate(1);
      }, 5000);
    }
    return () => clearInterval(paginateInterval);
  });

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
      <Grid container sx={{ marginY: '1rem' }}>
        {currentItems.map((item) => (
          <Grow in key={item.id}>
            <Grid
              item
              xs={gridSpace}
              sx={{
                ...(i18n.dir() === 'ltr' && {
                  borderRight: '1px solid',
                }),
                ...(i18n.dir() === 'rtl' && {
                  borderLeft: '1px solid',
                }),
                borderImageSlice: 1,
                ...(themeCtx.currentMode === 'light' && {
                  borderImageSource:
                    'linear-gradient(to bottom,#ffffff 25%, #e4e4e4 50%, #ffffff 75%)',
                }),
                ...(themeCtx.currentMode === 'dark' && {
                  borderImageSource:
                    'linear-gradient(to bottom,#121212 25%, #e4e4e4 50%, #121212 75%)',
                }),
                ...(i18n.dir() === 'ltr' && {
                  '&:last-child': {
                    borderRight: 'none !important',
                  },
                }),
                ...(i18n.dir() === 'rtl' && {
                  '&:last-child': {
                    borderLeft: 'none !important',
                  },
                }),
              }}
            >
              <ProductCarouselItem
                id={item.id}
                title={item.title}
                image={item.images[0]}
                price={item.price}
                discount={item.discount}
              />
            </Grid>
          </Grow>
        ))}
      </Grid>

      <Box>
        <List
          sx={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
          }}
        >
          {pageNumbers.map((number) => (
            <ListItem
              key={number}
              sx={{
                width: 'initial',
                padding: 0,
                marginX: '0.2rem',
              }}
            >
              <Box
                component='a'
                sx={
                  currentPage === number
                    ? { borderBottom: '3px solid gray' }
                    : {}
                }
                onClick={() => {
                  paginate(number);
                }}
                href='#!'
              >
                <Box
                  sx={{
                    width: '2rem',
                    height: '1px',
                    borderBottom: '3px solid gray',
                  }}
                ></Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
export default ProductCarousel;
