export default function build() {
  var req = new XMLHttpRequest()
  req.onreadystatechange = function() {
    console.log(this.readyState, this.status)
    if (this.readyState == 4 && this.status == 200) {
      /* parse HTML response */
      let res = this.response
      let data = res.features
      console.log(data)
      // document.getElementById("tester").appendChild(dataTable);

      /* update and draw map */
      map_cfg.mapWidth = 1
      let maxCases = 0 // get max cases for color gradient calculation
      let counties = {}
      for (let i in data) {
        const county = data[i]
        const [name, cases] = [
          county.attributes.NAME,
          county.attributes.POSITIVE
        ]
        counties[name] = cases
        maxCases = Math.max(cases, maxCases)
      }
      console.log(counties)
      console.log('max:', maxCases)

      for (let [county, cases] of Object.entries(counties)) {
        for (let [id, map_data] of Object.entries(map_cfg.map_data)) {
          if (county.includes(map_data.name)) {
            // console.log(map_cfg.map_data[id])
            map_cfg.map_data[id].comment = `${cases} ${
              parseInt(cases) === 1 ? 'case' : 'cases'
            }`

            // calculate color
            const [max, min] = [255, 100]
            let r = max - ((max - min) / maxCases) * cases
            console.log(county, r)

            map_cfg.map_data[id].color = `rgb(${r}, 0, 0)`
            map_cfg.map_data[id].colorOver = '#FF9000'
            break
          }
        }
      }
      var map = new FlaMap(map_cfg)
      document.getElementById('map-container').innerHTML = ''
      map.drawOnDomReady('map-container')
      let loadingMsg = document.getElementById('loading-message')
      loadingMsg.parentElement.removeChild(loadingMsg)
    }
  }
  const url =
    'https://services1.arcgis.com/ISZ89Z51ft1G16OK/arcgis/rest/services/COVID19_WI/FeatureServer/0//query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=NAME%2CPOSITIVE%2CDATE%2CCMNTY_SPRD&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=NAME+ASC&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token='
  req.open('GET', url, true)
  req.responseType = 'json'
  req.send()
}