import { mount } from '@vue/test-utils';
import Vehicle from '@/components/fleet-tracking/Vehicle.vue';

it('Displays vehicle plate-number', () => {
  const wrapper = mount(Vehicle, {
    props: {
      plateNumber: 'kba123a',
      coordinates: {
        latitude: 123,
        longitude: 456,
      },
    },
  });

  expect(wrapper.text()).toContain('kba123a');
});

it('Displays vehicle coordinates', () => {
  const wrapper = mount(Vehicle, {
    props: {
      plateNumber: 'kba123a',
      coordinates: {
        latitude: 123,
        longitude: 456,
      },
    },
  });

  const renderedText = wrapper.text();
  expect(renderedText).toContain('123');
  expect(renderedText).toContain('456');
});
