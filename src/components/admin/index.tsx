import React, { useEffect, useState, Fragment } from 'react';
import '../../styles/admin.scss';
import { Userlist } from '../userlist';
import { Productlist } from '../productlist';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { RequestToSellerAdmin } from 'components/request-seller-admin';
import { CategoryList } from 'components';
import { Sellerlist } from 'components/sellerlist';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export const Admin: React.FC = () => {
  return (
    <Container>
      <div className="admin-app-container">
        <div className="admin-sidebar">
          <ProSidebar className="pro">
            <Menu iconShape="square" className="menu">
              <MenuItem>
                User list
                <Link to="/admin" />
              </MenuItem>
              <MenuItem>
                Seller list
                <Link to="/admin/seller" />
              </MenuItem>
              <MenuItem>
                Product list
                <Link to="/admin/product" />
              </MenuItem>
              <MenuItem>
                Request to be Seller
                <Link to="/admin/requestSeller" />
              </MenuItem>
              <MenuItem>
                Category list
                <Link to="/admin/category" />
              </MenuItem>
            </Menu>
          </ProSidebar>
        </div>
        <div className="admin-content">
          <Switch>
            <Route path="/admin" exact component={Userlist} />
            <Route path="/admin/product" exact component={Productlist} />
            <Route path="/admin/category" exact component={CategoryList} />
            <Route path="/admin/seller" exact component={Sellerlist} />
            <Route
              path="/admin/requestSeller"
              exact
              component={RequestToSellerAdmin}
            />
          </Switch>
        </div>
      </div>
    </Container>
  );
};
