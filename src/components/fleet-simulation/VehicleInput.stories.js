import Vehicle from './VehicleInput.vue';

export default {
  title: 'Components/Fleet-Simulation/VehicleInput',
  component: Vehicle,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Vehicle },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<vehicle v-bind="args" />',
});

export const Primary = Template.bind({ });
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  onSubmit: () => 0,
};
