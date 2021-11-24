<template>
  <AppBar title="Fleet Simulator"></AppBar>
  <main>
    <div class="content">
      <h6 class="h6">Add vehicle to fleet</h6>
      <div class="fleet">
          <VehicleInput :on-submit="addVehicleToFleet" />

          <Vehicle
            v-for="vehicle in fleet"
            :vehicle="vehicle"
            v-bind:key="vehicle.plateNumber"
          />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AppBar from '@/components/AppBar.vue';
import VehicleInput from '@/components/VehicleInput.vue';
import Vehicle from '@/components/Vehicle.vue';
import NonUniquePlateNumberError from '@/utils/NonUniquePlateNumberError';

export type VehicleSimulation = {
  plateNumber: string,
  startingPoint: {
    latitude: number
    longitude: number
  }
}

export default defineComponent({
  name: 'FleetSimulator',
  components: { AppBar, VehicleInput, Vehicle },
  setup() {
    const fleet = ref<VehicleSimulation[]>([]);

    const addVehicleToFleet = (newVehicle: VehicleSimulation) => {
      const isPlateNumberUnique = fleet.value.every(
        (vehicle) => vehicle.plateNumber !== newVehicle.plateNumber,
      );

      if (!isPlateNumberUnique) throw new NonUniquePlateNumberError();

      fleet.value = [...fleet.value, newVehicle];
    };

    return { fleet, addVehicleToFleet };
  },
});
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
}
.content {
  margin-top: 32px;
  width: 60%;
}

.fleet {
  margin-top: 16px;
}
</style>
