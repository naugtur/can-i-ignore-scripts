const fetch = require('undici-fetch')
const util = require('util')

//FAIL - doesn't work without text
fetch(`https://registry.npmjs.org/-/v1/search?keywords=-aaaaaaaaaaaaa,-bbbbbbbbbb&from=0&quality=0.0&maintenance=0.0&popularity=1.0`)
    .then(result => result.json())
    .then(data => {
        console.log(util.inspect(data, { depth: 5}));
    }).catch(console.error)
