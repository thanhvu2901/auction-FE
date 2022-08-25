import React, { useEffect, useState } from 'react';
import instance from 'utils/axiosClient';

export const CategoryList: React.FC = () => {
  const [category, set] = useState([
    {
      section: '',
      categories: [],
    },
  ]);
  useEffect(() => {
    instance.get('/api/category').then((res) => set(res.data));

    // console.log(category);
  }, []);
  async function submitForm(path: any, id: any) {
    // console.log(path);
    instance
      .delete('/api/category', {
        data: {
          path: path,
          id: id,
        },
      })
      .then((res) => {
        update(id);
        window.alert('delete success')
      })
      .catch((error) => {
     window.alert(error.response.data.status)
      });
  }

  function update(id: any) {
    //  console.log(category);

    const temp1 = [];
    category.forEach((item) => {
      const temp2 = {
        section: item.section,
        categories: (item.categories = item.categories.filter(
          (item1) => item1.id !== id
        )),
      };
      temp1.push(temp2);
    });
    //   set({
    //       ...category,
    //       section:temp1,
    //       category:temp
    //   })
    console.log(temp1);

    set(temp1);
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Section</th>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Path</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {category.map((category1) => (
                <>
                  {category1.categories.map((category2, index) => (
                    <tr key={index}>
                      <td>{category1.section}</td>
                      <td>{category2.id}</td>
                      <td>{category2.name}</td>
                      <td>{category2.path}</td>
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
                                window.location.href = `edit/${category2.id}`;
                              }}
                            >
                              {' '}
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                submitForm(category2.path, category2.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
