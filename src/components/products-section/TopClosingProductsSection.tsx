import { TProduct, TStatus } from 'models';
import { useEffect } from 'react';
import { useState } from 'react';
import { getTopClosingProducts } from './api';
import ProductsSection from './ProductsSection';

interface Props {}

const TopClosingProductsShowcase = (props: Props) => {
  const [productsStatus, setProductsStatus] = useState<TStatus>('idle');
  const [products, setProducts] = useState<TProduct[] | undefined>(undefined);

  useEffect(() => {
    if (productsStatus !== 'idle') return;

    setTimeout(async () => {
      try {
        setProductsStatus('pending');
        const response = await getTopClosingProducts();

        setProducts(response);
        setProductsStatus('success');
      } catch (error) {
        setProductsStatus('reject');
      }
    });
  }, [productsStatus]);

  return (
    <ProductsSection
      title="Closing products"
      products={products}
      status={productsStatus}
    />
  );
};

export default TopClosingProductsShowcase;
