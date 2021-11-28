export const copyArray = (original) => {
  const copy = JSON.parse(JSON.stringify(original))
  return copy
}
