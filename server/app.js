const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys')
const cors = require('cors')
const app = express()

app.use(cors())

mongoose.set("strictQuery", true);

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})


require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


// if(process.env.NODE_ENV=="production"){
//     app.use(express.static('client/build'))
//     const path = require('path')
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }
// if(process.env.NODE_ENV=="production"){
//     const path = require('path')
    
//     app.get("/",(req,res)=>{
//         app.use(express.static(path.resolve(__dirname,'client','build')))
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }

app.listen(PORT,()=>{
    console.log("server is running on", PORT)
})

app.get("/", (req, res) => {
    res.send("Hello World!")
})
