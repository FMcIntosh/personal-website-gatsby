import React from 'react';
import { DayNightProvider } from './DayNightContex';
import './src/styles/global.css';
import NavBar from './src/components/NavBar';

export const wrapRootElement = ({ element }) => {
  return (
    <DayNightProvider>
      <NavBar />
      {element}
    </DayNightProvider>
  );
};
