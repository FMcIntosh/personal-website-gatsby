import React from 'react';
import { DayNightProvider } from './DayNightContex';
import './src/styles/global.css';
import NavBar from './src/components/NavBar';

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <NavBar {...props}>{element}</NavBar>;
};

export const wrapRootElement = ({ element }) => {
  return <DayNightProvider>{element}</DayNightProvider>;
};
