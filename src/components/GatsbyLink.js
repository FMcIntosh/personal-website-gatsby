import React from 'react';
import { Link } from 'gatsby';

const GatsbyLink = props => {
  return (
    <Link
      style={{ color: 'inherit', textDecoration: 'inherit' }}
      activeStyle={{ color: 'inherit', textDecoration: 'inherit' }}
      {...props}
    />
  );
};

export default GatsbyLink;
