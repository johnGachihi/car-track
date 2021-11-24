import Vehicle from './Vehicle.vue';

export default {
  title: 'Components/Fleet-Tracker/Vehicle',
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
  plateNumber: 'kba123a',
  coordinates: {
    latitude: 123,
    longitude: 456,
  },
};
