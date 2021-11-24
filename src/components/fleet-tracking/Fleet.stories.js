import Fleet from './Fleet.vue';

export default {
  title: 'Components/Fleet-Tracker/Fleet',
  component: Fleet,
};

const Template = (args) => ({
  components: { Fleet },
  setup() {
    return { args };
  },
  template: '<fleet v-bind="args" />',
});

export const Primary = Template.bind({ });
Primary.args = {
  fleet: [
    {
      plateNumber: 'kba123a',
      coordinates: { latitude: 111, longitude: 222 },
    },
    {
      plateNumber: 'kbb123b',
      coordinates: { latitude: 333, longitude: 444 },
    },
    {
      plateNumber: 'kbc123c',
      coordinates: { latitude: 333, longitude: 444 },
    },
    {
      plateNumber: 'kbd123d',
      coordinates: { latitude: 333, longitude: 444 },
    },
    {
      plateNumber: 'kbe123e',
      coordinates: { latitude: 333, longitude: 444 },
    },
  ],
};
