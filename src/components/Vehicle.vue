<template>
  <div>
    <span>Plate number: {{ vehicle?.plateNumber }}</span> |
    <span>Latitude: {{ vehicle?.startingPoint.latitude }}</span> |
    <span>Longitude: {{ vehicle?.startingPoint.longitude }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted } from 'vue';
import Client, { Socket } from 'socket.io-client';

export default defineComponent({
  props: {
    vehicle: Object as PropType<{
      plateNumber: string,
      startingPoint: {
        latitude: number,
        longitude: number,
      }
    }>,
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
