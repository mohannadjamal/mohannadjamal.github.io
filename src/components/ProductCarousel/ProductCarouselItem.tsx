import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import {
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  useTheme,
} from '@mui/material';

type Prop = {
  id: string;
  title: string;
  image: string;
  price: number;
  discount: number;
};

function ProductCarouselItem(props: Prop) {
  const theme = useTheme();

  const { i18n } = useTranslation();
  return (
    <Card
      elevation={0}
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <CardActionArea component={Link} to={`/product/${props.id}`}>
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            width: 1,
          }}
        >
          {props.discount > 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: '20%',
                ...(i18n.dir() === 'ltr' && {
                  left: 0,
                }),
                ...(i18n.dir() === 'rtl' && {
                  right: 0,
                }),
                backgroundColor: '#ec1835',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                variant='body2'
                sx={{
                  color: '#ffffff',
                  fontWeight: 500,
                  fontSize: {
                    xs: 8,
                    sm: 12,
                    md: 14,
                    lg: 16,
                  },
                }}
              >
                -{props.discount * 100}%
              </Typography>
            </Box>
          )}
          <CardMedia
            component='img'
            src={props.image}
            alt={props.title}
            sx={{
              height: {
                xs: 50,
                sm: 150,
                md: 300,
              },
              width: 1,
              objectFit: 'contain',
            }}
          />
          <Typography
            variant='body2'
            sx={{
              fontWeight: 700,
              fontSize: { xs: 8, sm: 12, md: 14, lg: 16 },
              color: theme.palette.primary.main,
            }}
          >
            {props.title}
          </Typography>
          {props.discount > 0 ? (
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography
                variant='subtitle1'
                sx={{
                  color: theme.palette.secondary.light,
                  fontWeight: 700,
                  fontSize: { xs: 10, sm: 12, md: 14, lg: 16 },
                }}
              >
                ${(props.price - props.price * props.discount).toFixed(2)}
              </Typography>
              <Typography
                variant='subtitle2'
                sx={{
                  color: theme.palette.grey[500],
                  fontWeight: 700,
                  fontSize: { xs: 6, sm: 10, md: 12, lg: 14 },
                  textDecoration: 'line-through',
                  marginLeft: '0.5rem',
                }}
              >
                ${props.price.toFixed(2)}
              </Typography>
            </Box>
          ) : (
            <Typography
              variant='subtitle1'
              sx={{
                fontWeight: 700,
                fontSize: { xs: 10, sm: 12, md: 14, lg: 16 },
                color: theme.palette.secondary.light,
              }}
            >
              ${props.price.toFixed(2)}
            </Typography>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default ProductCarouselItem;
