<template>
  <AppBar title="Fleet Simulator"></AppBar>
  <main>
    <div class="content">
      <h6 class="h6">Add vehicle to fleet</h6>

      <div class="fleet"></div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppBar from '@/components/AppBar.vue';

export default defineComponent({
  name: 'FleetSimulator',
  components: { AppBar },
});
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
}
.content {
  margin-top: 32px;
  width: 60%;
}
</style>
