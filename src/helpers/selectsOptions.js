const toUpperCase = (string) => string.charAt(0).toUpperCase() + string.slice(1)

const selectsOptions = (valuesArray = []) => {
  const newValue = [...valuesArray]
  return newValue.sort().map((element) => ({
    value: element,
    text: toUpperCase(element),
  }))
}

export default selectsOptions
