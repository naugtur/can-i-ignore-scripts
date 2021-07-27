#!/usr/bin/env node
const fs = require('fs')
const glob = require('glob')
const util = require('util')
const _ = require('lodash')
const fetch = require('undici-fetch')

const scriptNames = ['preinstall', 'postinstall', 'install']

const files = glob.sync('node_modules/**/package.json')
const found = _.chain(files)
    .map(file => {
        const { name, scripts, version } = JSON.parse(fs.readFileSync(file))
        return { name, version, scripts: _.pick(scripts, scriptNames), path: file.substr(0, file.length - 12) }
    })
    .filter(pkg => Object.keys(pkg.scripts).length > 0)
    .groupBy(pkg => pkg.name)
    .value()

if (Object.keys(found).length === 0) {
    console.log('No scripts found')
    process.exit(0)
}

fetch(`https://can-i-ignore-scripts.vercel.app/api/oktoignore?packages=${Object.keys(found).join(',')}`)
    .then(response => response.json())
    .catch(err => {
        console.error(err.message)
        return []
    })
    .then(canignore => {
        console.log('Review these scripts:')
        console.log(util.inspect(Object.keys(found).filter(pkg => !canignore.includes(pkg)).map(pkg => found[pkg]).flat(), { depth: 5 }))
    }).catch(err => {
        console.error(err)
    })

