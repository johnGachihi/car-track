import { mount } from '@vue/test-utils';
import TextField from '@/components/TextField.vue';

it('Shows label', () => {
  const wrapper = mount(TextField, {
    props: { label: 'A nice label' },
  });

  expect(wrapper.text()).toContain('A nice label');
});

it('Shows error', () => {
  const wrapper = mount(TextField, {
    props: { error: 'Invalid input' },
  });

  expect(wrapper.text()).toContain('Invalid input');
});

it('Sets modelValue prop as the input elements value', () => {
  const wrapper = mount(TextField, {
    props: { modelValue: 'A certain value' },
  });

  const input = wrapper.find('input');
  expect(input.element.value).toEqual('A certain value');
});

it('Emits update:modelValue events when written on', async () => {
  const wrapper = mount(TextField);

  const input = wrapper.find('input');
  input.setValue('T');
  input.setValue('e');

  const emittedEvents = wrapper.emitted('update:modelValue');
  expect(emittedEvents?.[1]).toEqual(['e']);
});
