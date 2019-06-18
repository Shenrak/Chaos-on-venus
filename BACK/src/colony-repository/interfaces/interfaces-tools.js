module.exports.queryArray = (elements) => (query = {}) => {
  const result = elements.filter(i => {
    let match = true

    Object.keys(query).forEach(key => {
      match = match && i[key] === query[key]
    })
    return match
  })

  if(!result) {
    console.log("EMPTY RESULT")
    console.log("elements", elements)
    console.log("query", query)
  }
  console.log(result)
  return result
}

module.exports.setArrayElements = (elements) => ({query = {} , props}) => {
  return elements.map(element => {
    let match = true

    Object.keys(query).forEach(key => {
      match = match && element[key] === query[key]
    })

    if(match) {
      return {
        ...element,
        ...props
      }
    }

    return element
  })
}
