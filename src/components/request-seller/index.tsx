import React, { useEffect, useState } from 'react';

import axiosClient from 'utils/axiosClient';

export const RequestToSeller: React.FC = () => {
  const [checkrole, setRole] = useState([]);
  useEffect(() => {
    setTimeout(async () => {
      async function role() {
        return await axiosClient.get(
          `/api/seller/checkrole/${localStorage.getItem('auction-user-id')}`
        );
      }
      role().then((res) => {
        setRole(res.data);
      });
    });
  }, []);

  if (checkrole) {
    return (
      <>
        <img src="./asset/img/seller-1200.png" alt="" width={'50%'} />
        <h2 style={{ marginLeft: '6rem' }}>You are a seller </h2>
      </>
    );
  } else
    return (
      <>
        <img src="./asset/img/seller-1200.png" alt="" width={'50%'} />
        <h2 style={{ marginLeft: '1rem' }}>Do you want to become seller? </h2>
        <button
          onClick={() => {
            axiosClient.post(
              `/api/bidder/changeRole/${localStorage.getItem(
                'auction-user-id'
              )}`
            );
            window.alert('WAIT admin approve!!');
          }}
        >
          YES
        </button>
      </>
    );
};
