import TextField from './TextField.vue';

export default {
  title: 'Components/TextField',
  component: TextField,
};

const Template = (args) => ({
  components: { TextField },
  setup() {
    return { args };
  },
  template: '<text-field v-bind="args" />',
});

export const Primary = Template.bind({ });
Primary.args = {
  label: 'A label',
};
