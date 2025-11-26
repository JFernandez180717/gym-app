<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

const inputDateRef = useTemplateRef('inputDateRef')

const modelValue = shallowRef(new CalendarDate(2022, 1, 10))

const id = ref('');
const name = ref('');
const lastName = ref('');
const height = ref('');
const weight = ref('');
const itemsRH = ref(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
const rh = ref('')
const itemsGenre = ref(['Masculino', 'Femenino'])
const genre = ref('')

</script>
<template>
  <div class="min-h-screen flex flex-col">
    <h1 class="w-3xl text-2xl pb-3.5 pt-2">
      Registrar Cliente Nuevo
    </h1>
    <UCard class="min-h-screen overflow-x-hidden shadow-xl" variant="subtle">
      <template #header>
        <h2 class="text-xl">Datos Personales</h2>
      </template>
      <div class="grid grid-cols-12 gap-4">
        <CustomInput class="col-span-12 lg:col-span-4" v-model="id" label="Identificación"/>
        <CustomInput class="col-span-12 lg:col-span-4" v-model="name" label="Primer Nombre"/>
        <CustomInput class="col-span-12 lg:col-span-4" v-model="lastName" label="Apellido"/>
        <UInputDate 
          class="col-span-12 lg:col-span-4 justify-center" 
          ref="inputDateRef" 
          v-model="modelValue"
        >
          <label class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
            <span class="inline-flex bg-default px-1">Fecha de Nacimiento</span>
          </label>
          <template #trailing>
            <UPopover :reference="inputDateRef?.inputsRef[3]?.$el">
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                icon="i-lucide-calendar"
                aria-label="Select a date"
                class="px-0"
              />

              <template #content>
                <UCalendar v-model="modelValue" class="p-2" />
              </template>
            </UPopover>
          </template>
        </UInputDate>
        <CustomInput class="col-span-4 lg:col-span-1" v-model="height" label="Altura (cm)"/>
        <CustomInput class="col-span-4 lg:col-span-1" v-model="weight" label="Peso (kg)"/>
        <CustomInput class="col-span-4 lg:col-span-1" v-model="height" label="Altura (cm)"/>
        <USelect class="col-span-4 lg:col-span-1" placeholder="RH" v-model="rh" :items="itemsRH" />
        <URadioGroup class="col-span-4 lg:col-span-1 content-center" orientation="horizontal" v-model="genre" :items="itemsGenre" />
        <USelect class="col-span-3 ml-1 lg:ml-15 lg:col-span-3" placeholder="Tipo Documento" v-model="rh" :items="itemsRH" />
      </div>
    </UCard>
  </div>
</template>