<template>
  <div class="container">
    <div>
      <span class="caption">Plate Number:</span>
      <span class="plate-number h6">{{ plateNumber }}</span>
    </div>

    <div class="coordinates">
      <div>
        <span class="caption">Latitude:</span>
        <span class="body1">{{ coordinates.latitude.toPrecision(3) }}</span>
      </div>

      <div>
        <span class="caption">Longitude:</span>
        <span class="body1">{{ coordinates.longitude.toPrecision(3) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Vehicle',
  props: {
    plateNumber: {
      type: String,
      required: true,
    },
    coordinates: {
      type: Object as PropType<{
        latitude: number
        longitude: number
      }>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@use "@/style/_colors";
.caption {
  display: block;
}
.container {
  border: 1px solid colors.$border;
  border-radius: 4px;
  max-width: 400px;
  padding: 16px 16px;
}
.plate-number {
  display: block;
  text-transform: uppercase;
}

.coordinates {
  margin-top: 16px;
  display: flex;
}

.coordinates > * {
  margin-right: 16px;
}
</style>
