import * as globalAxios from "axios";
import store from "../store";
import { authReady, jwtToken } from "./firebase";

import Vue from "vue";

const httpError = e =>
  Vue.notify({
    ignoreDuplicates: true,
    title: "Something went wrong while talking to the server:",
    type: "error",
    duration: -1,
    text: e
  });

const createAxios = () => {
  const axios = globalAxios.create();
  axios.interceptors.request.use(
    async options => {
      store.dispatch("fetching/inProgress");
      options.headers["Authorization"] = await jwtToken();
      return options;
    },
    error => {
      store.dispatch("fetching/done");
      httpError(error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    response => {
      store.dispatch("fetching/done");
      return response;
    },
    error => {
      const status = error.response.status;
      if (422 !== status && 409 !== status) {
        httpError(error);
      }
      store.dispatch("fetching/done");
      return Promise.reject(error);
    }
  );
  return axios;
};

export default () =>
  new Promise((resolve, reject) => {
    authReady()
      .then(() => resolve(createAxios()))
      .catch(reject);
  });
