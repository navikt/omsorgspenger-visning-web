import { redirect } from './browserUtils';
import { loginWithRedirect } from './apiConfig';
import ResponseData from './ResponseData';
import ResponseError from './ResponseError';

function checkStatus(response: ResponseData) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    const url = loginWithRedirect();
    redirect(url);
    return;
  }
  const error = new ResponseError(response);
  error.response = response;
  throw error;
}

const getData = (response: Response): Promise<ResponseData> => {
  return response
    .json()
    .then(data => ({
      data,
      status: response.status,
      statusText: response.statusText,
    }))
    .catch(() => {
      console.log('No JSON data in response');
      return {
        status: response.status,
        statusText: response.statusText,
      };
    });
};

export const get = (
  url: string,
  options: RequestInit = {},
): Promise<ResponseData> => {
  // @ts-ignore
  return fetch(url, {
    ...options,
    credentials: 'include',
  })
    .then(getData)
    .then(checkStatus);
};
