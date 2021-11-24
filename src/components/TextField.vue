<template>
  <div>
    <label>{{ label }}</label>
    <input v-model="value" :type="type" />
    <small v-if="error" class="error">*{{ error }}</small>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, WritableComputedRef } from 'vue';

export default defineComponent({
  name: 'TextField',
  props: {
    label: String,
    modelValue: [String, Number],
    error: String,
    type: {
      type: String,
      validator: (value: string) => ['text', 'number'].includes(value),
      default: () => 'text',
    },
  },
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const value: WritableComputedRef<string | number | undefined> = computed({
      get(): string | number | undefined {
        return props.modelValue;
      },
      set(val: string | number | undefined) {
        emit('update:modelValue', val);
      },
    });

    return { value };
  },
});
</script>

<style lang="scss" scoped>
@use "@/style/_colors";
@use "sass:color";

label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
}

input {
  height: 25px;
  border-radius: 4px;
  border: 1px solid colors.$border;
  padding: 8px 12px;
  font-size: 18px;
  transition: border-color, box-shadow 100ms;
  outline: none;

  &:hover, &:focus {
    border: 1px solid colors.$primary;
  }

  &:focus {
    box-shadow: color.change(colors.$primary, $alpha: 0.25) 0 0 0 0.2rem,
  }
}

small {
  color: red;
  display: block;
  margin-top: 4px;
}
</style>
