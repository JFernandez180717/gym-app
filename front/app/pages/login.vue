<script setup lang="ts">
definePageMeta({
  layout: false
})

import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const toast = useToast()

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Correo electronico',
  placeholder: 'Enter your email',
  required: true
}, {
  name: 'password',
  label: 'Contraseña',
  type: 'password',
  placeholder: 'Enter your password',
  required: true
}]

const schema = z.object({
  email: z.email('Correo electronico invalido'),
  password: z.string('La contraseña es requerida').min(8, 'Debe contener al menos 8 caracteres')
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const resp = await useApi('/auth/login', {
    method: 'POST',
    body: {
      email: payload.data.email,
      password: payload.data.password,
    }
  })
  console.log('resp', resp);
  navigateTo('/dashboard')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">

    <!-- CONTENEDOR -->
    <div class="flex w-full max-w-5xl h-[600px] shadow-xl overflow-hidden rounded-2xl bg-white dark:bg-gray-800">

      <!-- PANEL AZUL (NO CAMBIA EN MODO OSCURO) -->
      <div class="hidden md:flex flex-col justify-center px-10 text-white h-full w-1/2 login-info">

        <h1 class="text-4xl font-bold leading-tight">Gym App Pro</h1>
        <h5 class="mb-13">Saas para gimnasios</h5>

        <h2 class="text-4xl font-bold leading-tight mb-3">Gestion inteligente para tu gimnaso</h2>

        <p class="text-lg opacity-90 mb-8">
          Más de 500 gimnasios confían en nuestra plataforma para gestionar sus clientes, pagos y operaciones diarias.
        </p>
        
        <span class="mb-2">✓ Gestión de clientes y pagos.</span>
        <span class="mb-2">✓ Control de acceso y asistencia.</span>
        <span class="mb-2">✓ Reporte y analytics avanzados.</span>
        <span class="mb-2">✓ Multi sede y escalable</span>

      </div>

      <!-- PANEL DEL FORMULARIO (CAMBIA AUTOMÁTICAMENTE) -->
      <div class="w-full md:w-1/2 p-6 flex items-center justify-center">
        <UPageCard class="bg-transparent w-full border-none shadow-none ring-0">
          <UAuthForm
            :schema="schema"
            title="Bienvenido de nuevo"
            description="Inicia sesión en tu cuenta de Gym App Pro."
            icon="i-lucide-user"
            :fields="fields"
            @submit="onSubmit"
            :submit="{
              class: 'text-white',
              label: 'Continuar',
              color: 'primary',
              variant: 'solid',
            }"
          >
          </UAuthForm>
        </UPageCard>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Panel azul siempre del mismo color */
.login-info {
  background-color: var(--color-primary);
  height: 100%;
}
</style>
