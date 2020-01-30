const mixin = {
  methods: {
    route(route, params) {
      const newParams = { ...this.$route.params, ...params };
      return { name: route, params: newParams };
    }
  }
};

export default [mixin];
