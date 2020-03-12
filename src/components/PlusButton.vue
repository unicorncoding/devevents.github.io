<template>
  <router-link
    :to="{ path: 'new', append: true }"
    class="button has-background-success has-text-white"
  >
    <i class="fas fa-plus"></i>
  </router-link>
</template>
<script></script>
<style lang="scss" scoped>
.button:hover {
  text-decoration: none;
}
.button {
  background-color: #42b983 !important;
  position: fixed;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  box-shadow: -6px 6px 22px -12px rgb(153, 116, 116);
  padding: 10px 16px;
  font-size: 18px;
  border-radius: 99px;
  border: 0;
}
</style>
