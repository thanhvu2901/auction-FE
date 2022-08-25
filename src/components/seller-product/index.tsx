import React, { useEffect, useState } from 'react';
import axiosClient from 'utils/axiosClient';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { PageURL } from 'enum/PageURL';
import { getlist,getrole } from './api';
import { TStatus } from 'models';
import ServerError from 'components/500-server-error';
import Loading from 'components/loading';
import { Container } from 'react-bootstrap';
export const SellerProduct: React.FC = () => {
  const [sellerProduct, setSellerProduct] = useState([]);
  const [checkrole, setCheckRole] = useState([]);
  const [status, setStatus] = useState<TStatus>('idle');
  // useEffect(() => {
  //   setTimeout(async () => {
  //     axiosClient
  //       .get(
  //         `/api/seller/product-selling/${localStorage.getItem(
  //           'auction-user-id'
  //         )}`
  //       )
  //       .then((res) => setSellerProduct(res.data));

  //     async function role() {
  //       return await axiosClient.get(
  //         `/api/seller/checkrole/${localStorage.getItem('auction-user-id')}`
  //       );
  //     }

  //     role().then((res) => {
  //       setCheckRole(res.data);
  //     });
  //   });
  // }, []);

  useEffect(() => {
    if (status !== 'idle') return;

    setTimeout(async () => {
      try {
        setStatus('pending');
        const data= await getlist()
        setSellerProduct(data)
     
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
     <div
          className="product__details__tab__desc"
          style={{ overflow: 'auto' }}
        >
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Bidder Name</th>
                <th>Price</th>
                <th>Current Price</th>
                <th>Auction Log Count</th>
                <th>Bidder count</th>
                <th>Bid At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="category-container">
              {sellerProduct?.map((auctionLog, index) => (
                <tr key={index}>
                  <td><Link to={PageURL.Detail.replace(':id', auctionLog.id)}>{auctionLog.name}</Link></td>
                  <td> {auctionLog.reservedPrice} </td>
                  <td> {auctionLog.currentPrice} </td>
                  <td>{auctionLog.auctionLogCount}</td>
                  <td>{auctionLog.bidderCount}</td>
                  <td>
                    {' '}
                    {moment(auctionLog.createdAt).format(
                      'MMMM Do YYYY, h:mm:ss a'
                    )}
                  </td>
                  <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <div
                            className="btn-group"
                            style={{ marginBottom: '20px' }}
                          >
                            <Link to={`/profile/update/${auctionLog.id}`}>
                            <button
                              type="button"
                        
                            >
                              Update description
                            </button>
                            </Link>
                          </div>
                        </div>
                      </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    ),
    reject: <ServerError />,
  };
  

  // console.log(checkrole);
  if (!checkrole) {
    return (
      <>
        <img src="./asset/img/hand-1200.png" alt="" width={'50%'} />
        <h2>You are not a seller!!Please become a seller! </h2>
      </>
    );
  } else {
    return (
      <Container>
        {uiMap[status]}
      </Container>
    );
  }
};
