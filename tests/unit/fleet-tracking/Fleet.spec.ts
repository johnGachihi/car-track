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

it('Emits selection event with appropriate data when child Vehicle component is clicked', async () => {
  const vehicle = {
    plateNumber: 'kba123a',
    coordinates: { latitude: 111, longitude: 222 },
  };

  const wrapper = mount(Fleet, {
    props: { fleet: [vehicle] },
  });

  const vehicleComponent = wrapper.findComponent(Vehicle);
  await vehicleComponent.trigger('click');

  expect(wrapper.emitted('selection')?.[0]).toStrictEqual([vehicle]);
});

it('Shows that a vehicle is selected when it is clicked', async () => {
  const wrapper = mount(Fleet, {
    props: {
      fleet: [{
        plateNumber: 'kba123a',
        coordinates: { latitude: 111, longitude: 222 },
      }],
    },
  });

  const vehicleComponent = wrapper.findComponent(Vehicle);
  await vehicleComponent.trigger('click');

  expect(vehicleComponent.classes()).toContain('selected');
});
