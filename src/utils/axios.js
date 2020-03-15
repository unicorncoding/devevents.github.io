import * as globalAxios from "axios";

export default (jwtToken = undefined) => {
  const newAxios = globalAxios.create();
  newAxios.interceptors.request.use(config => {
    config.headers.authorization = jwtToken;
    return config;
  });
  return newAxios;
};
