import { useContext } from 'react';

import { Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';



import Homepage from './pages/Homepage';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

import Newsletter from './components/Newsletter/Newsletter';
import Footer from './components/Footer/Footer';
import Banner from './components/Banner/Banner';
import MainNavigation from './components/MainNavigation/MainNavigation';

import lightTheme from './theme/light-theme';
import darkTheme from './theme/dark-theme';
import ThemeContext from './theme/theme-context';

import './App.scss';

function App() {
  const themeCtx = useContext(ThemeContext);

  // const theme = useTheme();
  // const currentLanguageCode = cookies.get('i18next') || 'en';

  // useEffect(() => {
  //   const currentLanguage = languages.find(
  //     (l) => l.code === currentLanguageCode
  //   );
  //   document.body.dir = currentLanguage?.dir || 'ltr';
  // }, [currentLanguageCode]);
  // console.log(theme.direction);

  return (
    <ThemeProvider
      theme={themeCtx.currentMode === 'light' ? lightTheme : darkTheme}
    >
      <Banner />
      <MainNavigation />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/product/:productId' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Newsletter />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
