import { createContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  currentMode: 'light' as 'light' | 'dark',
  toggleMode: () => {},
});
type Prop = {
  children?: JSX.Element;
};
export function ThemeContextProvider(props: Prop) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const themeData = JSON.parse(localStorage.getItem('mode') || '');
    if (themeData) {
      setMode(themeData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(mode));
  }, [mode]);

  function toggleModeHandler() {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }

  const context = {
    currentMode: mode,
    toggleMode: toggleModeHandler,
  };

  return (
    <ThemeContext.Provider value={context}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
