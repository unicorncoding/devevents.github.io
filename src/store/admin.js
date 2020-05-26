import lazyAxios from "../utils/axios";

export default {
  namespaced: true,
  actions: {
    async del(undefined, eventId) {
      const axios = await lazyAxios();
      return axios
        .post(`/admin/${eventId}/delete`)
        .then(() => location.reload());
    }
  }
};
