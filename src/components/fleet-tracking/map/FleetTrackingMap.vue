<template>
  <Map @map-created="handleMapCreated" />
</template>

<script lang="ts">
import {
  defineComponent, PropType, toRef, toRefs,
} from 'vue';
import Map from './Map.vue';
import useFleetMap, { Vehicle } from './use-fleet-map';

export default defineComponent({
  name: 'FleetTrackingMap',
  components: { Map },
  props: {
    fleet: {
      type: Array as PropType<Vehicle[]>,
      required: true,
    },
    trackedVehicle: {
      type: Object as PropType<Vehicle>,
    },
  },

  setup(props) {
    const { fleet } = toRefs(props);
    const trackedVehicle = toRef(props, 'trackedVehicle');

    const { handleMapCreated } = useFleetMap(fleet, trackedVehicle);

    return { handleMapCreated };
  },
});
</script>
