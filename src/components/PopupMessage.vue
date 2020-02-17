<template>
  <delay :wait="10000">
    <div class="message-widget" v-if="active">
      <div class="buttons">
        <a v-on:click.stop="close">
          <i class="fas fa-times"></i>
        </a>
      </div>
      <a href="https://instagram.com/coding_unicorn" ref="nofollow"
        ><img class="agent" src="../assets/julia.png" alt="coding unicorn"
      /></a>
      <div class="message">
        <div class="content">
          <p>Want to learn from the industry leaders?</p>
          <p>
            <a
              class="button is-success"
              href="https://devternity.com?_openstat=tb;training;de"
              >Join DevTernity</a
            >
          </p>
        </div>
      </div>
    </div>
  </delay>
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
  data: function() {
    return {
      active: true
    };
  },
  methods: {
    close() {
      this.active = false;
    }
  },
  components: { Delay }
};
</script>
