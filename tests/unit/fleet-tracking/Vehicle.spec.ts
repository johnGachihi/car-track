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

it('Applies `selected` CSS class when selected prop true', () => {
  const wrapper = mount(Vehicle, {
    props: {
      plateNumber: 'kba123a',
      coordinates: {
        latitude: 123,
        longitude: 456,
      },
      selected: true,
    },
  });

  expect(wrapper.classes()).toContain('selected');
});

it('Emits click event with appropriate data when clicked', async () => {
  const mockClickHandler = jest.fn();

  const vehicle = {
    plateNumber: 'kba123a',
    coordinates: {
      latitude: 123,
      longitude: 456,
    },
  };

  const wrapper = mount(Vehicle, {
    props: {
      ...vehicle,
      selected: true,
      onClicked: mockClickHandler,
    },
  });

  await wrapper.trigger('click');

  expect(wrapper.emitted('click')?.length).toBe(1);
  expect(wrapper.emitted('click')?.[0]).toStrictEqual([vehicle]);
});
