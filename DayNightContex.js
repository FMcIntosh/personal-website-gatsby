import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import useDarkMode from 'use-dark-mode';
import './src/styles/global.css';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';

export const DayNightContext = React.createContext();

export const DayNightProvider = ({ children }) => {
  const darkMode = useDarkMode(false);
  const background = darkMode.value
    ? {
        paper: '#2E214D',
        splash: 'linear-gradient(180deg, rgba(46,33,77,1) 8%, rgba(102,73,98,1) 100%)',
        default: '#0a0025',
        primaryAccent: '#0a0025',
        secondaryAccent: '#341639'
      }
    : {
        // rgba(157,211,247,1)
        // rgba(82,192,227,1)
        paper: 'rgba(96,145,212,1)',
        splash: 'linear-gradient(180deg, rgba(96,145,212,1) 8%,  rgba(251,201,197,1) 100%)',
        default: 'rgb(252, 250, 255)',
        primaryAccent: 'rgb(252, 250, 255)',
        secondaryAccent: 'rgb(253, 250, 250)'
      };

  const theme = createMuiTheme({
    palette: {
      type: darkMode.value ? 'dark' : 'dark',
      primary: {
        // main: 'rgb(210, 54, 105)',
        main: '#5653ad'
        //2E214D
        // main: '#4F3250'
        // A8497D

        // background: rgb(46,33,77);
        // background: linear-gradient(180deg, rgba(46,33,77,1) 31%, rgba(144,102,115,1) 81%, rgba(248,137,13,1) 100%);
      },
      secondary: { main: darkMode.value ? '#F8890D' : '#D98594' },
      background
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
      <MuiThemeProvider theme={theme}>
        <>
          <CssBaseline />
          {children}
        </>
      </MuiThemeProvider>
    </DayNightContext.Provider>
  );
};
