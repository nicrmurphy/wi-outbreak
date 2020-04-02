function updateMapData(data) {
  /* update and draw map */
  const maxCases = data.length > 0 ? data[0].POSITIVE : 0 // get max cases for color gradient calculation
  const sumArr = (sum, val) => sum + val
  const totalCases =
    data.length > 0 ? data.map(county => county.POSITIVE).reduce(sumArr) : 0
  const averageCases = totalCases / data.length
  // const averages = casesArray.map(c => Math.pow(c - averageCases, 2))
  // const stdDev = Math.sqrt(averages.reduce(sumArr) / averages.length)

  // reset map colors
  const mapdata = window.simplemaps_statemap.mapdata
  for (const county in mapdata.state_specific) {
    mapdata.state_specific[county].color = 'default'
    mapdata.state_specific[county].hover_color = 'default'
  }
  for (const county of data) {
    const {
      GEOID: id,
      NAME: name,
      POSITIVE: cases,
      NEGATIVE: negative,
      DEATHS: deaths,
      CMNTY_SPRD: cmntySprd,
      DATE: date,
      COLOR: color
    } = county
    // console.log(name, color.hex())
    let desc = ''
    desc = desc.concat(
      `<strong>${cases} ${
        cases === 1 ? 'positive case' : 'positive cases'
      }</strong><br/>`
    )
    desc = negative
      ? desc.concat(
          `<strong>${negative} ${
            negative === 1 ? 'negative case' : 'negative cases'
          }</strong><br/>`
        )
      : desc
    desc = desc.concat(
      `<strong>${deaths} ${deaths === 1 ? 'death' : 'deaths'}</strong><br/>`
    )
    desc = cmntySprd
      ? desc.concat('<strong>* Community Spread</strong><br/>')
      : desc
    desc = desc.concat(`As of: ${date}<br/> ~2:00pm CST`)
    mapdata.state_specific[id].description = desc
    
    if (cases > 0) {
      mapdata.state_specific[id].color = color.hex()
    }
    mapdata.state_specific[id].hover_color = color.brighten().hex()
  }
  window.simplemaps_statemap.mapdata = mapdata
  if (window.simplemaps_statemap.refresh) {
    window.simplemaps_statemap.refresh()
  }
}

export default updateMapData
