const mixin = {
  methods: {
    newLocation: function(newLocation) {
      const newPath = this.$route.params.cfp ? "/cfp/" + newLocation : "/" + newLocation;
      return { path: newPath };
    }
  }
}

export default [ mixin ]