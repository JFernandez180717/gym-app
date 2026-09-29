<template>
  <div>
    <NavBar />
    <UContainer class="max-w-full lg:p-1 grid grid-cols-12">
      <UContainer class="lg:p-0 p-0 col-span-1 hidden lg:flex">
        <MenuAside />
      </UContainer>
      <UContainer class="w-full mx-0 max-w-full col-span-11"><!-- w-full px-4 sm:px-6 lg:px-8 col-span-11 -->
        <slot />
      </UContainer>
    </UContainer>
  </div>
</template>