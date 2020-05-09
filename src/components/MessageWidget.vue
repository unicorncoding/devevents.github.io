<template>
  <Delay :wait="10000" v-if="!closed">
    <div class="message-widget">
      <div class="buttons">
        <a v-on:click.stop="close()">
          <font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
        </a>
      </div>
      <a :href="'https://twitter.com/devternity'">
        <img
          class="agent"
          src="https://twitter-avatar.now.sh/devternity"
          alt="DevTernity avatar"
        />
      </a>
      <div class="message">
        <div class="content">
          <p>Want to learn from industry leaders?</p>
          <a href="https://devternity.com" class="button is-success">
            Join DevTernity
          </a>
        </div>
      </div>
    </div>
  </Delay>
</template>
<style lang="scss">
.message-widget {
  opacity: 0.95;
  border-radius: 5px;
  width: 320px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 40;
  box-shadow: 2px 10px 40px rgba(22, 20, 19, 0.4);
  .buttons {
    position: absolute;
    right: 10px;
    a {
      color: #dbdbdb;
    }
  }
  .message {
    font-size: 0.9em;
    padding: 30px;
  }
  .agent {
    position: absolute;
    left: -40px;
    top: 20px;
    border: 3px solid #fff;
    width: 60px;
    border-radius: 50%;
  }
}
</style>
<script>
import Delay from "./Delay";
export default {
  components: { Delay },
  data: function() {
    return {
      closed: false
    };
  },
  methods: {
    close() {
      this.closed = true;
    }
  }
};
</script>
