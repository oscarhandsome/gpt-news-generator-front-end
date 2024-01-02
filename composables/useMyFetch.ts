export const useMyFetch: typeof useFetch = async (request, opts?) => {
  const { $toaster } = useNuxtApp()
  const config = useRuntimeConfig()
  const token = useCookie('token')

  // return useFetch(request, { baseURL: config.public.baseURL, ...opts })

  try {
    const response = await useFetch(request, {
      baseURL: config.public.baseURL,
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...opts,
    })
    const { data, pending, error }: any = response

    if (error && error.value) {
      // console.log('data, pending, error', data, pending, error)
      console.error(error.value.data)
      $toaster.error({
        title: `Error, status: ${error.value.data.status}`,
        message: error.value.data.message,
      })
    }
    return response
  } catch (error) {
    return error
  }
}
