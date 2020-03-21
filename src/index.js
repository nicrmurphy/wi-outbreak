import React, { useState, useEffect } from 'react'
import { statemap } from 'flamap'
import { mapdata as initialMapData } from './mapdata'
import updateMapData from './runnable'

function getBoundScript(id) {
  return document.getElementById(id)
}

async function bindScript(src, id) {
  try {
    const script = document.createElement('script')
    script.innerHTML = src
    script.id = id
    let head = document.getElementsByTagName('head')[0]
    head.appendChild(script)
  } catch (err) {
    console.log(err)
  }
}

async function unbindScript(id) {
  try {
    const script = getBoundScript(id)
    if (script) {
      let head = document.getElementsByTagName('head')[0]
      head.removeChild(script)
    }
  } catch (err) {
    console.log(err)
  }
}

function OutbreakMap(props) {
  const [data, setData] = useState(props.data)
  useEffect(() => {
    setData(prevData => {
      if (prevData !== props.data) {
        if (window.simplemaps_statemap) {
          updateMapData(props.data)
        }
        return props.data
      }
      return prevData
    })
    return () => {}
  }, [props])

  useEffect(() => {
    bindScript(statemap, 'statemap-script').then(() => {
      if (window.simplemaps_statemap.mobile_device) {
        initialMapData.main_settings.width = 'responsive'
      }
      window.simplemaps_statemap.mapdata = initialMapData
    })

    return () => {
      unbindScript('statemap-script')
    }
  }, [])

  return <div id='outbreak-map' />
}

export default OutbreakMap
