<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Ingreso Clientes',
      icon: 'i-lucide-book-open'
    },
    {
      label: 'Dashboard',
      icon: 'i-lucide-database',
      popover: {
        mode: 'click'
      }
    },
    {
      label: 'Clientes',
      icon: 'i-lucide-box',
      active: true,
      children: [
        {
          label: 'Registrar Cliente',
          icon: 'i-custom-user-add-filled',
          description: 'Registrar cliente nuevo.',
          to: '/clientes/registrar'
        },
        {
          label: 'Ver todos',
          icon: 'i-custom-user-search-filled',
          description: 'Mostrar listado de clientes.',
          to: '/dashboard'
        },
      ]
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      badge: '3.8k',
      to: 'https://github.com/nuxt/ui',
      target: '_blank',
      tooltip: {
        text: 'Open on GitHub',
        kbds: [
          '3.8k'
        ]
      }
    },
    {
      label: 'Help',
      icon: 'i-lucide-circle-help',
      disabled: true
    }
  ]
])
</script>

<template>
  <UNavigationMenu 
    highlight
    highlight-color="primary"
    popover 
    orientation="vertical" 
    :items="items" 
  />
</template>
