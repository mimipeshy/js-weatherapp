import { TIMEOUT_SEC } from './config';

const timeout = (s) => new Promise(((_, reject) => {
  setTimeout(() => {
    reject(new Error(`Request took too long! Timeout after ${s} second`));
  }, s * 1000);
}));

async function AJAX(url) {
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
};
export default AJAX();