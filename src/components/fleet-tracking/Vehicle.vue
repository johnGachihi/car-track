<template>
  <div
    class="container"
    :class="{ 'selected': selected }"
    @click="handleClick"
  >
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
import { defineComponent, PropType, toRefs } from 'vue';
import { Vehicle } from './map/use-fleet-map';

export default defineComponent({
  name: 'Vehicle',
  emits: {
    click: (vehicle: Vehicle) => {
      if (vehicle) {
        return true;
      }
      return false;
    },
  },
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
    selected: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const { plateNumber, coordinates } = toRefs(props);

    const handleClick = () => {
      emit('click', {
        plateNumber: plateNumber.value,
        coordinates: coordinates.value,
      });
    };

    return { handleClick };
  },
});
</script>

<style lang="scss" scoped>
@use "@/style/_colors";
@use "sass:color";
.container {
  border: 1px solid colors.$border;
  border-radius: 4px;
  max-width: 400px;
  padding: 16px 16px;
  cursor: pointer;

  &.selected {
    background-color: color.change(colors.$secondary, $alpha: 0.5);
  }
}
.caption {
  display: block;
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
