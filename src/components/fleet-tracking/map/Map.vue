<template>
  <div ref="mapEl" style="height: 100vh"></div>
</template>

<script lang="ts">
import {
  defineComponent, ref, onMounted, PropType,
} from 'vue';
import mapboxGl, { Map as MapboxGlMap } from 'mapbox-gl';

export default defineComponent({
  name: 'Map',
  props: {
    // Allows this component to lift Mapbox Map to parent component
    mapSetter: Function as PropType<(map: MapboxGlMap) => void>,
  },

  setup(props) {
    const mapEl = ref<HTMLDivElement | null>(null);

    onMounted(() => {
      if (mapEl.value) {
        const mapboxglAccessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
        if (!mapboxglAccessToken) {
          throw new Error('Required VUE_APP_MAPBOX_ACCESS_TOKEN config not set');
        }

        mapboxGl.accessToken = mapboxglAccessToken;
        const map = new mapboxGl.Map({
          container: mapEl.value,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: { lon: 36, lat: -1 },
          zoom: 5,
        });

        if (props.mapSetter) props.mapSetter(map);
      }
    });

    return { mapEl };
  },
});
</script>
