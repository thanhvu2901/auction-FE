import { PageURL } from 'enum/PageURL';
import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link to={PageURL.Home}>
      <img src="./asset/img/logo.png" alt="auction" />
    </Link>
  );
};
