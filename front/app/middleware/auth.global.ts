export default defineNuxtRouteMiddleware(async (to, from) => {  
  const token = useCookie('auth_token', { sameSite: 'lax' });

  // rutas públicas
  const publicRoutes = ['/login', '/register', '/clientes/registrar']

  if (publicRoutes.includes(to.path)) {
    return
  }

  // si no hay token → redirigir
  if (!token.value && to.path !== '/login') {
    return navigateTo('/login')
  }

  // verificar en backend
  const { data, error } = await useFetch('/auth/validate')
  if (error.value && to.path !== '/login') {
    // token inválido → borrar cookie y redirigir
    const cookie = useCookie('auth_token')
    cookie.value = null
    return navigateTo('/login')
  }
})
