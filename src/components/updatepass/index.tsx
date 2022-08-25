import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import '../../styles/profile.scss';

import instance from 'utils/axiosClient';
import { useHistory } from 'react-router-dom';
export const ChangePass: React.FC = () => {
  const history=useHistory()
  const [credential, setCre] = useState({
    id: '',
    current_pass: '',
    new_pass: '',
    confirm: '',
  });
  useEffect(() => {
    const token = localStorage.getItem('auction-user-token');
    const id: any = jwt_decode(token);
    setCre({
      ...credential,
      id: id.userId,
    });
  }, []);
  function submitform() {
    instance.patch('/api/user/reset-password', {
      id: credential.id,
      current_pass: credential.current_pass,
      new_pass: credential.new_pass,
    }).then(()=>{
      window.alert('update success')
      history.push('/profile')
    })
    .catch((err)=>{
      window.alert('update failed')
      console.log(err.response)
    })
  }
  function handleChange(evt) {
    const value = evt.target.value;

    setCre({
      ...credential,
      [evt.target.name]: value,
    });
  }

  return (
    <div className="change-pass-container">
      <form>
        <div className="form-reset">
          <div className="form-group">
            <p>Current password </p>
            <span className="icon-case">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type="password"
              name="current_pass"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <p>New password </p>
            <span className="icon-case">
              <i className="fa fa-lock"></i>
            </span>
            <input type="password" name="new_pass" onChange={handleChange} />
          </div>
          <div className="form-group">
            <p>Confirm new password </p>
            <span className="icon-case">
              <i className="fa fa-lock"></i>
            </span>
            <input type="password" name="confirm" onChange={handleChange} />
          </div>
        </div>
        <button type="button" className="bouton-contact" onClick={submitform}>
          Update
        </button>
      </form>
    </div>
  );
};
