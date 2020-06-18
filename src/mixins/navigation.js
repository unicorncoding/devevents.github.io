const mixin = {
  methods: {
    route(route, params) {
      const newParams = { ...this.$route.params, ...params };
      return { params: newParams };
    },
    scrollIntoView(classname) {
      const [destination] = this.$el.getElementsByClassName(classname);
      destination.scrollIntoView({ behavior: "smooth" });
    }
  }
};

export default [mixin];
