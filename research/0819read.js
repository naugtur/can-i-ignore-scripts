// const matches = require('./matches.json')
// const visited = require('./visited.json')
// const online = require('./0819pkgsonline.json').result
// const known = Object.keys(require('../data.json').keep).concat(Object.keys(require('../data.json').ignore))

// console.log(JSON.stringify([].concat(matches, online).filter(match => !known.includes(match)).sort().reduce((acc, match) => { acc[match] = 'todo'; return acc }, {})))

const todos = Object.keys(require('../data.json').todo)
console.log(todos.join(' '))