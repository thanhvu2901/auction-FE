import { Logo } from 'components';
import SearchBar from 'components/search-box';
import { PageURL } from 'enum/PageURL';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdAccountCircle, MdClose, MdSearch } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { Button, ButtonGroup, Col, Container, Form, Row } from 'react-bootstrap';
import { isLoggedIn } from 'utils/utils';
import { selectCategoryList } from 'redux/selectors';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { getCategoryListTC } from 'redux/slices/category-list/getCategoryList';
import { ColorTheme } from 'enum/ColorTheme';
import DefaultButton from 'components/button/DefaultButton';
import { KeyPairValue } from 'types';

function LoginComponent() {
  return isLoggedIn() ? (
    <ul>
      <li>
        <Link to={PageURL.WatchList} className="mx-2">
          <FaHeart size={'1.8rem'} />
        </Link>

        <Link to={PageURL.Profile}>
          <MdAccountCircle className='mr-2' size={'1.8rem'} />
          {`${localStorage.getItem('auction-first-name')} ${localStorage.getItem('auction-last-name')}`}
        </Link>
      </li>
    </ul>
  ) : (
    <ul>
      <li>
        <Link to={PageURL.Login}>Login</Link>
      </li>
      <li>
        <Link to={PageURL.Register}>Register</Link>
      </li>
    </ul>
  );
}

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [additionalSearch, setAdditionalSearch] = useState<boolean>(false);
  const [categoryOptions, setCategoryOptions] = useState<KeyPairValue<string, string>[]>([{ key: '', value: 'Default' }]);
  const categoryList = useAppSelector(selectCategoryList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categoryList.data === undefined) {
      dispatch(getCategoryListTC());
      return;
    }
    const categories = [...categoryOptions];

    categoryList.data!.forEach(section => {
      categories.push(
        ...(section.categories.map(category => {
          return {
            key: category.path,
            value: category.name
          }
        }))
      )
    })

    setCategoryOptions(categories);
  }, [categoryList.data]);


  function onSearchTextChange(e: FormEvent<HTMLInputElement>) {
    setSearchQuery(e.currentTarget.value);
  }

  function onSearchSubmit(e: FormEvent<HTMLFormElement>) {
    // e.preventDefault();
    // //! check for min 4 character only
    // history.push(PageURL.Search + `?keyword=${searchQuery}`);
  }

  function closeAdditionSearch() {
    setAdditionalSearch(false);
  }

  function onFocus() {
    setAdditionalSearch(true)
  }

  return (
    <header className="header">
      <Form onSubmit={onSearchSubmit} action='/search'>
        <Container>
          <Form.Row className="align-items-center">
            <div className="col-lg-3 d-flex flex-column justify-content-center">
              <div className="header__logo">
                <Logo />
              </div>
            </div>

            <Row className='col-lg-6'>
              <MdSearch style={{ position: 'absolute', marginTop: 6, marginLeft: 6, zIndex: 1 }} size={24} />

              <input
                name='keyword'
                className='col-12'
                style={{
                  paddingTop: 4,
                  paddingLeft: 36,
                  paddingBottom: 4,
                  borderRadius: 4,
                  borderColor: '#7FAD39'
                }}
                type="text"
                onFocus={onFocus}
                placeholder="What do you need?"
                onChange={onSearchTextChange}
              />
            </Row>

            <div className="col-lg-3">
              <div className="header__cart">
                <LoginComponent />
              </div>
            </div>
          </Form.Row>
        </Container>

        {additionalSearch &&
          <Form.Row className='mt-4 bg-light'>
            <Container className='my-5'>
              <Form.Row className='d-flex mb-2 justify-content-end'>
                <MdClose size={24} onClick={closeAdditionSearch} />
              </Form.Row>

              <Form.Row>
                <Col className='col-12'>
                  <Form.Row className='gx-5'>

                    <Col className='col-md-4 col-12 mx-2 mx-md-0'>
                      <h3 className='h3'>Filter</h3>

                      <Form.Label>By category</Form.Label> <br />
                      <Form.Group>
                        <Form.Control as='select' name='category'>
                          {categoryOptions.map(categoryOption => (
                            <option value={categoryOption.key}>{categoryOption.value}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>

                      {/* <Form.Group>
                        <Form.Control as='select' name='category'>
                          {categoryOptions.map((categoryOption, index) => {
                            <option key={index} value={categoryOption.key}>{categoryOption.value}</option>
                          })}
                        </Form.Control>
                      </Form.Group> */}
                    </Col>

                    <Col className='col-md-8 col-12 mx-2 mx-md-0'>
                      <h3 className='h3'>Sorting</h3>
                      <Form.Row>
                        <Col className='col-md-6 col-12'>
                          <Form.Label>By closing time</Form.Label> <br />
                          <Form.Group>
                            <Form.Control as='select' name='timeExpired'>
                              <option value={''}>Default</option>
                              <option value='asc'>Near closing</option>
                              <option value='desc'>Far closing</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>

                        <Col className='col-md-6 col-12'>
                          <Form.Label>By pricing</Form.Label> <br />
                          <Form.Group>
                            <Form.Control as='select' name='pricing'>
                              <option value={''}>Default</option>
                              <option value='asc'>Cheapest</option>
                              <option value='desc'>Most expensive</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Form.Row>
                    </Col>

                  </Form.Row>
                </Col>
              </Form.Row>

              <Form.Row>
                <input readOnly={true} hidden={true} name='page' value={'1'}/>
                <DefaultButton className='mt-4' type='submit'>Search</DefaultButton>
              </Form.Row>
            </Container>
          </Form.Row>
        }
      </Form>
    </header>
  );
};
