import 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
polyfill();

export default (url, method = 'GET', body = {}) => {
  let promise;

  if (method === 'POST') {
    promise = fetch(url, {
      method,
      body: JSON.stringify(body)
    });
  } else {
    promise = fetch(url);
  }

  return promise.then(results => results.json());
};
