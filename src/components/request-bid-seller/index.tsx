import React, { useEffect, useState } from 'react';
import axiosClient from 'utils/axiosClient';
import socket from 'utils/socket';
import moment from 'moment';
import { TStatus } from 'models';
import { getlist } from './api';
import ServerError from 'components/500-server-error';
import Loading from 'components/loading';
export const RequestBid: React.FC = () => {
  interface list {
    bidderId: string;
    firstName: string;
    lastName: string;
    id: number;
    name: string;
    createdAt: string;
  }
  const [status, setStatus] = useState<TStatus>('idle');
  const [listRequest, setListRequest] = useState<list[]>([]);
  useEffect(() => {
    setTimeout(async () => {
      //lấy danh sách
      const res = await axiosClient.get(
        `/api/seller/request-bid/${localStorage.getItem('auction-user-id')}`
      );
      console.log(res);
      const formattedData = (res.data as list[]).map((log) => {
        return {
          ...log,
          createdAt: moment(log.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
        };
      });

      // console.log(formattedData);
      setListRequest(formattedData);
    });
  }, []);

  useEffect(() => {
    if (status !== 'idle') return;

    setTimeout(async () => {
      try {
        setStatus('pending');
        const data =await getlist()
        const formattedData = (data as list[]).map((log) => {
          return {
            ...log,
            createdAt: moment(log.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
          };
        });
        setListRequest(formattedData);
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
     <div className="tab-content">
        <div className="tab-pane active" id="tabs-1" role="tabpanel">
          <div
            className="product__details__tab__desc"
            style={{ overflow: 'auto' }}
          >
            <table id="bidinfo" className="table table-hover">
              <thead>
                <tr>
                  <th>Bidder Id</th>
                  <th>Bidder Name</th>
                  <th>product Id</th>
                  <th>product Name</th>
                  <th>Bid At</th>
                </tr>
              </thead>
              <tbody id="category-container">
                {listRequest?.map((listRequest, index) => (
                  <tr key={index}>
                    <td>{listRequest.bidderId}</td>
                    <td>
                      {listRequest.firstName} {listRequest.lastName}
                    </td>
                    <td> {listRequest.id} </td>
                    <td> {listRequest.name} </td>
                    <td>{listRequest.createdAt}</td>
                    <td>
                      <div className="d-flex justify-content-between align-items-center">
                        <div
                          className="btn-group"
                          style={{ marginBottom: '20px' }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              approve(listRequest.bidderId, listRequest.id)
                            }
                          >
                            Approve
                          </button>
                          {/* <button type="button" onClick={() =>  deline(c.bidderId)}>Decline</button> */}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </section>
    ),
    reject: <ServerError />,
  };

  socket.on(`request-from-bidder`, (data) => {
    setListRequest([
      ...listRequest,
      {
        bidderId: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        id: data.id_product,
        name: data.product_name,
        createdAt: data.bidAt,
      },
    ]);
  });

  async function approve(bidderId: any, id: any) {
    socket.emit(`accepted`, {
      Id: bidderId ?? 0,
      status: 0,
    });
    await axiosClient.patch(`/api/seller/accept-bid`, {
      productId: id,
      bidderId: bidderId,
    });
    const del = [...listRequest].filter((req) => req.bidderId !== bidderId);
    setListRequest(del);
  }
  // async function deline(id: any) {
  //   await axiosClient.patch(`/api/seller/accept-bid`);
  //   const del = [...listReq].filter((req) => req.bidderId !== id);
  //   setListReq(del);
  // }
  return (
    <>
    {uiMap[status]}
    </>
  );
};
