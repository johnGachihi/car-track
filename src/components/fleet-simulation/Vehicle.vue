<template>
  <div class="container">
    <div class="plate-number">
      <span class="caption">Plate Number</span>
      <span class="h6">{{vehicle.plateNumber}}</span>
    </div>

    <div class="coordinates">
      <div>
        <span class="caption">Latitude</span>
        <span class="body1">{{vehicle.startingPoint.latitude}}</span>
      </div>

      <div>
        <span class="caption">Longitude</span>
        <span class="body1">{{vehicle.startingPoint.longitude}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted } from 'vue';
import Client, { Socket } from 'socket.io-client';
import { VehicleSimulation } from './VehicleSimulation';

export default defineComponent({
  props: {
    vehicle: {
      type: Object as PropType<VehicleSimulation>,
      required: true,
    },
  },
  setup() {
    onMounted(() => {
      const io: Socket = Client('http://localhost:3000');
      io.on('connect', () => {
        console.log('connected');
      });
    });
  },
});
</script>

<style lang="scss" scoped>
@use "@/style/_colors";
.container {
  display: flex;
  border-radius: 4px;
  border: 1px solid colors.$border;
  padding: 16px;
}

.plate-number {
  margin-right: 48px;

  .h6 {
    text-transform: uppercase;
  }
}

.coordinates {
  display: flex;

  & > * {
    margin-right: 16px;
  }
}

.caption {
  display: block
}
</style>
