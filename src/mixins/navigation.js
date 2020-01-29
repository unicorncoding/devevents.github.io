const mixin = {
  methods: {
    route(route, params) {
      const newParams = { ...this.$route.params, ...params };
      return { name: route, params: newParams };
    },
    newLocation({ continent: continent, country: country }) {
      const newParams = continent
        ? {
            ...this.$route.params,
            ...{ continent: continent, country: country }
          }
        : { ...this.$route.params, ...{ country: country } };
      return { name: "events", params: newParams };
    },
    newTopic(newTopic) {
      const newParams = { ...this.$route.params, ...{ topic: newTopic } };
      return { name: "events", params: newParams };
    }
  }
};

export default [mixin];
