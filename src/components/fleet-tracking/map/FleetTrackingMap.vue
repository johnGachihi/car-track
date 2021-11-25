<template>
  <Map :map-setter="setFleetTrackingMap" />
</template>

<script lang="ts">
import {
  defineComponent, PropType, toRefs,
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
  },

  setup(props) {
    const { fleet } = toRefs(props);

    const { setFleetTrackingMap } = useFleetMap(fleet);

    return { setFleetTrackingMap };
  },
});
</script>
