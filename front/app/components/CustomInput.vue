<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    label: String
  });

  const emit = defineEmits(['update:modelValue'])

  const value = computed({
    get: () => props.modelValue,
    set: (v) => emit('update:modelValue', v)
  })
</script>

<template>
  <UInput
    v-model="value"
    :ui="{ base: 'peer', trailing: 'pe-1' }"
    placeholder=""
  >
    <label class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
      <span class="inline-flex bg-default px-1">{{ label }}</span>
    </label>
    <template v-if="value?.length" #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        icon="i-lucide-circle-x"
        aria-label="Borrar"
        @click="value = ''"
      />
    </template>
  </UInput>
</template>