import React from 'react';
import { DayNightProvider } from './DayNightContex';
import './src/styles/global.css';
import Layout from './src/components/Layout';

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout>{element}</Layout>;
};

export const wrapRootElement = ({ element }) => {
  return <DayNightProvider>{element}</DayNightProvider>;
};
