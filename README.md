# can-i-ignore-scripts

A service and cli to analyze your dependencies and check what'll break when you switch from `npm ci` to `npm ci --ignore-scripts`

## Usage

Go to the folder containing your installed node_modules and run `can-i-ignore-scripts` either by installing it first or via npx `npx can-i-ignore-scripts`

```
naugtur@localtoast:~/repo/ [main]$ can-i-ignore-scripts 

█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
  ▄▄·  ▄▄▄·  ▐ ▄    ▄     ▪    ▄▄     ▐ ▄       ▄▄▄   ▄▄▄     ·▄▄▄▄•
 ▐█ ▌▪▐█ ▀█ •█▌▐█   ██    ██  ▐█ ▀    █▌▐█      ▐▄ █· █  ▀·  .▀· .█▌
 ██ ▄▄▄█▀▀█ ▐█▐▐▌   ▐█·   ▐█· ▄█ ▀█▄ ▐█▐▐▌ ▄█▀▄ ▐▀▀▄ ▐█▀      ▄█▀▀▀•
 ▐███▌▐█ ▪▐▌██▐█▌   ▐█▌   ▐█▌ ▐█▄ ▐█ ██▐█▌▐█▌.▐▌▐▄ █▌▐█▄▄▄▌   ▀
 ·▀▀▀  ▀  ▀ ▀▀ █▪   ▀▀▀   ▀▀▀ ·▀▀▀▀  ▀▀ █▪ ▀█▄▀▪.▀  ▀ ▀▀▀     ▀

▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
Found following packages with scripts:
[ ignore ] 'monorepo-symlink-test' has scripts but they can be ignored 
             reason: false positive
[ ignore ] 'ejs' has scripts but they can be ignored 
             reason: funding
[ ignore ] 'core-js' has scripts but they can be ignored 
             reason: funding

```
## Contributing

I'm in the process of figuring out how to populate `data.json`. I crawled npm starting at the 1000 most popular packages from 2019 and all their dependencies.

You're welcome to report your recommendations what to ignore or keep as pull requests to `data.json`. 

The file also contains a `todo` section with the packages I found but didn't review yet. I'll appreciate PRs with work on that too. 