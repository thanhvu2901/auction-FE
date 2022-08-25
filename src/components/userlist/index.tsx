import React, { useEffect, useState } from 'react';
import { instance } from 'utils/utils';

export const Userlist: React.FC = () => {
  const [customers, set] = useState([]);
  useEffect(() => {
    instance.get('/api/user').then((res) => set(res.data));

    console.log(customers);
  }, []);

  async function submitForm(id: any) {
    // console.log(id);
    instance.delete('/api/user', {
      data: {
        id: id,
      },
    });
    // .then((res) => console.log(res))
    // .catch((err) => {
    //   console.log(err.response);
    // });
  }

  function update(id: any) {
    // console.log(id);
    let filteredArray = customers.filter((item) => item.id !== id);
    set(filteredArray);
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">First name</th>
                <th scope="col">Last name </th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.username}</td>
                  <td>{customer.email}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>
                    <div className="d-flex justify-content-between align-items-center">
                      <div
                        className="btn-group"
                        style={{ marginBottom: '20px' }}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `edit/${customer.id}`;
                          }}
                        >
                          {' '}
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            update(customer.id);
                            submitForm(customer.id);
                          }}
                        >
                          Delete
                        </button>
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
  );
};
