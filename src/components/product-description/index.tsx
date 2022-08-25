import React, { useState } from 'react';
import '../../styles/product-description.scss';
import instance from 'utils/axiosClient';
import ReactQuill from 'react-quill';
import { useHistory, useParams } from 'react-router-dom';
export const Description: React.FC = () => {
  const id: any = useParams();
  const history = useHistory();
  const [value, setValue] = useState('');
  function submitform() {
    let date = new Date();
    const cur = date.toISOString().replace("T", " ").substring(0, 10);
    instance.post('/api/product/update', {
      id: id.id,
      value: `<p>--------${cur}---------</p>` + value
    }).then(() => {
      window.alert("add success")
      history.push('/profile/product-to-bid')

    }).catch(() => {
      window.alert("add failed")
    }
    )
    console.log(id.id)
  }
  return (
    <div>
      <div className="content-container">
        <ReactQuill className='input-content' theme="snow" onChange={setValue} />

      </div>
      <button className="bouton-description" onClick={submitform}>update</button>
    </div>
  );
};


