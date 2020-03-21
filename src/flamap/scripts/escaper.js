#!/usr/local/bin/node

/**
 * Convert raw javascript files to importable ES6 modules
 * containing the source code escaped and stringified.
 *
 * Place race javascript files in /src
 * Stringified versions will output to /bin
 */

const fs = require('fs')
const jsStringEscape = require('js-string-escape')

const rawFiles = fs.readdirSync(`${__dirname}/src`)

let imports = ''

for (const rawFile of rawFiles) {
  const sourceCode = fs.readFileSync(`${__dirname}/src/${rawFile}`).toString()
  fs.writeFileSync(`${__dirname}/bin/${rawFile}`, `export const script = '${jsStringEscape(sourceCode)}'`)

  imports += `export { script as ${rawFile.replace('.js', '')} } from './${rawFile}'\n`
}

fs.writeFileSync(`${__dirname}/../flamap.js`, imports)
