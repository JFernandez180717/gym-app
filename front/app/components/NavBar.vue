<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Docs',
  to: '/dashboard',
  icon: 'i-lucide-book-open',
  active: route.path.startsWith('/dashboard')
}, {
  label: 'Components',
  to: '/clientes/registrar',
  icon: 'i-lucide-box',
  active: route.path.startsWith('/clientes/registrar')
}, {
  label: 'Figma',
  icon: 'i-simple-icons-figma',
  to: 'https://go.nuxt.com/figma-ui',
  target: '_blank'
}, {
  label: 'Releases',
  icon: 'i-lucide-rocket',
  to: 'https://github.com/nuxt/ui/releases',
  target: '_blank'
}])

const ui = {
  container: 'm-0 max-w-full',
}
const menuUi = { side: 'left' } as const
</script>

<template>
  <UHeader :ui="ui" toggle-side="left" :collapsed="false" mode="slideover" :menu="menuUi">
      <template #title>
        Gym App Pro
      </template>

      <template #right>
        <UColorModeButton />
      </template>

      <template #body>
        <!--UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" /-->
        <MenuAside />
      </template>
    <!--/template-->
  </UHeader>
</template>