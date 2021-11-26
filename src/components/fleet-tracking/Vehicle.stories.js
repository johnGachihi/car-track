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

export const Default = Template.bind({ });
Default.args = {
  plateNumber: 'kba123a',
  coordinates: {
    latitude: 123,
    longitude: 456,
  },
};

export const Selected = Template.bind({ });
Selected.args = {
  plateNumber: 'kba123a',
  coordinates: {
    latitude: 123,
    longitude: 456,
  },
  selected: true,
};
