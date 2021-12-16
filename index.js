const express = require('express')
const path = require('path')

const students=[];
const app = express();


// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
    accessToken: 'a76e304940794347887cdcb1140d3780',
    captureUncaught: true,
    captureUnhandledRejections: true,
})

app.use(rollbar.errorHandler())

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

app.post('/api/student', (req,res)=>{
    let {name} = req.body;
    name = name.trim();

    students.push(name)
    rollbar.log('Student added successfully.', {author: 'Senad', type: 'Manual Entry'})
    res.status(200).send(students);


})


const port = process.env.PORT || 4545



app.listen(port, ()=>{console.log(`Running on port ${port}`)})