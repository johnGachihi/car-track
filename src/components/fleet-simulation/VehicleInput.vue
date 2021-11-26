<template>
  <div class="card">
    <div class="card-content">
      <TextField
        id="plate-number"
        label="Plate Number"
        v-model="plateNumber"
        :error="plateNumberFieldError"
      />

      <div class="coordinates">
        <TextField label="Latitude" v-model="latitude" type="number" />
        <TextField label="Longitude" v-model="longitude" type="number" />
      </div>
      <button @click="handleSubmit">Submit</button>
    </div>
  </div>

</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watch,
} from 'vue';
import TextField from '../TextField.vue';
import NonUniquePlateNumberError from '@/utils/NonUniquePlateNumberError';
import { VehicleSimulation } from './VehicleSimulation';

export default defineComponent({
  name: 'VehicleInput',
  props: {
    onSubmit: {
      type: Function as PropType<(v: VehicleSimulation) => void>,
      required: true,
    },
  },
  components: { TextField },

  setup(props) {
    const plateNumber = ref('');
    const plateNumberFieldError = ref('');
    const latitude = ref(-1);
    const longitude = ref(36);

    const handleSubmit = () => {
      if (plateNumber.value === '') {
        plateNumberFieldError.value = 'Plate number required';
        return;
      }

      const vehicle: VehicleSimulation = {
        plateNumber: plateNumber.value,
        startingPoint: {
          latitude: latitude.value,
          longitude: longitude.value,
        },
      };

      try {
        props.onSubmit(vehicle);
      } catch (e) {
        if (e instanceof NonUniquePlateNumberError) {
          plateNumberFieldError.value = 'Vehicle with plate number already exists!';
        }
      }
    };

    watch(latitude, (newValue) => {
      // eslint-disable-next-line radix
      console.log(parseFloat(`${newValue}`));
    });

    /* const longitudeFieldError = computed(() => {
      if (longitude.value)
    }) */

    return {
      plateNumber, plateNumberFieldError, latitude, longitude, handleSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
@use "@/style/_colors";
@use "sass:color";
.card {
  border: 1px solid colors.$border;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.card-content {
  margin: 20px 30px
}

#plate-number {
  width: 100%;
}

.coordinates {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;

  & > * {
    margin-right: 16px
  }
}
</style>
