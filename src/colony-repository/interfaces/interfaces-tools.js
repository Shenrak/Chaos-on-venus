module.exports.query = (elements) => (props) => {
  return elements.filter(i => {
    let valid = true

    Object.keys(props).forEach(key => {
      valid = valid && i[key] === props[key]
    })

    return valid
  })
}
