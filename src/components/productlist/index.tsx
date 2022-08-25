import React, { useEffect, useState } from 'react';
import { instance } from 'utils/utils';
import { Markup } from 'interweave';
export const Productlist: React.FC = () => {
  const [customers, set] = useState([]);
  useEffect(() => {
    instance.get('/api/product').then((res) => set(res.data));

    // console.log(customers);
  }, []);

  async function submitForm(id: any) {
    // console.log(id);
    instance
      .delete('/api/product', {
        data: {
          id: id,
        },
      })
      .then((res) => {
      console.log(res)
      window.alert('delete success')
    }
      ).catch((err)=>{
        console.log(err.response)
        window.alert('delete failed')
      });
  }

  function update(id: any) {
    // console.log(id);
    let filteredArray = customers.filter((item) => item.id !== id);
    set(filteredArray);
  }
  return (
    <div>
      <div className="list-container">
        <div className="row">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Seller id</th>
                <th scope="col">Product id</th>
                <th scope="col">Name</th>
                <th scope="col">Reserved price</th>
                <th scope="col">Price step</th>
                <th scope="col">Instant prince</th>
                <th scope="col">Is renewal </th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.sellerId}</td>
                  <td>{customer.name}</td>
                  <td>{customer.reservedPrice}</td>
                  <td>{customer.priceStep}</td>
                  <td>{customer.instantPrice}</td>
                  <td>{customer.isRenewal}</td>
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
