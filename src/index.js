import React from 'react'
import { mapdata, statemap, runnable } from 'flamap'

function bindScript(src, id) {
  let script = document.createElement('script')
  script.innerHTML = src
  script.id = id
  let head = document.getElementsByTagName('head')[0]
  head.appendChild(script)
}

function unbindScript(id) {
  let script = document.getElementById(id)

  let head = document.getElementsByTagName('head')[0]
  head.removeChild(script)
}

class OutbreakMap extends React.Component {
  componentDidMount() {
    bindScript(mapdata, 'mapdata-script')
    bindScript(statemap, 'statemap-script')
    const resizeScript = 'simplemaps_statemap_mapdata.main_settings.width=500;'
    bindScript(resizeScript, 'resize-script')
    
    bindScript(runnable, 'runnable-script')
  }

  componentWillUnmount() {
    unbindScript('mapdata-script')
    unbindScript('statemap-script')
    unbindScript('resize-script')
    unbindScript('runnable-script')
  }

  render() {
    return <div id="map"></div>
  }
}

export default OutbreakMap
