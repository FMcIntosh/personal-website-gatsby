import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import useDarkMode from 'use-dark-mode';
import './src/styles/global.css';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

export const DayNightContext = React.createContext();

const DayNightProvider = ({ children }) => {
  const darkMode = useDarkMode(false);
  console.log(darkMode);
  console.log(darkMode.value);
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: 'rgb(210, 54, 105)'
      },
      secondary: green
    },
    status: {
      danger: 'orange'
    }
  });
  return (
    <DayNightContext.Provider value={darkMode}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </DayNightContext.Provider>
  );
};
export const wrapRootElement = ({ element }) => {
  return <DayNightProvider>{element}</DayNightProvider>;
};
