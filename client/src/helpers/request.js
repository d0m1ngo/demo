import qs from "qs";

const request = async ({ method, url, params, data }) => {
  try {
    const response = await fetch(
      `${url}${params ? "?" : ""}${qs.stringify(params)}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        ...(data ? { body: JSON.stringify(data) } : {}),
      }
    );

    return await response;
  } catch (error) {
    return error;
  }
};

export default {
  get: (args) => request({ method: "get", ...args }),
  post: (args) => request({ method: "post", ...args }),
  put: (args) => request({ method: "put", ...args }),
  patch: (args) => request({ method: "patch", ...args }),
  delete: (args) => request({ method: "delete", ...args }),
};
