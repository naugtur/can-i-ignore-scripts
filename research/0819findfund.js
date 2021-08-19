const fetch = require('undici-fetch');
const fs = require('fs');
const todos = Object.keys(require('../data.json').todo)

// const todos = Object.keys({ "core-js": "todo", "@apollo/protobufjs": "todo", "@bazel/typescript": "todo", "@collibra/text-editor": "todo", "@elastic/eui": "todo", "@fastify/pre-commit": "todo" })

todos.reduce((queue, i) => queue.then(() => fetch(`https://registry.npmjs.org/${i}/latest`))
    .then(re => re.json())
    .then(pkg => {
        if (!pkg.scripts) {
            console.log(`${i} has no scripts`)
            return
        }
        console.log([pkg.name, readFilesFrom(i, pkg.scripts.postinstall), readFilesFrom(i, pkg.scripts.preinstall), readFilesFrom(i, pkg.scripts.install)].flat().filter(i => i))
    }), Promise.resolve()).then(() => {
    }, console.error)

function readFilesFrom(i, script) {
    return [script, readFromScript(i, script)];
}
function readFromScript(i, script) {
    return script && subpath(i, script.match(/require\(['"](.*?)['"]\)/)?.[1] || script.match(/node (.*?)$/)?.[1])
}

function subpath(i, path) {
        return `~/repo/can-i-ignore-scripts/research/subjects/node_modules/${i}/${path}`
}