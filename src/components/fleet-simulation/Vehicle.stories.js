import Vehicle from './Vehicle.vue';

export default {
  title: 'Components/Fleet-Simulation/Vehicle',
  component: Vehicle,
};

const Template = (args) => ({
  components: { Vehicle },
  setup() {
    return { args };
  },
  template: '<vehicle v-bind="args" />',
});

export const Primary = Template.bind({ });
Primary.args = {
  vehicle: {
    plateNumber: 'kaa123a',
    startingPoint: {
      latitude: -1,
      longitude: 42,
    },
  },
};
