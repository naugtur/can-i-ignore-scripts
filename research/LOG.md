# research log

> 2021-07-27
- tried a few projects, found first few skippables

> 2021-07-28
- one search query, got me to https://gist.github.com/anvaka/8e8fa57c7ee1350e3491
- took module names, looped, listed which had scripts
Out of the top 1000 packages, 25 have scripts
'core-js', 'aws-sdk', 'node-sass', 'fsevents', 'puppeteer', 'web3', 'sqlite3', 'nodemon', 'bcrypt', 'protobufjs', 'sharp', 'canvas', 'ssh2', '@fortawesome/fontawesome-svg-core', 'electron', 'deasync', '@fortawesome/free-solid-svg-icons', 'grpc', 'phantomjs-prebuilt', 'phantomjs', 'nodegit', 'secp256k1', 'hiredis', 'leveldown', 'bufferutil'
- filtered out stuff that runs gyp
core-js, aws-sdk, node-sass, puppeteer, web3, nodemon, protobufjs, ssh2, @fortawesome/fontawesome-svg-core, electron, deasync, @fortawesome/free-solid-svg-icons, phantomjs-prebuilt, phantomjs, nodegit
- time to install all of them
- these pulled in some other dependencies with scripts, so looks like I'll need to install the top of the top and see or crawl the dependency tree for each.

> 2021-08-03/04
- search API requires text input (despite the doc saying otherwise) so I can't search for anything by popularity. Would have to enerate all letter pairs and feed that into the search, not sure if that'd provide reasonalble coverage. Likely to find a lot of garbage. abort.
- took the top 1000 packages and went recursively into their dependencies. scanning down each level, up to 20 should get me a lot of relevant/popular packages.
- meanwhile the data format changed, so now I'm also recommending what to keep. For starters - everything that runs gyp

> 2021-08-05
- improved search to duplicate work less
- got 247 packages with scripts out of 18832 scanned 
- checked for gyp and opencollective to put them in data.json


