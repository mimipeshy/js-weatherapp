import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  }));
};

const AJAX = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        `${data.message[0].toUpperCase() + data.message.slice(1)} (${
          res.status
        })`,
      );
    }
    return data;
  } catch (err) {
    throw err;
  }
};
export default AJAX();