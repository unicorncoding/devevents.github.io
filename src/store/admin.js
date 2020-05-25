import lazyAxios from "../utils/axios";

export default {
  namespaced: true,
  actions: {
    async confirm(undefined, eventId) {
      const axios = await lazyAxios();
      return axios
        .post(`/admin/${eventId}/confirm`)
        .then(() => location.reload());
    },
    async del(undefined, eventId) {
      const axios = await lazyAxios();
      return axios
        .post(`/admin/${eventId}/delete`)
        .then(() => location.reload());
    }
  }
};
