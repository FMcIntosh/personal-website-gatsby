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
        footer: '#2E214D',
        plain: '#FFF'
      }
    : {
        // rgba(157,211,247,1)
        // rgba(82,192,227,1)
        // rgba(96,145,212,1)
        //rgba(59,118,196,1) level up blue
        // rgba(47,92,152,1) prussian
        paper: 'rgba(59,118,196,1)',
        splash: 'linear-gradient(180deg, rgba(59,118,196,1) 8%,  rgba(251,201,197,1) 100%)',
        default: 'rgb(252, 250, 255)',
        primaryAccent: 'rgb(252, 250, 255)',
        footer: 'rgb(253, 250, 250)',
        plain: '#1E2A5C'
      };

  const theme = createMuiTheme({
    palette: {
      type: darkMode.value ? 'dark' : 'dark',
      primary: {
        // main: 'rgb(210, 54, 105)',
        main: darkMode.value ? 'rgba(46,33,77,1)' : 'rgba(59,118,196,1) '
        // '#5653ad' purple
        //#bbaeff purple light
        //2E214D
        // main: '#4F3250'
        // A8497D

        // background: rgb(46,33,77);
        // background: linear-gradient(180deg, rgba(46,33,77,1) 31%, rgba(144,102,115,1) 81%, rgba(248,137,13,1) 100%);
      },
      secondary: { main: darkMode.value ? '#F8890D' : '#FFB1AC' },
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
