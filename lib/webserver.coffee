
http       = require('http')
express    = require('express')
bodyParser = require('body-parser')
path       = require('path')
favicon    = require('serve-favicon')
findPort   = require('find-port')
colors     = require('colors')
basicAuth  = require('basic-auth-connect')
fs         = require('fs')
yaml       = require('js-yaml')
request    = require('request')

# Function to load files from our data folder
getDataFile = (file) ->
  try
    filepath = path.join(basePath, 'data', file)
    doc = yaml.safeLoad(fs.readFileSync(filepath, 'utf8')) or {}
  catch err
    console.log(err)

app           = express()
app.use(bodyParser.urlencoded({extended: false}))

webserver     = http.createServer(app)
basePath      = path.join(__dirname, '..')
generatedPath = path.join(basePath, '.generated')
assetsPath    = path.join(generatedPath, 'assets')
vendorPath    = path.join(generatedPath, 'vendor')
faviconPath   = path.join(basePath, 'app', 'favicon.ico')

# Get our data file
config       = getDataFile('config.yaml')

# Use Basic Auth?
if config.username? || config.password?
  app.use(basicAuth(config.username, config.password)) if process.env.DYNO?

# Configure the express server
app.engine('.html', require('hbs').__express)
app.use(favicon(faviconPath))
app.use('/assets', express.static(assetsPath))
app.use('/vendor', express.static(vendorPath))

# Build the wufoo post body
buildWufooPostObject = (body) ->
  postObject = {
    Field1  : body.first_name
    Field2  : body.last_name
    Field9  : body.email
    Field212: body.questions
  }

  postObject.Field12 = body.speaker if body.speaker
  postObject.Field13 = body.mentor if body.mentor
  postObject.Field14 = body.volunteer if body.volunteer
  postObject.Field15 = body.internship if body.internship
  postObject.Field16 = body.site_tour if body.site_tour

  return postObject

# Find an available port
port = process.env.PORT || 3002
if port > 3002
  webserver.listen(port)
else
  findPort port, port + 100, (ports) -> webserver.listen(ports[0])

# Notify the console that we're connected and on what port
webserver.on 'listening', ->
  address = webserver.address()
  console.log "[Firepit] Server running at http://#{address.address}:#{address.port}".green

# Routes
app.get '/', (req, res) ->
  res.render(generatedPath + '/index.html', {data: config})

app.get /^\/(\w+)(?:\.)?(\w+)?/, (req, res) ->
  path = req.params[0]
  ext  = req.params[1] ? "html"
  res.render(path.join(generatedPath, "#{path}.#{ext}"))

app.post '/submissions', (req, res) ->
  postObject = buildWufooPostObject(req.body)
  # console.log "Would post: " + JSON.stringify(postObject)

  request.post(config.wufooPostUrl)
         .on('response', (response) ->
            if response.statusCode == 201
              res.render(generatedPath + '/thanks.html', {data: config})
            else
              console.log "[ERROR] Wufoo returned status code #{response.statusCode} on POST"
              res.render(generatedPath + '/thanks.html', {data: config})
         )
         .auth(config.wufooApiKey, config.wufooApiPassword)
         .form(postObject)

module.exports = app
