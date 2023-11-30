export const useMyFetch: typeof useFetch = (request, opts?) => {
  // const config = useRuntimeConfig()
  const token = useCookie('token')

  // return useFetch(request, { baseURL: config.public.baseURL, ...opts })

  try {
    return useFetch(request, {
      // baseURL: config.public.baseURL,
      baseURL:
        'https://gpt-chat-news-generator-a4555eba92cd.herokuapp.com/api/v1',
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...opts,
    })
  } catch (error) {
    return error
  }
}
