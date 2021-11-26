<template>
  <div class="container">
    <div class="plate-number">
      <span class="caption">Plate Number</span>
      <span class="h6">{{ vehicle.plateNumber }}</span>
    </div>

    <div class="coordinates">
      <div>
        <span class="caption">Latitude</span>
        <span class="body1">{{ coordinates.latitude.toPrecision(3) }}</span>
      </div>

      <div>
        <span class="caption">Longitude</span>
        <span class="body1">{{ coordinates.longitude.toPrecision(3) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, onUnmounted, watch,
} from 'vue';
import Client, { Socket } from 'socket.io-client';
import { VehicleSimulation } from './VehicleSimulation';
import useMovementSimulation from './use-movement-simulation';

const socketIoUrl = process.env.VUE_APP_SOCKET_IO_URL;

export default defineComponent({
  props: {
    vehicle: {
      type: Object as PropType<VehicleSimulation>,
      required: true,
    },
  },
  setup(props) {
    const coordinates = useMovementSimulation({
      latitude: props.vehicle.startingPoint.latitude,
      longitude: props.vehicle.startingPoint.longitude,
    });

    if (!socketIoUrl) {
      throw new Error('VUE_APP_SOCKET_IO_URL env config not set');
    }

    const clientSocket: Socket = Client(socketIoUrl);
    clientSocket.on('connect', () => {
      console.log('connected');
    });

    onUnmounted(() => clientSocket.close());

    watch(coordinates, (value) => {
      console.log('emitting coordinates');
      clientSocket.emit('vehicle-movement', {
        plateNumber: props.vehicle.plateNumber,
        coordinates: value,
      });
    });

    return { coordinates };
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
