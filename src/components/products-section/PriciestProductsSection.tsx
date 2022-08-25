import { TProduct, TStatus } from 'models';
import { useEffect } from 'react';
import { useState } from 'react';
import { getPriciestProducts } from './api';
import ProductsSection from './ProductsSection';

interface Props {}

const PriciestProductsShowcase = (props: Props) => {
  const [productsStatus, setProductsStatus] = useState<TStatus>('idle');
  const [products, setProducts] = useState<TProduct[]>(undefined);

  useEffect(() => {
    if (productsStatus !== 'idle') return;

    setTimeout(async () => {
      try {
        setProductsStatus('pending');
        const response = await getPriciestProducts();

        setProducts(response);
        setProductsStatus('success');
      } catch (error) {
        setProductsStatus('reject');
      }
    });
  }, [productsStatus]);

  return (
    <ProductsSection
      title="Priciest products"
      products={products}
      status={productsStatus}
    />
  );
};

export default PriciestProductsShowcase;
