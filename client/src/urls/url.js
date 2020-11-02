/* eslint-disable import/no-anonymous-default-export */
const BASE_URL = "";

const baseUrlHasSlash = String(BASE_URL).endsWith("/");

export default (builder) => (...paramObjects) => {
  const url = builder(Object.assign({}, ...paramObjects));
  const urlHasSlash = String(url).startsWith("/");

  if (!baseUrlHasSlash && urlHasSlash) {
    return `${BASE_URL}${url}`;
  }

  if (baseUrlHasSlash && !urlHasSlash) {
    return `${BASE_URL}${url}`;
  }

  if (baseUrlHasSlash && urlHasSlash) {
    return `${BASE_URL}${url.slice(0)}`;
  }

  return `${BASE_URL}/${url}`;
};
