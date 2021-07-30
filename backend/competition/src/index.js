const express = require('express')
// require('./db/nativemongo') // to connect to native mongo db
require('./db/mongoatlas')  // to connect to mongo db atlas
const userrouter = require('./routers/user')
const taskrouter = require('./routers/dialogues')
const app = express()                              

app.set('port', 3000)
app.use(express.json())
app.use(userrouter)
app.use(taskrouter)


app.listen(app.get('port'), () => {
    console.log('the server is up and running on port ' + app.get('port'))
})


