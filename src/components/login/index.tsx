import React, { useEffect, useState, Fragment } from 'react';
import instance from '../../utils/axiosClient';
import '../../styles/global.scss';
import 'react-notifications/lib/notifications.css';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import jwt_decode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import Validator from '../../utils/validator';
import { useHistory } from 'react-router-dom';

const rules = [
  {
    field: 'username',
    method: 'isEmpty',
    validWhen: false,
    message: 'The username field is required.',
  },
  {
    field: 'password',
    method: 'isEmpty',
    validWhen: false,
    message: 'The Password field is required.',
  },
  {
    field: 'password',
    method: 'isLength',
    args: [{ min: 6 }],
    validWhen: true,
    message: 'Invalid password.',
  },
];
const validate = new Validator(rules);

export const Login: React.FC = () => {
  const [errors, set] = useState<any>({ status: 'not ok' });
  const [credential, setCre] = useState({
    username: '',
    password: '',
  });
  const history = useHistory();

  async function submitForm() {
    if (Object.keys(validate.validate(credential)).length === 0) {
      set({ status: 'ok' });
    } else {
      set(validate.validate(credential));
    }

    // console.log(credential);
  }

  useEffect(() => {
    // console.log(errors);
    if (errors.status === 'ok') {
      instance
        .post('/api/auth', {
          username: credential.username,
          password: credential.password,
        })
        .then((res) => {
          localStorage.setItem('auction-user-token', res.data.accessToken);
          var decoded: any = jwt_decode(res.data.accessToken);
          localStorage.setItem(
            'auction-user-data',
            JSON.stringify(res.data.user_info)
          );
          localStorage.setItem('auction-user-id', decoded.userId);
          localStorage.setItem('auction-user-role',res.data.user_role)
          localStorage.setItem(
            'auction-first-name',
            res.data.user_info.firstName
          );
          localStorage.setItem(
            'auction-last-name',
            res.data.user_info.lastName
          );
            if( res.data.user_role==='admin'){
              history.replace('/admin');}
              else{
              history.replace('/');}
              if( res.data.user_role!='admin'){
                instance.get(`/api/bidder/score/${decoded.userId}`).then((res1)=>{
                  localStorage.setItem('auction-user-score',res1.data.score)
                }).catch((err)=>{
                  console.log(err.response)
                })
              }
        })
        .catch((error) => {
        console.log(error.response)
         window.alert('login failed')
        });
    }
  }, [errors, history]);
  function handleChange(evt) {
    const value = evt.target.value;

    setCre({
      ...credential,
      [evt.target.name]: value,
    });
  }

  return (
    <div className="outer">
      <div className="inner">
        <form onSubmit={submitForm}>
          <h3>Log in</h3>

          <div className="form-group">
            <label>Username</label>
            <input
              type="username"
              className="form-control"
              placeholder="Enter username"
              id="username"
              name="username"
              onChange={handleChange}
            />
            {errors.username && (
              <div
                className="validation"
                style={{ display: 'block', color: 'red' }}
              >
                {errors.username}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              id="password"
              name="password"
              onChange={handleChange}
              onKeyPress={e=>{
               if(e.key==='Enter'){
                 submitForm()
               }
              }}
            />
            {errors.password && (
              <div
                className="validation"
                style={{ display: 'block', color: 'red' }}
              >
                {errors.password}
              </div>
            )}
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-dark btn-lg btn-block"
            onClick={submitForm}
          >
            Sign in
          </button>
          <div className="login-redirect">
            <p className="create-account text-left">
              <a href="/register" className="link">
                Create account
              </a>
            </p>
            <p className="forgot-password text-right">
              <a href="#" className="link">
                Forgot password?
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
