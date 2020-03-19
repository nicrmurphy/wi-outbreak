import React from 'react'

export default function OutbreakMap({ className, data }) {
  return (
    <h1 className={className}>
      Outbreak Map Data Test: {JSON.stringify(data)}
    </h1>
  )
}
