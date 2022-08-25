import { TProduct, TStatus } from 'models';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getRelatedProducts } from './api';
import ProductsSection from './ProductsSection';

interface Props {
  section?: string;
}

const RelatedProductsSection = (props: Props) => {
  const { section } = props;
  // console.log(section);

  const [productsStatus, setProductsStatus] = useState<TStatus>('idle');
  const [products, setProducts] = useState<TProduct[]>(undefined);

  useEffect(() => {
    if (section === undefined) return;
    if (productsStatus !== 'idle') return;

    setTimeout(async () => {
      try {
        setProductsStatus('pending');
        const response = await getRelatedProducts(section);

        setProducts(response);
        setProductsStatus('success');
      } catch (error) {
        setProductsStatus('reject');
      }
    });
  }, [section, productsStatus]);

  const actualStatus: TStatus =
    section === undefined ? 'pending' : productsStatus;
  return (
    <ProductsSection
      title="Related products"
      products={products}
      status={actualStatus}
    />
  );
};

export default RelatedProductsSection;
