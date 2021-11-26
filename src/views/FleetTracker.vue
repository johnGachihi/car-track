<template>
  <app-bar title="Fleet Tracker" />
  <div class="container">
    <fleet id="fleet" :fleet="fleet" @selection="handleVehicleSelection" />
    <fleet-tracking-map id="map" :fleet="fleet" :tracked-vehicle="trackedVehicle" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, onMounted, ref, onUnmounted,
} from 'vue';
import Client, { Socket } from 'socket.io-client';
import Fleet from '@/components/fleet-tracking/Fleet.vue';
import FleetTrackingMap from '@/components/fleet-tracking/map/FleetTrackingMap.vue';
import { Vehicle } from '@/components/fleet-tracking/map/use-fleet-map';
import AppBar from '@/components/AppBar.vue';

const socketIoUrl = process.env.VUE_APP_SOCKET_IO_URL;

export default defineComponent({
  name: 'FleetTracker',
  components: { Fleet, FleetTrackingMap, AppBar },
  props: {
    socketIoClient: {
      type: Object as PropType<Socket>,
      default: () => {
        if (!socketIoUrl) {
          throw Error('VUE_APP_SOCKET_IO_URL env config not set');
        }
        return Client(socketIoUrl, {
          autoConnect: false,
        });
      },
    },
  },
  setup(props) {
    const fleet = ref<Vehicle[]>([]);
    const trackedVehicle = ref<Vehicle | undefined>();

    const handleVehicleSelection = (vehicle: Vehicle) => {
      trackedVehicle.value = vehicle;
    };

    onMounted(() => {
      if (!props.socketIoClient.connected) {
        props.socketIoClient.connect();
      }

      props.socketIoClient.on('vehicles', (_vehicles: Vehicle[]) => {
        fleet.value = _vehicles;

        setTimeout(() => props.socketIoClient.emit('received'), 600);
      });

      props.socketIoClient.on('vehicle-movement', (movedVehicle) => {
        fleet.value = fleet.value.map((vehicle) => {
          if (vehicle.plateNumber === movedVehicle.plateNumber) {
            return movedVehicle;
          }
          return vehicle;
        });
      });
    });

    onUnmounted(() => {
      props.socketIoClient.close();
    });

    return { fleet, handleVehicleSelection, trackedVehicle };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100vh;
}

#fleet {
  flex-grow: 1;
  flex-basis: 0;
  padding: {
    top: 32px;
    left: 16px;
    right: 16px;
  }
}

#map {
  flex-grow: 4;
  flex-basis: 0;
}
</style>
