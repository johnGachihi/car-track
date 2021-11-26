import { mount } from '@vue/test-utils';
import VehicleInput from '@/components/fleet-simulation/VehicleInput.vue';
import TextField from '@/components/TextField.vue';

it('Calls function provided as onSubmit prop with appropriate arguments', async () => {
  const mockSubmitHandler = jest.fn();

  const wrapper = mount(VehicleInput, {
    props: { onSubmit: mockSubmitHandler },
  });

  await wrapper.findAllComponents(TextField)[0].setValue('kbc123a');
  await wrapper.findAllComponents(TextField)[1].setValue(100.01);
  await wrapper.findAllComponents(TextField)[2].setValue(100.01);

  await wrapper.find('button').trigger('click');

  expect(mockSubmitHandler).toBeCalledWith({
    plateNumber: 'kbc123a',
    startingPoint: {
      latitude: 100.01,
      longitude: 100.01,
    },
  });
});

it('Shows error message when submit clicked and plate-number field has no value', async (done) => {
  const wrapper = mount(VehicleInput, {
    props: { onSubmit: jest.fn() },
  });

  await wrapper.find('button').trigger('click');

  setTimeout(() => {
    expect(wrapper.text()).toContain('Plate number required');
    done();
  }, 1000);
});
