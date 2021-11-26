<template>
  <nav class="app-bar">
    <h5 class="title h5">{{ title }}</h5>

    <div class="links">
      <router-link to="/" target="_blank">Fleet Tracker</router-link>
      <router-link to="/fleet-simulator" target="_blank">Simulator</router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppBar',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
@use '@/style/_colors';
.app-bar {
  height: 60px;
  box-shadow: 0px 3px 6px -4px #545454;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: {
    left: 40px;
    right: 40px;
  }
}

.title {
  margin: 0;
}

.links a {
  text-decoration: none;
  font-weight: bold;
  margin-left: 16px;
  color: colors.$primaryText;
  &.router-link-exact-active {
    color: colors.$primary;
  }
}
</style>
