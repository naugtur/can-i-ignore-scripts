const items = require('./matches.json')
const data = require('../data.json')
const skip = [...Object.keys(data.ignore), ...Object.keys(data.keep)]
const fetch = require('undici-fetch')
items.reduce((queue, i) => queue.then(() => {
    if (skip.includes(i)) return Promise.resolve();
    return fetch(`https://registry.npmjs.org/${i}/latest`)
        .then(re => re.json())
        .then(pkg => {
            process.stdout.write('.')
            const { postinstall, preinstall, install } = (pkg.scripts || {})
            if ([postinstall, preinstall, install].join().includes('sponsor')) {
                console.log(i)
                console.log([postinstall, preinstall, install].join())
            }
        })
}), Promise.resolve()).then(() => {
    console.log('-----')
}, console.error)