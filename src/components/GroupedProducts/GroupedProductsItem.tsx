import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import {
  Card,
  CardActionArea,
  Box,
  CardMedia,
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
function GroupedProductsItem(props: Prop) {
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
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: { xs: 'center', sm: 'flex-start' },
            alignItems: { xs: 'center', sm: 'flex-start' },
            width: 1,
            position: 'relative',
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
            image={props.image}
            alt={props.title}
            sx={{
              ...(i18n.dir() === 'ltr' && {
                paddingLeft: '1rem',
              }),
              ...(i18n.dir() === 'rtl' && {
                paddingRight: '1rem',
              }),
              height: { xs: 50, sm: 50, md: 75, lg: 150 },
              width: { xs: 50, sm: 50, md: 75, lg: 150 },
              objectFit: 'contain',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: '1rem',
            }}
          >
            <Typography
              variant='body2'
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: 8,
                  sm: 12,
                  lg: 18,
                },
                color: theme.palette.primary.main,
                paddingTop: { xs: 0, sm: '1rem' },
              }}
            >
              {props.title}
            </Typography>
            {props.discount > 0 ? (
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography
                  variant='subtitle1'
                  sx={{
                    color: theme.palette.secondary.main,
                    fontWeight: 700,
                    fontSize: {
                      xs: 8,
                      sm: 12,
                      lg: 18,
                    },
                  }}
                >
                  ${(props.price - props.price * props.discount).toFixed(2)}
                </Typography>
                <Typography
                  variant='subtitle2'
                  sx={{
                    color: theme.palette.grey[500],
                    fontWeight: 700,
                    textDecoration: 'line-through',
                    marginLeft: '1rem',
                    fontSize: {
                      xs: 6,
                      sm: 10,
                      lg: 16,
                    },
                  }}
                >
                  ${props.price.toFixed(2)}
                </Typography>
              </Box>
            ) : (
              <Typography
                variant='subtitle1'
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: {
                    xs: 8,
                    sm: 12,
                    md: 'initial',
                    lg: 'intial',
                  },
                }}
              >
                ${props.price.toFixed(2)}
              </Typography>
            )}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default GroupedProductsItem;
