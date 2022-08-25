import React from 'react';

import { Header, SellerProduct, BidderProduct, Footer } from 'components';

const SellerProductView: React.FC = () => {
  return (
    <>
      <Header />
      {/* <SellerProduct /> */}
      <BidderProduct />
      <Footer />
    </>
  );
};

export default SellerProductView;
