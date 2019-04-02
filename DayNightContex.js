import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import useDarkMode from 'use-dark-mode';
import './src/styles/global.css';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

export const DayNightContext = React.createContext();

export const DayNightProvider = ({ children }) => {
  const darkMode = useDarkMode(false);
  const theme = createMuiTheme({
    palette: {
      type: darkMode.value ? 'dark' : 'light',
      primary: {
        main: 'rgb(210, 54, 105)'
      },
      secondary: green
    },
    status: {
      danger: 'orange'
    },
    typography: {
      fontFamily: ['Montserrat', 'sans-serif']
    }
  });
  return (
    <DayNightContext.Provider value={darkMode}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </DayNightContext.Provider>
  );
};
