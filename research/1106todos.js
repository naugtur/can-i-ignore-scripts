const fetch = require('undici-fetch')

const online = require('./pkgsonline2.json').result
const known = Object.keys(require('../data.json').keep).concat(Object.keys(require('../data.json').ignore).concat(Object.keys(require('../data.json').todo)))

const newItems = online.filter(match => !known.includes(match))
const checkedItems = []

async function gogogo() {
    await newItems.reduce((queue, i) =>
        queue.then(() => fetch(`https://registry.npmjs.org/${i}/latest`))
            .then(re => {
                console.log(i, re.ok)
                if (re.ok) {
                    checkedItems.push(i)
                }
            }), Promise.resolve())

    console.log(known.length, JSON.stringify(checkedItems.sort().reduce((acc, match) => { acc[match] = 'todo'; return acc }, {})))
}

gogogo()


// const todos = Object.keys(require('../data.json').todo)
// console.log(todos.join(' '))