import React from 'react';

interface Props {
  name: string;
  pricing: number;
  imageUrl: string;
}

const ProductPreview = (props: Props) => {
  const { name, pricing, imageUrl } = props;

  return (
    <div className="col-lg-4 col-md-6 col-sm-6">
      <div className="product__item">
        <div
          className="product__item__pic set-bg"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <ul className="product__item__pic__hover">
            <li>
              <a href="#">
                <i className="fa fa-heart"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-retweet"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-shopping-cart"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="product__item__text">
          <h6>
            <a href="#">{name}</a>
          </h6>
          <h5>${pricing}</h5>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
