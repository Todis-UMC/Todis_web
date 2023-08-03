import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
const baseURL = 'http://13.209.73.222:8080';

const baseHeaders = {
  'Content-Type': 'application/json'
};

interface Request {
  url: string;
  headers?: object;
  method: 'get' | 'post' | 'delete' | 'patch' | 'put';
}

interface RequestWithParams extends Request {
  method: 'get' | 'delete';
  params: object;
}

interface RequestWithData extends Request {
  method: 'post' | 'patch' | 'put';
  data: object;
}

const sendRequest = async ({ url, headers, method }: RequestWithParams) => {
  return fetch(baseURL + url, {
    method,
    headers: { ...baseHeaders, ...headers }
  }).then((res) => res.json());
};

const sendRequestWithData = async ({
  url,
  headers,
  method,
  data
}: RequestWithData) => {
  return fetch(baseURL + url, {
    method,
    headers: { ...baseHeaders, ...headers },
    body: JSON.stringify(data)
  }).then((res) => res.json());
};

export const request = {
  get: ({ url, params, headers }: Omit<RequestWithParams, 'method'>) => {
    return sendRequest({ url, params, headers, method: 'get' });
  },
  post: ({ url, data, headers }: Omit<RequestWithData, 'method'>) => {
    return sendRequestWithData({ url, data, headers, method: 'post' });
  },
  put: ({ url, data, headers }: Omit<RequestWithData, 'method'>) => {
    return sendRequestWithData({ url, data, headers, method: 'put' });
  },
  patch: ({ url, data, headers }: Omit<RequestWithData, 'method'>) => {
    return sendRequestWithData({ url, data, headers, method: 'patch' });
  },
  delete: ({ url, params, headers }: Omit<RequestWithParams, 'method'>) => {
    return sendRequest({ url, params, headers, method: 'delete' });
  }
};
