import React from 'react';
import { DayNightProvider } from './DayNightContex';
import './src/styles/global.css';

export const wrapRootElement = ({ element }) => {
  return <DayNightProvider>{element}</DayNightProvider>;
};
