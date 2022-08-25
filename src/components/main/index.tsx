/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';

import 'react-toggle/style.css';
import { selectCategoryList } from 'redux/selectors';
import { getCategoryListTC } from 'redux/slices/category-list/getCategoryList';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  PriciestProductsShowcase,
  TopAutionLogProductsShowcase,
  TopClosingProductsShowcase,
} from 'components/products-section';
import DropDown from 'react-multilevel-dropdown';
import { useHistory } from 'react-router-dom';
import { PageURL } from 'enum/PageURL';
import { Row } from 'react-bootstrap';

export const Main: React.FC = () => {
  const [display, setDisplay] = useState('block');
  const dispatch = useAppDispatch();
  const categoryList = useAppSelector(selectCategoryList);
  const history = useHistory();

  useEffect(() => {
    if (categoryList.data === undefined)
      dispatch(getCategoryListTC());
  }, []);

  function toggleCategory() {
    if (categoryList.status !== 'success') return;

    setDisplay(display === 'none' ? 'block' : 'none');
  }

  return (
    <div>
      {/* Category + Preview page */}
      <section className="hero">
        <div className="container">
          <Row className="my-5">
            {/* All category */}
            <div className="col-lg-3">
              <div className="hero__categories">
                <div className="hero__categories__all" onClick={toggleCategory}>
                  <i className="fa fa-bars" />
                  <span>All Categories</span>
                </div>

                {categoryList.status === 'success' && (
                  <ul className="drop" style={{ display }}>
                    {categoryList.data?.map((category, index) => (
                      <DropDown.Item key={index}>
                        {category.section}
                        <DropDown.Submenu position="right">
                          {category.categories.map((detailCategory, index2) => (
                            <DropDown.Item
                              key={index2}
                              onClick={() => history.push(`${PageURL.Search}?category=${detailCategory.path}`)}
                            >
                              {detailCategory.name}
                            </DropDown.Item>
                          ))}
                        </DropDown.Submenu>
                      </DropDown.Item>
                    ))}

                    {/* {categoryList.data?.map((category, index) => (
                      <li key={index}>
                        <a href="#">{category.section}</a>
                      </li>
                    ))} */}
                  </ul>
                )}
              </div>
            </div>

            {/* Banner */}
            <div
              className="col-lg-9 hero__item set-bg"
              style={{
                backgroundImage: "url('asset/img/banner/banner.jpg')",
              }}
            >
              <div className="hero__text">
                <h2>Auction Only</h2>
                <p>Do you have any item to sell or want to bid an item?</p>
              </div>
            </div>
          </Row>
        </div>
      </section>

      <TopClosingProductsShowcase />

      <TopAutionLogProductsShowcase />

      <PriciestProductsShowcase />

    </div>
  );
};
