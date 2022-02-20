import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Link,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';

import DrawerComponent from '../DrawerComponent/DrawerComponent';

import languages from '../../localization/languages';

function MainNavigation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.body.dir = i18n.dir();
    theme.direction = i18n.dir();
  };
  const currentLanguageCode = cookies.get('i18next') || 'en';

  const [language, setLanguage] = useState(
    currentLanguageCode === 'en' ? 'English' : 'العربية'
  );
  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <Box
      component='nav'
      sx={{
        width: 1,
        height: '3rem',
        backgroundColor: '#1c252e',
        padding: { xs: ' 0 1rem', md: '0 10%' },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {isMobile ? (
        <DrawerComponent />
      ) : (
        <List
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <ListItem>
            <ListItemText>
              <Link
                href='/'
                sx={{
                  textDecoration: 'none',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                {t('nav.home')}
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Link
                href='/shop'
                sx={{
                  textDecoration: 'none',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                {t('nav.shop')}
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Link
                href='/pages'
                sx={{
                  textDecoration: 'none',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                {t('nav.pages')}
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Link
                href='/lookbook'
                sx={{
                  textDecoration: 'none',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                {t('nav.lookbook')}
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Link
                href='/brands'
                sx={{
                  textDecoration: 'none',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                {t('nav.brands')}
              </Link>
            </ListItemText>
          </ListItem>
        </List>
      )}
      <FormControl
        variant='standard'
        sx={{ m: 1, minWidth: 120, backgroundColor: '#fff' }}
      >
        <Select onChange={handleChange} value={language} sx={{ color: '#000' }}>
          {languages.map(({ code, name }) => (
            <MenuItem
              key={code}
              value={name}
              onClick={() => changeLanguage(code)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
export default MainNavigation;
