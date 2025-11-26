export function useApi(url: string, options = {}) {
  const config = useRuntimeConfig()

  return $fetch(url, {
    baseURL: config.public.apiBase,
    credentials: 'include', // si usas cookies con JWT
    ...options
  })
}