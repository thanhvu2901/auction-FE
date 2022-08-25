import { Header, Logo } from 'components';
import { Begin } from 'components/begin/begin';
import React from 'react';

interface Props {}

const WhatPageIsThis = (props: Props) => {
  return (
    <div>
      <Begin />
      <Logo />
      <Header />
    </div>
  );
};

export default WhatPageIsThis;
