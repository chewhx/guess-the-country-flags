// This util function randomly selects a predetermined 'n' number of elements, without duplicates, from a given array. 

function randomSelect(array, n) {
  if (!array.length || !n) return undefined
  if (array.length <= n) return "Array length too short"
  // cannot have duplicates
  const results = []
  for (let i = 1; i <= n; i++) {
    let randomNum = Math.floor(Math.random() * array.length)
    while (results.includes(randomNum)) {
      randomNum = Math.floor(Math.random() * array.length)
    }
    results.push(randomNum)
  }
  results.map((key, idx) => results[idx] = array[key])
  return results
}

module.exports = randomSelect