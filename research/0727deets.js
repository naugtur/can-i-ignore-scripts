const items = ['core-js', 'aws-sdk', 'node-sass', 'fsevents', 'puppeteer', 'web3', 'sqlite3', 'nodemon', 'bcrypt', 'protobufjs', 'sharp', 'canvas', 'ssh2', '@fortawesome/fontawesome-svg-core', 'electron', 'deasync', '@fortawesome/free-solid-svg-icons', 'grpc', 'phantomjs-prebuilt', 'phantomjs', 'nodegit', 'secp256k1', 'hiredis', 'leveldown', 'bufferutil']
const fetch = require('undici-fetch')
items.reduce((queue, i) => queue.then(() => fetch(`https://registry.npmjs.org/${i}/latest`))
    .then(re => re.json())
    .then(pkg => {
        const { postinstall, preinstall, install } = (pkg.scripts || {})
        if (![postinstall, preinstall, install].join().includes('gyp')) {
            console.log(i)
            // console.log([postinstall, preinstall, install].join())
        }
    }), Promise.resolve()).then(() => {
        console.log('-----')
    }, console.error)