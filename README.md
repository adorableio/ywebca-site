# YWebCA Website
For the [YWebCA](http://ywebca.org/).

### Install requirements
```shell
npm install
```

### Running things
```shell
# starts the app in the browser with browsersync
$(npm bin)/gulp serve
```

### Contribution workflow

1. Create a branch off of master
2. Commit your changes, open a PR back to master
3. Once your changes have been merged to master, run the deploy script there:

        npm run deploy
This will compile your changes to static files, and push them to the gh-pages branch (which is where the site is served from).
Once that completes, your changes should be live!
