import { createContext, useEffect, useState } from 'react';

import i18next from 'i18next';
import cookies from 'js-cookie';
import languages from './languages';

const LocalizationContext = createContext({
  currentLanguageCode: 'en' as string,
  currentLanguageDir: 'ltr' as string,
  changeLanguage: (code: string): any => {},
});

type Prop = {
  children?: JSX.Element;
};

export function LocalizationContextProvider(props: Prop) {
  const [dir, setDir] = useState<string>('ltr');
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  useEffect(() => {
    document.body.dir = currentLanguage?.dir || 'ltr';
    setDir(currentLanguage?.dir || 'ltr');
  }, [currentLanguage]);

  function changeLanguageHandler(code: string) {
    i18next.changeLanguage(code);
  }

  const context = {
    currentLanguageCode: currentLanguageCode,
    currentLanguageDir: dir,
    changeLanguage: changeLanguageHandler,
  };

  return (
    <LocalizationContext.Provider value={context}>
      {props.children}
    </LocalizationContext.Provider>
  );
}
export default LocalizationContext;
