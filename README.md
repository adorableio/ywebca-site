# YWebCA.org
Source code for the one pager static site with information for developers and
other technology folks to volunteer to work with the YWeb Career Academy.

### Core Technologies
* Node
* Express
* Bower
  * jQuery
  * Ember
  * Handlebars
* Gulp
* Browserify
* Stylus
* Coffeescript

### Setup

1. Clone this repo
2. run `npm install`

### Running

1. For asset generation: `gulp watch`
2. Run the server: `npm start`
3. Browse to: `http://localhost:3002`

### Deploying
You may use the `bot@adorable.io` heroku account to deploy updates to heroku.
Find the account password in the shared 1Password vault.

1. Login to heroku on the command line.

        $ heroku auth:login
        Enter your Heroku credentials.
        Email: bot@adorable.io
        Password (typing will be hidden):

2. Add the heroku git remote.

        $ git remote add heroku git@heroku.com:ywebca.git

3. Deploy using `git push heroku master`
4. Dance.
