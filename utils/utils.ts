const clearObject: object = (obj: object) => {
  Object.keys(obj).forEach((key) => {
    delete obj[key]
  })
  return obj
}

export { clearObject }
