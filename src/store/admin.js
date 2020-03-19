import lazyAxios from "../utils/axios";
import api from "./api";

export default {
  namespaced: true,
  actions: {
    async confirm(undefined, eventId) {
      const axios = await lazyAxios();
      return axios
        .post(`${api}/admin/${eventId}/confirm`)
        .then(() => location.reload());
    },
    async reject(undefined, eventId) {
      const axios = await lazyAxios();
      return axios
        .post(`${api}/admin/${eventId}/reject`)
        .then(() => location.reload());
    }
  }
};
