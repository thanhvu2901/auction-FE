import React, {  } from 'react';

import { Header, Detail, Footer } from 'components';

const DetailItem: React.FC = () => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [])

  return (
    <>
      <Header />
      <Detail />
      <Footer />
    </>
  );
};

export default DetailItem;
