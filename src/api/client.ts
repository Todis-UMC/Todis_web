const baseURL =
  'http://ec2-13-209-15-210.ap-northeast-2.compute.amazonaws.com:8080';

const token = localStorage.getItem('token');

const baseHeaders = {
  'Content-Type': 'application/json'
};
const getHeadersWithToken = () => {
  const token = localStorage.getItem('token');
  return token
    ? { ...baseHeaders, Authorization: `Bearer ${token}` }
    : { ...baseHeaders };
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
    return sendRequest({
      url,
      params,
      headers: { ...getHeadersWithToken(), ...headers },
      method: 'get'
    });
  },
  post: ({ url, data, headers }: Omit<RequestWithData, 'method'>) => {
    return sendRequestWithData({
      url,
      data,
      headers: { ...getHeadersWithToken(), ...headers },
      method: 'post'
    });
  },
  put: ({ url, data, headers }: Omit<RequestWithData, 'method'>) => {
    return sendRequestWithData({
      url,
      data,
      headers: { ...getHeadersWithToken(), ...headers },
      method: 'put'
    });
  },
  patch: ({ url, data, headers }: Omit<RequestWithData, 'method'>) => {
    return sendRequestWithData({
      url,
      data,
      headers: { ...getHeadersWithToken(), ...headers },
      method: 'patch'
    });
  },
  delete: ({ url, params, headers }: Omit<RequestWithParams, 'method'>) => {
    return sendRequest({
      url,
      params,
      headers: { ...getHeadersWithToken(), ...headers },
      method: 'delete'
    });
  }
};
