var args = process.argv.slice(2);
const fetch = require('undici-fetch')
args.reduce((queue, i) =>
    queue.then(() => fetch(`https://registry.npmjs.org/${i}/latest`))
        .then(re => console.log(i, re.ok))
    , Promise.resolve()).then(() => {
        console.log('-----')
    }, console.error)