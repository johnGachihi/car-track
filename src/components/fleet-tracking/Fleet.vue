<template>
  <div class="fleet-container">
    <vehicle-component
      class="vehicle"
      v-for="vehicle in fleet"
      :key="vehicle.plateNumber"
      v-bind="vehicle"
      @click="handleVehicleClick"
      :selected="isVehicleSelected(vehicle)"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref,
} from 'vue';
import VehicleComponent from '@/components/fleet-tracking/Vehicle.vue';
import { Vehicle } from './map/use-fleet-map';

export default defineComponent({
  name: 'Fleet',
  components: { VehicleComponent },
  emits: {
    selection: (vehicle: Vehicle) => {
      if (vehicle) {
        return true;
      }
      return false;
    },
  },
  props: {
    fleet: {
      type: Array as PropType<Vehicle[]>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const selectedVehicle = ref<Vehicle | undefined>();

    const handleVehicleClick = (vehicle: Vehicle) => {
      selectedVehicle.value = vehicle;
      emit('selection', vehicle);
    };

    const isVehicleSelected = (vehicle: Vehicle) => {
      const isSelected = vehicle.plateNumber === selectedVehicle.value?.plateNumber;
      return isSelected;
    };

    return { handleVehicleClick, isVehicleSelected };
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
