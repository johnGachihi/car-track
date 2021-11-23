<template>
  <div class="card">
    <div class="card-content">
    <TextField
      id="plate-number"
      label="Plate Number"
      v-model="plateNumber"
    />

    <div class="coordinates">
      <TextField
        label="Latitude"
        v-model="latitude"
      />

      <TextField
        label="Longitude"
        v-model="longitude"
      />
    </div>
    <button @click="handleSubmit">Submit</button>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TextField from './TextField.vue';

export default defineComponent({
  name: 'VehicleInput',
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  components: {
    TextField,
  },
  setup(props) {
    const plateNumber = ref('');
    const latitude = ref(0.01);
    const longitude = ref(0.01);

    const handleSubmit = () => props.onSubmit({
      plateNumber: plateNumber.value,
      latitude: latitude.value,
      longitude: longitude.value,
    });

    return {
      plateNumber, latitude, longitude, handleSubmit,
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
