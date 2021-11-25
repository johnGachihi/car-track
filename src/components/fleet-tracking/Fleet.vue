<template>
  <div class="fleet-container">
    <vehicle-component
      class="vehicle"
      v-for="vehicle in fleet"
      :key="vehicle.plateNumber"
      v-bind="vehicle"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import VehicleComponent from '@/components/fleet-tracking/Vehicle.vue';
import { Vehicle } from './map/use-fleet-map';

export default defineComponent({
  name: 'Fleet',
  components: { VehicleComponent },
  props: {
    fleet: {
      type: Array as PropType<Vehicle[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.fleet-container {
  height: 100%;
  overflow-y: scroll;
}
.vehicle {
  margin-bottom: 16px;
}
</style>
