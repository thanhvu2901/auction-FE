import React, { useEffect, useState } from 'react';
import axiosClient from 'utils/axiosClient';
import moment from 'moment';
import { getlist } from './api';
import { TStatus } from 'models';
import ServerError from 'components/500-server-error';
import Loading from 'components/loading';
import { Container } from 'react-bootstrap';
import { PageURL } from 'enum/PageURL';
import { Link } from 'react-router-dom';
export const BidderProduct: React.FC = () => {
  const [bidderProduct, setbidderProduct] = useState([]);
  const [status, setStatus] = useState<TStatus>('idle');
  useEffect(() => {
    if (status !== 'idle') return;

    setTimeout(async () => {
      try {
        setStatus('pending');
        const data = await getlist();
        setbidderProduct(data);

        setStatus('success');
      } catch (error) {
        setStatus('reject');
      }
    });
  }, [status]);

  const uiMap = {
    idle: undefined,
    pending: <Loading />,
    success: (
      <section className="">
        <div className="App">
          <div
            className="product__details__tab__desc"
            style={{ overflow: 'auto' }}
          >
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price Bid</th>
                  <th>Current Price</th>
                  <th>Time Exprired</th>

                  <th>Auction log count</th>
                  <th>Bid At</th>
                </tr>
              </thead>
              <tbody id="category-container">
                {bidderProduct?.map((bidderP, index) => (
                  <tr key={index}>
                    <td>
                      <Link
                        to={PageURL.Detail.replace(':id', bidderP.productId)}
                      >
                        {bidderP.name}{' '}
                      </Link>
                    </td>
                    <td> {bidderP.price} </td>
                    <td> {bidderP.currentPrice} </td>
                    <td>{moment(bidderP.timeExpired).fromNow()}</td>

                    <td>{bidderP.auctionLogCount}</td>

                    <td>
                      {moment(bidderP.createdAt).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    ),
    reject: <ServerError />,
  };

  // useEffect(() => {
  //   setTimeout(async () => {
  //     axiosClient
  //       .get(
  //         `/api/bidder/product-bidded/${localStorage.getItem(
  //           'auction-user-id'
  //         )}`
  //       )
  //       .then((res) => setbidderProduct(res.data));
  //   });
  // }, []);

  return <Container>{uiMap[status]}</Container>;
};
