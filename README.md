# YWebCA Website
For the [YWebCA](http://ywebca.org/).

### Development

To prepare the site for development, we just need to install node modules:

```shell
npm install
```

Then to start the build pipeline and run the server:

```shell
# starts the app in the browser with browsersync
npm start
```

### Contribution workflow

1. Create a branch off of master
2. Commit your changes, push your branch, and open a PR against master
3. Once your changes have been merged to master, run the deploy script:

```shell
npm run deploy
```

This will compile your changes to static files, and push them to the gh-pages branch (which is where the site is served from).
Once that completes, your changes should be live!
