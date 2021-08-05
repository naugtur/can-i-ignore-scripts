const seed = require('./08052seed.json')
const fetch = require('undici-fetch')
const fs = require('fs')
let nextPass = new Set()
const matches = new Set(require('./matches.json'));
let prevSize = 0
const visited = new Set(require('./visited.json'));

function saveMatches() {
    if (prevSize < matches.size) {
        prevSize = matches.size
        process.stdout.write('' + matches.size)

        fs.writeFileSync('matches.json', JSON.stringify(Array.from(matches)))
        fs.writeFileSync('visited.json', JSON.stringify(Array.from(visited)))
    }
}

async function main() {
    console.log(matches.size, visited.size, seed.length)
    seed.forEach(a => nextPass.add(a))
    let bailout = 0;
    while (nextPass.size > 0 && bailout < 100) {
        const current = Array.from(nextPass);
        nextPass = new Set()

        await scan(current, pkg => {
            visited.add(pkg.name)
            const { postinstall, preinstall, install } = (pkg.scripts || {})
            Object.keys(pkg.dependencies || {}).forEach(a => nextPass.add(a))
            Object.keys(pkg.devDependencies || {}).forEach(a => nextPass.add(a))
            if (postinstall || preinstall || install) {
                matches.add(pkg.name)
                process.stdout.write('+')
                saveMatches()
            }
            process.stdout.write('=')
        })

        bailout++
        console.log('>')

    }

}


async function scan(items, cb) {
    return items.reduce((queue, i) => queue.then(() => {
        if (!visited.has(i)) {
            return fetch(`https://registry.npmjs.org/${i}/latest`)
                .then(re => re.json())
                .then(cb)
        }
        process.stdout.write('-')
    }), Promise.resolve()).then(() => {
        saveMatches()
    }, console.error)
}

main()