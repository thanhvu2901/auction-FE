import Loading from 'components/loading';
import ProductCover from 'components/product/ProductCover';
import { TProduct, TStatus } from 'models';
import { FC } from 'react';
import { Container, Row } from 'react-bootstrap';

interface Props {
  title?: string;
  products?: TProduct[];
  status: TStatus;
}

const ProductsSection: FC<Props> = (props: Props) => {
  const { title, products, status } = props;

  const componentMap = {
    idle: <Loading />,
    pending: <Loading />,
    success: (
      <Row>
        {products &&
          products.map(product => (
            <ProductCover key={product.id} {...product} />
          ))}
      </Row>
    ),
    reject: (
      <Row className="justify-content-center">
        <p className="my-5">Can't retrieved item</p>
      </Row>
    ),
  };

  return (
    <section className="featured spad">
      {title &&
        <Container>
          <Row>
            <div className="col-lg-12">
              <div className="section-title">
                <h2>{title}</h2>
              </div>
            </div>
          </Row>
        </Container>
      }

      <Container>{componentMap[status]}</Container>
    </section>
  );
};

export default ProductsSection;
