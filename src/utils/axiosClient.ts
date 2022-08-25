import axios, { AxiosRequestConfig } from 'axios';
import jwtDecode from 'jwt-decode';

const defaultAxiosConfig: AxiosRequestConfig = {
  timeout: 20000,
  baseURL: process.env.REACT_APP_BE_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosClient = axios.create(defaultAxiosConfig);

async function refreshAccessToken(): Promise<string | null> {
  try {
    const dataSend = {
      accessToken: localStorage.getItem('auction-user-token') as string | null,
      refreshToken: JSON.parse(localStorage.getItem('auction-user-data'))
        .rfToken as string | null,
    };

    if (dataSend.accessToken === null || dataSend.refreshToken === null)
      throw new Error('Access token or refresh token is empty');

    const res = await axios.post(
      '/api/auth/refresh',
      dataSend,
      defaultAxiosConfig
    );
    if (res.status !== 201) throw new Error(`Can't get access token`);

    const accessToken = res.data.accessToken;

    localStorage.setItem('auction-user-token', accessToken);
    localStorage.setItem(
      'auction-user-data',
      (jwtDecode(accessToken) as any).user_data
    );

    return accessToken;
  } catch (error) {
    localStorage.removeItem('auction-user-token');
    localStorage.removeItem('auction-user-data');

    throw error;
  }
}

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem('auction-user-token') as
      | string
      | null;

    if (accessToken) {
      config.headers = {
        authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    if (response.status === 401) {
      try {
        const accessToken: string | null = await refreshAccessToken();

        response.config.headers['authorization'] = `Bearer ${accessToken}`;
        localStorage.setItem('access-user-token', accessToken);
        return axios(response.config);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
