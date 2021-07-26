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

    if (found.length===0) {
        console.log('No scripts found')
        process.exit(0)
    }

fetch(`https://can-i-ignore-scripts.vercel.app/api/dropignore?packages=${Object.keys(found).join(',')}`)
    .then(response => response.json())
    .then(remaining => {
        if (remaining.length > 0) {
        console.log('Review these scripts:')
        console.log(util.inspect(remaining.map(pkg => found[pkg]).flat(), { depth: 5 }))
        } else {
            console.log('All scripts are safe to ignore')
        }
    }).catch(err => {
        console.error(err)
    })

