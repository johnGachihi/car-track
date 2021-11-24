import { mount } from '@vue/test-utils';
import Fleet from '@/components/fleet-tracking/Fleet.vue';
import Vehicle from '@/components/fleet-tracking/Vehicle.vue';

const fleet = [
  {
    plateNumber: 'kba123a',
    coordinates: { latitude: 111, longitude: 222 },
  },
  {
    plateNumber: 'kbb123b',
    coordinates: { latitude: 333, longitude: 444 },
  },
];

it('Displays vehicles provided in fleet prop', () => {
  const wrapper = mount(Fleet, { props: { fleet } });

  const vehicleComponents = wrapper.findAllComponents(Vehicle);
  expect(vehicleComponents.length).toBe(2);

  const renderedText = wrapper.text();
  expect(renderedText).toContain('kba123a');
  expect(renderedText).toContain('kbb123b');
  expect(renderedText).toContain('111');
  expect(renderedText).toContain('222');
  expect(renderedText).toContain('333');
  expect(renderedText).toContain('444');
});
