import url from "./url";

export default url(
  ({ processId = ":processId" }) => `/processes/${processId}/jobs`
);
