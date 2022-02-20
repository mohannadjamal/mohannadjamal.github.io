import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import RssFeedIcon from '@mui/icons-material/RssFeed';

import visa from '../../images/visa.png';
import mastercard from '../../images/master.png';
import stripe from '../../images/stripe.png';
import paypal from '../../images/paypal.png';
import discover from '../../images/discover.png';

function Footer() {
  const { t } = useTranslation();

  const stores = [
    '501 Floor, Nguyen Ngoc Vu, Cau Glay, Ha Noi',
    '741 - 11A Sandiago, L.A City, USA',
    '1st Floor BrickHouse, 250 Wall Street, C.A City, UK',
    '5th Floor, 169 Green Lakes, WestBrown, Liverpool City',
    '628 Brooklyn Streen, Fullham District, Wales',
    '10001 Street, WinLow District, Mexico',
  ];

  const links = [
    {
      title: t('footer.account.title'),
      links: [
        t('footer.account.cart'),
        t('footer.account.checkout'),
        t('footer.account.wishlist'),
        t('footer.account.terms'),
        t('footer.account.account'),
      ],
    },
    {
      title: t('footer.information.title'),
      links: [
        t('footer.information.shipping'),
        t('footer.information.giftcard'),
        t('footer.information.track'),
        t('footer.information.terms'),
        t('footer.information.faq'),
      ],
    },
    {
      title: t('footer.howto.title'),
      links: [
        t('footer.howto.payments'),
        t('footer.howto.delivery'),
        t('footer.howto.protection'),
        t('footer.howto.guide'),
        t('footer.howto.partnership'),
      ],
    },
  ];

  const payments = [
    { title: 'Visa', image: visa },
    { title: 'Mastercard', image: mastercard },
    { title: 'Stripe', image: stripe },
    { title: 'Paypal', image: paypal },
    { title: 'Discover', image: discover },
  ];

  return (
    <Box>
      <Box
        sx={{
          width: 1,
          backgroundColor: '#252525',
          color: '#dedede',
          padding: { xs: '0 1rem', md: '0 10%' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            paddingY: { xs: 1, sm: 4 },
          }}
        >
          <Box
            sx={{
              width: '50%',
              display: 'inline-flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'cetner',
            }}
          >
            <Box>
              <Typography
                variant='body2'
                sx={{
                  color: '#a9a9a9',
                  marginBottom: { xs: 0, sm: '1rem' },
                  fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                }}
              >
                {t('footer.address.title')}
              </Typography>
              <Typography
                variant='subtitle1'
                sx={{ fontSize: { xs: 10, sm: 12, md: 14, lg: 16 } }}
              >
                169 Florida Ave, L.A City
              </Typography>
            </Box>
            <Box>
              <Typography
                variant='body2'
                sx={{
                  color: '#a9a9a9',
                  marginBottom: { xs: 0, sm: '1rem' },
                  fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                }}
              >
                {t('footer.phone.title')}
              </Typography>
              <Typography
                dir='ltr'
                variant='subtitle1'
                sx={{ fontSize: { xs: 10, sm: 12, md: 14, lg: 16 } }}
              >
                (+84) 1234 686 9669
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton>
              <FacebookIcon
                sx={{
                  color: '#dedede',
                  fontSize: { xs: 12, sm: 16, md: 24, lg: 32 },
                }}
              />
            </IconButton>
            <IconButton>
              <TwitterIcon
                sx={{
                  color: '#dedede',
                  fontSize: { xs: 12, sm: 16, md: 24, lg: 32 },
                }}
              />
            </IconButton>
            <IconButton>
              <PinterestIcon
                sx={{
                  color: '#dedede',
                  fontSize: { xs: 12, sm: 16, md: 24, lg: 32 },
                }}
              />
            </IconButton>
            <IconButton>
              <GoogleIcon
                sx={{
                  color: '#dedede',
                  fontSize: { xs: 12, sm: 16, md: 24, lg: 32 },
                }}
              />
            </IconButton>
            <IconButton>
              <InstagramIcon
                sx={{
                  color: '#dedede',
                  fontSize: { xs: 12, sm: 16, md: 24, lg: 32 },
                }}
              />
            </IconButton>
            <IconButton>
              <RssFeedIcon
                sx={{
                  color: '#dedede',
                  fontSize: { xs: 12, sm: 16, md: 24, lg: 32 },
                }}
              />
            </IconButton>
          </Box>
        </Box>
        <Divider sx={{ backgroundColor: '#5d5d5d' }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            paddingTop: 5,
            paddingBottom: 3,
          }}
        >
          <Box>
            <Typography
              variant='h6'
              sx={{
                marginBottom: '2rem',
                fontSize: { xs: 10, sm: 12, md: 16, lg: 20 },
              }}
            >
              {t('footer.stores.title')}
            </Typography>
            <List>
              {stores.map((item) => (
                <ListItem
                  key={item}
                  disablePadding
                  sx={{ color: '#5d5d5d', marginBottom: '1.2rem' }}
                >
                  <Typography
                    variant='body2'
                    sx={{
                      fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                    }}
                  >
                    {item}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
          {links.map((item) => (
            <Box key={item.title}>
              <Typography
                variant='h6'
                sx={{
                  marginBottom: '2rem',
                  fontSize: { xs: 10, sm: 12, md: 16, lg: 20 },
                }}
              >
                {item.title}
              </Typography>
              <List>
                {item.links.map((l) => (
                  <ListItem
                    key={l}
                    component={Link}
                    to='/'
                    disablePadding
                    sx={{ color: '#a9a9a9', marginBottom: '0.5rem' }}
                  >
                    <Typography
                      variant='body2'
                      sx={{
                        fontSize: { xs: 8, sm: 10, md: 12, lg: 14 },
                      }}
                    >
                      {l}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          width: 1,
          padding: '1.2rem 10%',
          backgroundColor: '#1f1f1f',
          color: '#a9a9a9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='body2'
          sx={{ fontSize: { xs: 8, sm: 10, md: 12, lg: 14 } }}
        >
          {t('footer.copyright')}
        </Typography>
        <Box component='footer'>
          {payments.map((item) => (
            <Box
              key={item.title}
              component='img'
              sx={{
                marginLeft: '0.5rem',
                opacity: 0.5,
                borderRadius: '2.5px',
                filter: 'grayscale(100%)',
                height: 'auto',
                width: { xs: 15, sm: 20, md: 30, lg: 40 },
              }}
              src={item.image}
              alt={item.title}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
