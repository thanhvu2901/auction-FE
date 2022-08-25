import { TProduct, TStatus } from 'models';
import { useEffect } from 'react';
import { useState } from 'react';
import { getTopAutionLogProducts } from './api';
import ProductsSection from './ProductsSection';

interface Props {}

const TopAutionLogProductsShowcase = (props: Props) => {
  const [productsStatus, setProductsStatus] = useState<TStatus>('idle');
  const [products, setProducts] = useState<TProduct[]>(undefined);

  useEffect(() => {
    if (productsStatus !== 'idle') return;

    setTimeout(async () => {
      try {
        setProductsStatus('pending');
        const response = await getTopAutionLogProducts();

        setProducts(response);
        setProductsStatus('success');
      } catch (error) {
        setProductsStatus('reject');
      }
    });
  }, [productsStatus]);

  return (
    <ProductsSection
      title="Most bidding products"
      status={productsStatus}
      products={products}
    />
  );
};

export default TopAutionLogProductsShowcase;
