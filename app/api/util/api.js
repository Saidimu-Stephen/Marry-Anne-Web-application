/** @format */

const fetchWithToken = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return fetch(url, options);
};

export default fetchWithToken;
